import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateSetorUseCase } from "../use-cases/factories/make-create-setor-use-case";
import { SetorAlreadyExistsError } from "../use-cases/errors/setorAlreadyExists";

export async function createSetor(request: FastifyRequest, reply: FastifyReply) {
    const createSetorBodySchema = z.object({
        nome: z.string(),
    })
    const { nome } = createSetorBodySchema.parse(request.body);
    try {
        const createSetorUseCase = makeCreateSetorUseCase();
        const { setor } = await createSetorUseCase.execute({ nome });
        return reply.status(201).send({ setor });
    } catch (err) {
        if (err instanceof SetorAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
