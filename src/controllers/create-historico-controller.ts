import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateHistoricoUseCase } from "../use-cases/factories/make-create-historico-use-case";
import { ChamadoNotFoundError } from "../use-cases/errors/chamadoNotFound";

export async function createHistorico(request: FastifyRequest, reply: FastifyReply) {
    const createHistoricoBodySchema = z.object({
        descricao: z.string(),
        chamadoId: z.number(),
    })
    const { descricao, chamadoId } = createHistoricoBodySchema.parse(request.body);
    const { sub } = request.user;
    try {
        const createHistoricoUseCase = makeCreateHistoricoUseCase();
        const { historico } = await createHistoricoUseCase.execute({
            descricao,
            chamadoId,
            usuarioId: Number(sub),
        });
        return reply.status(201).send({ historico });
    } catch (err) {
        if (err instanceof ChamadoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
