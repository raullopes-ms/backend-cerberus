import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteSetorUseCase } from "../use-cases/factories/make-delete-setor-use-case";
import { SetorNotFoundError } from "../use-cases/errors/setorNotFound";

export async function deleteSetor(request: FastifyRequest, reply: FastifyReply) {
    const deleteSetorParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = deleteSetorParamsSchema.parse(request.params);
    try {
        const deleteSetorUseCase = makeDeleteSetorUseCase();
        await deleteSetorUseCase.execute({ id });
        return reply.status(204).send();
    } catch (err) {
        if (err instanceof SetorNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
