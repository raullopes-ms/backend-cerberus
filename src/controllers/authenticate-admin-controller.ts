import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "../use-cases/errors/invalidCredentials";
import { makeAuthenticateAdminUseCase } from "../use-cases/factories/make-authenticate-admin-use-case";
import { z } from "zod";

export async function authenticateAdmin(request: FastifyRequest, reply: FastifyReply) {
    const authenticateAdminBodySchema = z.object({
        email: z.email(),
        senha: z.string().min(6)
    });
    const { email, senha } = authenticateAdminBodySchema.parse(request.body);
    try {
        const authenticateAdminUseCase = makeAuthenticateAdminUseCase();
        const { admin } = await authenticateAdminUseCase.execute({ email, senha });
        const token = await reply.jwtSign({
            sub: admin.id.toString(),
            role: "admin"
        }, {
            sign: {
                expiresIn: "1h"
            }
        })
        reply.status(200).send({ message: "Autenticação bem-sucedida", acessToken: token, expiresIn: 3600 });
    }
    catch (err) {
        if (err instanceof InvalidCredentialsError) {
            return reply.status(400).send({ message: err.message });
        }
        throw err;
    }
}
