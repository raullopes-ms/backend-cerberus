import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateHistoricoUseCase } from "../use-cases/factories/make-update-historico-use-case";
import { HistoricoNotFoundError } from "../use-cases/errors/historicoNotFound";

export async function updateHistorico(request: FastifyRequest, reply: FastifyReply) {
    const updateHistoricoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const updateHistoricoBodySchema = z.object({
        descricao: z.string().optional(),
    })
    const { id } = updateHistoricoParamsSchema.parse(request.params);
    const { descricao } = updateHistoricoBodySchema.parse(request.body);
    try {
        const updateHistoricoUseCase = makeUpdateHistoricoUseCase();
        const { historico } = await updateHistoricoUseCase.execute({ id, descricao });
        return reply.status(200).send({ historico });
    } catch (err) {
        if (err instanceof HistoricoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
