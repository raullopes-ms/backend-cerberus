import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteAssuntoUseCase } from "../use-cases/factories/make-delete-assunto-use-case";
import { AssuntoNotFoundError } from "../use-cases/errors/assuntoNotFound";

export async function deleteAssunto(request: FastifyRequest, reply: FastifyReply) {
    const deleteAssuntoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = deleteAssuntoParamsSchema.parse(request.params);
    try {
        const deleteAssuntoUseCase = makeDeleteAssuntoUseCase();
        await deleteAssuntoUseCase.execute({ id });
        return reply.status(204).send();
    } catch (err) {
        if (err instanceof AssuntoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
