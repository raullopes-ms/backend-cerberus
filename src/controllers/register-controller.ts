import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeRegisterUseCase } from "../use-cases/factories/make-register-use-case";
import { UserAlreadyExistsError } from "../use-cases/errors/userAlreadyExists";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.email(),
        senha: z.string().min(6),
        cargoId: z.number(),
        setorId: z.number()
    })
    const { nome, email, senha, cargoId, setorId } = registerBodySchema.parse(request.body);
    try {
        const registerUseCase = makeRegisterUseCase();
        await registerUseCase.execute({
            nome,
            email,
            senha,
            cargoId,
            setorId
        });
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
    reply.status(201).send();
}