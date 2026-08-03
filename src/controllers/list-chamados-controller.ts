import { FastifyReply, FastifyRequest } from "fastify";
import { makeListChamadosUseCase } from "../use-cases/factories/make-list-chamados-use-case";

export async function listChamados(request: FastifyRequest, reply: FastifyReply) {
    const { sub, setorId, role } = request.user;

    /* Um usuário comum só enxerga o que abriu e o que chegou ao seu setor. O
       recorte vem do token, nunca da query, para que ninguém consiga listar os
       chamados de outra pessoa trocando um parâmetro. */
    const visibility = role === "admin" || !setorId
        ? undefined
        : { criadoPorId: Number(sub), setorDestinoId: Number(setorId) };

    const listChamadosUseCase = makeListChamadosUseCase();
    const { chamados } = await listChamadosUseCase.execute({ visibility });
    return reply.status(200).send({ chamados });
}
