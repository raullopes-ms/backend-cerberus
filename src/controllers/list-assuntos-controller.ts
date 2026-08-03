import { FastifyReply, FastifyRequest } from "fastify";
import { makeListAssuntosUseCase } from "../use-cases/factories/make-list-assuntos-use-case";
import { toAssuntoResponse } from "./serializers/assunto-serializer";

export async function listAssuntos(request: FastifyRequest, reply: FastifyReply) {
    const listAssuntosUseCase = makeListAssuntosUseCase();
    const { assuntos } = await listAssuntosUseCase.execute();
    return reply.status(200).send({ assuntos: assuntos.map(toAssuntoResponse) });
}
