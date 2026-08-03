import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateChamadoUseCase } from "../use-cases/factories/make-update-chamado-use-case";
import { ChamadoNotFoundError } from "../use-cases/errors/chamadoNotFound";

export async function updateChamado(request: FastifyRequest, reply: FastifyReply) {
    const updateChamadoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const updateChamadoBodySchema = z.object({
        titulo: z.string().optional(),
        descricao: z.string().optional(),
        assuntoId: z.number().optional(),
        setorDestinoId: z.number().optional(),
        // `null` limpa o atendente — usado quando o chamado é transferido de setor.
        atendidoPorId: z.number().nullable().optional(),
        status: z.enum(["ABERTO", "EM_ANDAMENTO", "RECUSADO", "FECHADO"]).optional(),
    })
    const { id } = updateChamadoParamsSchema.parse(request.params);
    const { titulo, descricao, assuntoId, setorDestinoId, atendidoPorId, status } = updateChamadoBodySchema.parse(request.body);
    try {
        const updateChamadoUseCase = makeUpdateChamadoUseCase();
        const { chamado } = await updateChamadoUseCase.execute({
            id,
            titulo,
            descricao,
            assuntoId,
            setorDestinoId,
            atendidoPorId,
            status,
        });
        return reply.status(200).send({ chamado });
    } catch (err) {
        if (err instanceof ChamadoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
