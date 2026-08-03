import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateChamadoUseCase } from "../use-cases/factories/make-create-chamado-use-case";

export async function createChamado(request: FastifyRequest, reply: FastifyReply) {
    const createChamadoBodySchema = z.object({
        titulo: z.string(),
        descricao: z.string(),
        assuntoId: z.number(),
        setorDestinoId: z.number(),
    })
    const { titulo, descricao, assuntoId, setorDestinoId } = createChamadoBodySchema.parse(request.body);
    const { sub, setorId } = request.user;
    if (!setorId) {
        return reply.status(400).send({ message: "Setor de origem não identificado para este usuário." });
    }
    const createChamadoUseCase = makeCreateChamadoUseCase();
    const { chamado } = await createChamadoUseCase.execute({
        titulo,
        descricao,
        assuntoId,
        setorDestinoId,
        setorOrigemId: Number(setorId),
        criadoPorId: Number(sub),
    });
    return reply.status(201).send({ chamado });
}
