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
/* O limite é por IP, e um escritório inteiro costuma sair por um NAT só — todos
   os usuários dividem o mesmo balde. Com o front-end atualizando sozinho, uma
   pessoa na tela de detalhe gera ~8 requisições/min, então o teto antigo de 100
   estourava por volta de 13 pessoas simultâneas e devolvia 429 em uso legítimo.
   As rotas de login mantêm o limite estrito de 5/min, definido rota a rota. */
app.register(fastifyRateLimit, {
    max: 600,
    timeWindow: '1 minute',
})
app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
})
/**
 * Traduz falhas do banco em respostas de negócio.
 *
 * Com os driver adapters do Prisma 7 o código abstrato nem sempre é o esperado —
 * uma violação de RESTRICT chega como `P2039` embrulhando o erro do driver —,
 * então a checagem principal é a SQLSTATE do Postgres, que é estável e
 * padronizada. Os códigos do Prisma ficam como caminho alternativo.
 */
function describeDatabaseFailure(
    error: unknown,
): { status: number; message: string } | null {
    if (typeof error !== 'object' || error === null) return null;

    const prismaCode = (error as { code?: unknown }).code;
    const sqlState = (error as {
        meta?: { driverAdapterError?: { cause?: { code?: unknown } } };
    }).meta?.driverAdapterError?.cause?.code;

    const codes = [prismaCode, sqlState].filter(
        (code): code is string => typeof code === 'string',
    );
    if (codes.length === 0) return null;

    // 23503 = foreign_key_violation, 23001 = restrict_violation.
    if (codes.some((code) => code === '23503' || code === '23001' || code === 'P2003')) {
        return {
            status: 409,
            message:
                'Não é possível excluir: existem registros vinculados a este item. Desative-o em vez de excluir.',
        };
    }
    // 23505 = unique_violation.
    if (codes.some((code) => code === '23505' || code === 'P2002')) {
        return { status: 409, message: 'Já existe um registro com este valor.' };
    }
    if (codes.includes('P2025')) {
        return { status: 404, message: 'Registro não encontrado.' };
    }

    return null;
}

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
    /* Erros do banco que representam decisão de negócio, não falha do servidor.
       Sem esse mapeamento, tentar excluir um setor em uso devolveria um 500
       genérico e a interface não teria como explicar o que aconteceu. */
    const domainFailure = describeDatabaseFailure(error);
    if (domainFailure) {
        return reply.status(domainFailure.status).send({ message: domainFailure.message });
    }
    request.log.error(error);
    return reply.status(500).send({
        error: 'Internal Server Error',
    });
})