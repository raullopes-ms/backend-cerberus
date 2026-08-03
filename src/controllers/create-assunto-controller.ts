import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAssuntoUseCase } from "../use-cases/factories/make-create-assunto-use-case";
import { AssuntoAlreadyExistsError } from "../use-cases/errors/assuntoAlreadyExists";

export async function createAssunto(request: FastifyRequest, reply: FastifyReply) {
    const createAssuntoBodySchema = z.object({
        nome: z.string(),
    })
    const { nome } = createAssuntoBodySchema.parse(request.body);
    try {
        const createAssuntoUseCase = makeCreateAssuntoUseCase();
        const { assunto } = await createAssuntoUseCase.execute({ nome });
        return reply.status(201).send({ assunto });
    } catch (err) {
        if (err instanceof AssuntoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
