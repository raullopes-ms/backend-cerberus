import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { ChamadosRepository, ChamadosVisibilityFilter } from "../chamados-repositories";


/* Aplicado em toda leitura e escrita para que a resposta da API tenha sempre o
   mesmo formato — o front-end depende dos nomes, não só dos ids. */
const CHAMADO_INCLUDE = {
    assunto: true,
    setorOrigem: true,
    setorDestino: true,
    criadoPor: { select: { id: true, nome: true, email: true } },
    atendidoPor: { select: { id: true, nome: true, email: true } },
} satisfies Prisma.ChamadoInclude;


export class PrismaChamadosRepository implements ChamadosRepository {
    async findById(id: number) {
        const chamado = await prisma.chamado.findUnique({
            where: {
                id,
            },
            include: CHAMADO_INCLUDE,
        });
        return chamado;
    }
    async findMany(filter?: ChamadosVisibilityFilter) {
        /* `exactOptionalPropertyTypes` recusa `where: undefined` explícito, então a
           chave só entra no objeto quando há recorte a aplicar. */
        const where: Prisma.ChamadoWhereInput | undefined = filter
            ? {
                OR: [
                    { criadoPorId: filter.criadoPorId },
                    { setorDestinoId: filter.setorDestinoId },
                ],
            }
            : undefined;
        const chamados = await prisma.chamado.findMany({
            ...(where ? { where } : {}),
            include: CHAMADO_INCLUDE,
            orderBy: {
                createdAt: "desc",
            },
        });
        return chamados;
    }
    async create(data: Prisma.ChamadoCreateInput) {
        const chamado = await prisma.chamado.create({
            data,
            include: CHAMADO_INCLUDE,
        });
        return chamado;
    }
    async update(id: number, data: Prisma.ChamadoUpdateInput) {
        const chamado = await prisma.chamado.update({
            where: {
                id,
            },
            data,
            include: CHAMADO_INCLUDE,
        });
        return chamado;
    }
    async delete(id: number) {
        await prisma.chamado.delete({
            where: {
                id,
            },
        });
    }
}
