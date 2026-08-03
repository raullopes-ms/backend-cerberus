import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetHistoricoUseCase } from "../use-cases/factories/make-get-historico-use-case";
import { HistoricoNotFoundError } from "../use-cases/errors/historicoNotFound";

export async function getHistorico(request: FastifyRequest, reply: FastifyReply) {
    const getHistoricoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = getHistoricoParamsSchema.parse(request.params);
    try {
        const getHistoricoUseCase = makeGetHistoricoUseCase();
        const { historico } = await getHistoricoUseCase.execute({ id });
        return reply.status(200).send({ historico });
    } catch (err) {
        if (err instanceof HistoricoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
