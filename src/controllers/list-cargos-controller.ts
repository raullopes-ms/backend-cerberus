import { FastifyReply, FastifyRequest } from "fastify";
import { makeListCargosUseCase } from "../use-cases/factories/make-list-cargos-use-case";

export async function listCargos(request: FastifyRequest, reply: FastifyReply) {
    const listCargosUseCase = makeListCargosUseCase();
    const { cargos } = await listCargosUseCase.execute();
    return reply.status(200).send({ cargos });
}
