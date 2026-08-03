import { FastifyReply, FastifyRequest } from "fastify";
import { makeListSetoresUseCase } from "../use-cases/factories/make-list-setores-use-case";

export async function listSetores(request: FastifyRequest, reply: FastifyReply) {
    const listSetoresUseCase = makeListSetoresUseCase();
    const { setores } = await listSetoresUseCase.execute();
    return reply.status(200).send({ setores });
}
