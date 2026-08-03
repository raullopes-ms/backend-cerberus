import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetAssuntoUseCase } from "../use-cases/factories/make-get-assunto-use-case";
import { AssuntoNotFoundError } from "../use-cases/errors/assuntoNotFound";
import { toAssuntoResponse } from "./serializers/assunto-serializer";

export async function getAssunto(request: FastifyRequest, reply: FastifyReply) {
    const getAssuntoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = getAssuntoParamsSchema.parse(request.params);
    try {
        const getAssuntoUseCase = makeGetAssuntoUseCase();
        const { assunto } = await getAssuntoUseCase.execute({ id });
        return reply.status(200).send({ assunto: toAssuntoResponse(assunto) });
    } catch (err) {
        if (err instanceof AssuntoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
