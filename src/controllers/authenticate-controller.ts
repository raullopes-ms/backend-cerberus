import { FastifyRequest, FastifyReply } from "fastify";
import { InvalidCredentialsError } from "../use-cases/errors/invalidCredentials";
import { makeAuthenticateUseCase } from "../use-cases/factories/make-authenticate-use-case";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.email(),
        senha: z.string().min(6)
    });
    const { email, senha } = authenticateBodySchema.parse(request.body);
    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { user } = await authenticateUseCase.execute({ email, senha });
        const token = await reply.jwtSign({
            sub: user.id.toString(),
            setorId: user.setorId.toString()
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