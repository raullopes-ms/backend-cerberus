import fastify, { FastifyError } from 'fastify';
import { appRoutes } from './routes';
import { ZodError } from 'zod';
import { env } from './env';
import fastifyJwt from '@fastify/jwt';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCors from '@fastify/cors';

export const app = fastify({
    logger: env.NODE_ENV === 'production'
        ? { level: 'info' }
        : {
            level: 'info',
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'HH:MM:ss Z',
                    ignore: 'pid,hostname',
                },
            },
        },
});
/**
 * Endereços locais e de rede privada. Em desenvolvimento o Vite sobe com
 * `host: true` e atende em localhost, 127.0.0.1 e no IP da LAN ao mesmo tempo —
 * fixar uma única origem faz as outras duas falharem no preflight, e o browser
 * reporta isso como erro de rede, sem pista do motivo real.
 */
const PRIVATE_HOSTNAME =
    /^(localhost|127\.0\.0\.1|::1|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})$/;

function isLocalOrigin(origin: string): boolean {
    try {
        return PRIVATE_HOSTNAME.test(new URL(origin).hostname.replace(/^\[|\]$/g, ""));
    } catch {
        return false;
    }
}

/* Registrado antes de tudo para que até respostas de erro carreguem os
   cabeçalhos de CORS — caso contrário o browser esconde o motivo da falha. */
app.register(fastifyCors, {
    origin(origin, callback) {
        // Sem header Origin: curl, health check, chamada de mesma origem.
        if (!origin) return callback(null, true);
        if (env.CORS_ORIGINS.includes(origin)) return callback(null, true);
        // Fora de produção a conveniência do dev vale mais que a restrição —
        // em produção só a allowlist explícita passa.
        if (env.NODE_ENV !== 'production' && isLocalOrigin(origin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    // A API usa Bearer token no header, não cookie de sessão.
    credentials: false,
    maxAge: 86400,
})
app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
})
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})
app.register(appRoutes);
app.setErrorHandler((error: FastifyError, request, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            error: 'Validation error',
            issues: error.format(),
        });
    }
    if (error.statusCode && error.statusCode < 500) {
        return reply.status(error.statusCode).send({
            error: error.message,
        });
    }
    request.log.error(error);
    return reply.status(500).send({
        error: 'Internal Server Error',
    });
})