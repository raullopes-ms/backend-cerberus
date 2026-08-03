import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateSetorUseCase } from "../use-cases/factories/make-update-setor-use-case";
import { SetorNotFoundError } from "../use-cases/errors/setorNotFound";
import { SetorAlreadyExistsError } from "../use-cases/errors/setorAlreadyExists";

export async function updateSetor(request: FastifyRequest, reply: FastifyReply) {
    const updateSetorParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const updateSetorBodySchema = z.object({
        nome: z.string().optional(),
        ativo: z.boolean().optional(),
    })
    const { id } = updateSetorParamsSchema.parse(request.params);
    const { nome, ativo } = updateSetorBodySchema.parse(request.body);
    try {
        const updateSetorUseCase = makeUpdateSetorUseCase();
        const { setor } = await updateSetorUseCase.execute({ id, nome, ativo });
        return reply.status(200).send({ setor });
    } catch (err) {
        if (err instanceof SetorNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof SetorAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
