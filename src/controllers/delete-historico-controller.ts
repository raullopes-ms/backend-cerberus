import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteHistoricoUseCase } from "../use-cases/factories/make-delete-historico-use-case";
import { HistoricoNotFoundError } from "../use-cases/errors/historicoNotFound";

export async function deleteHistorico(request: FastifyRequest, reply: FastifyReply) {
    const deleteHistoricoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = deleteHistoricoParamsSchema.parse(request.params);
    try {
        const deleteHistoricoUseCase = makeDeleteHistoricoUseCase();
        await deleteHistoricoUseCase.execute({ id });
        return reply.status(204).send();
    } catch (err) {
        if (err instanceof HistoricoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
