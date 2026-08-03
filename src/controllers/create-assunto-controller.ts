import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateAssuntoUseCase } from "../use-cases/factories/make-create-assunto-use-case";
import { AssuntoAlreadyExistsError } from "../use-cases/errors/assuntoAlreadyExists";
import { SetorNotFoundError } from "../use-cases/errors/setorNotFound";
import { toAssuntoResponse } from "./serializers/assunto-serializer";

export async function createAssunto(request: FastifyRequest, reply: FastifyReply) {
    const createAssuntoBodySchema = z.object({
        nome: z.string(),
        setorIds: z.array(z.number()).min(1),
    })
    const { nome, setorIds } = createAssuntoBodySchema.parse(request.body);
    try {
        const createAssuntoUseCase = makeCreateAssuntoUseCase();
        const { assunto } = await createAssuntoUseCase.execute({ nome, setorIds });
        return reply.status(201).send({ assunto: toAssuntoResponse(assunto) });
    } catch (err) {
        if (err instanceof AssuntoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        if (err instanceof SetorNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
