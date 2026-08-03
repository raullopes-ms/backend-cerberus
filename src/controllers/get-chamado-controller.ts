import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetChamadoUseCase } from "../use-cases/factories/make-get-chamado-use-case";
import { ChamadoNotFoundError } from "../use-cases/errors/chamadoNotFound";

export async function getChamado(request: FastifyRequest, reply: FastifyReply) {
    const getChamadoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = getChamadoParamsSchema.parse(request.params);
    const { sub, setorId, role } = request.user;
    try {
        const getChamadoUseCase = makeGetChamadoUseCase();
        const { chamado } = await getChamadoUseCase.execute({ id });

        /* Mesma regra da listagem: solicitante ou setor de destino. Responde 404
           em vez de 403 para não revelar a existência de chamados alheios. */
        const canRead = role === "admin"
            || chamado.criadoPorId === Number(sub)
            || (setorId !== undefined && chamado.setorDestinoId === Number(setorId));
        if (!canRead) {
            return reply.status(404).send({ message: new ChamadoNotFoundError().message });
        }

        return reply.status(200).send({ chamado });
    } catch (err) {
        if (err instanceof ChamadoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
