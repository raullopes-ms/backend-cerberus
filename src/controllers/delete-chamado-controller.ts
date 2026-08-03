import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteChamadoUseCase } from "../use-cases/factories/make-delete-chamado-use-case";
import { ChamadoNotFoundError } from "../use-cases/errors/chamadoNotFound";

export async function deleteChamado(request: FastifyRequest, reply: FastifyReply) {
    const deleteChamadoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = deleteChamadoParamsSchema.parse(request.params);
    try {
        const deleteChamadoUseCase = makeDeleteChamadoUseCase();
        await deleteChamadoUseCase.execute({ id });
        return reply.status(204).send();
    } catch (err) {
        if (err instanceof ChamadoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
