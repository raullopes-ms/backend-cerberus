import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeListHistoricosUseCase } from "../use-cases/factories/make-list-historicos-use-case";
import { makeGetChamadoUseCase } from "../use-cases/factories/make-get-chamado-use-case";
import { ChamadoNotFoundError } from "../use-cases/errors/chamadoNotFound";

export async function listHistoricos(request: FastifyRequest, reply: FastifyReply) {
    const listHistoricosQuerySchema = z.object({
        chamadoId: z.coerce.number().optional(),
    })
    const { chamadoId } = listHistoricosQuerySchema.parse(request.query);
    const { sub, setorId, role } = request.user;
    const isAdmin = role === "admin";

    /* O histórico carrega o conteúdo das conversas, então segue a visibilidade do
       próprio chamado. Sem `chamadoId` a listagem completa fica restrita ao admin. */
    if (!isAdmin) {
        if (!chamadoId) {
            return reply.status(400).send({
                message: "Informe o chamadoId para listar o histórico.",
            });
        }
        try {
            const { chamado } = await makeGetChamadoUseCase().execute({ id: chamadoId });
            const canRead = chamado.criadoPorId === Number(sub)
                || (setorId !== undefined && chamado.setorDestinoId === Number(setorId));
            if (!canRead) {
                return reply.status(404).send({ message: new ChamadoNotFoundError().message });
            }
        } catch (err) {
            if (err instanceof ChamadoNotFoundError) {
                return reply.status(404).send({ message: err.message });
            }
            throw err;
        }
    }

    const listHistoricosUseCase = makeListHistoricosUseCase();
    const { historicos } = await listHistoricosUseCase.execute({ chamadoId });
    return reply.status(200).send({ historicos });
}
