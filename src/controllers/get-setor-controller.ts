import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetSetorUseCase } from "../use-cases/factories/make-get-setor-use-case";
import { SetorNotFoundError } from "../use-cases/errors/setorNotFound";

export async function getSetor(request: FastifyRequest, reply: FastifyReply) {
    const getSetorParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = getSetorParamsSchema.parse(request.params);
    try {
        const getSetorUseCase = makeGetSetorUseCase();
        const { setor } = await getSetorUseCase.execute({ id });
        return reply.status(200).send({ setor });
    } catch (err) {
        if (err instanceof SetorNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
