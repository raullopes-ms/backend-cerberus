import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateAssuntoUseCase } from "../use-cases/factories/make-update-assunto-use-case";
import { AssuntoNotFoundError } from "../use-cases/errors/assuntoNotFound";
import { AssuntoAlreadyExistsError } from "../use-cases/errors/assuntoAlreadyExists";
import { SetorNotFoundError } from "../use-cases/errors/setorNotFound";
import { toAssuntoResponse } from "./serializers/assunto-serializer";

export async function updateAssunto(request: FastifyRequest, reply: FastifyReply) {
    const updateAssuntoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const updateAssuntoBodySchema = z.object({
        nome: z.string().optional(),
        ativo: z.boolean().optional(),
        setorIds: z.array(z.number()).optional(),
    })
    const { id } = updateAssuntoParamsSchema.parse(request.params);
    const { nome, ativo, setorIds } = updateAssuntoBodySchema.parse(request.body);
    try {
        const updateAssuntoUseCase = makeUpdateAssuntoUseCase();
        const { assunto } = await updateAssuntoUseCase.execute({ id, nome, ativo, setorIds });
        return reply.status(200).send({ assunto: toAssuntoResponse(assunto) });
    } catch (err) {
        if (err instanceof AssuntoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof AssuntoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        if (err instanceof SetorNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
