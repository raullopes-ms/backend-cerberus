import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
    /* Chave de assinatura dos tokens. O mínimo evita que um segredo curto —
       adivinhável por força bruta — passe despercebido para produção. */
    JWT_SECRET: z.string().min(32, 'JWT_SECRET deve ter ao menos 32 caracteres.'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    /**
     * Origens autorizadas a consumir a API pelo navegador, separadas por vírgula.
     *
     * Sem valor padrão de propósito: um default de localhost passaria batido em
     * produção e bloquearia o domínio real. Fora de produção a lista pode ficar
     * vazia — o próprio app libera as origens locais nesse caso.
     */
    CORS_ORIGINS: z
        .string()
        .optional()
        .transform((value) =>
            (value ?? '')
                .split(',')
                .map((origin) => origin.trim())
                .filter(Boolean),
        ),
}).superRefine((env, ctx) => {
    if (env.NODE_ENV === 'production' && env.CORS_ORIGINS.length === 0) {
        ctx.addIssue({
            code: 'custom',
            path: ['CORS_ORIGINS'],
            message:
                'Em produção CORS_ORIGINS é obrigatório: informe o domínio do front-end, ex.: https://cerberus.suaempresa.com.br',
        });
    }
});

const _env = envSchema.safeParse(process.env);
if (!_env.success) {
    // `stringify` em vez do objeto cru: o console do Node abrevia estruturas
    // aninhadas como `[Array]` e esconderia justamente a mensagem do erro.
    console.error(
        'Variáveis de ambiente inválidas:\n' + JSON.stringify(z.treeifyError(_env.error), null, 2),
    );
    throw new Error('Variáveis de ambiente inválidas');
}
export const env = _env.data;
