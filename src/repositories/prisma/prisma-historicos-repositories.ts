import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { HistoricosRepository } from "../historicos-repositories";


/* A timeline mostra quem fez cada movimentação, então o autor acompanha todo
   histórico devolvido pela API. */
const HISTORICO_INCLUDE = {
    usuario: { select: { id: true, nome: true, email: true } },
} satisfies Prisma.HistoricoInclude;


export class PrismaHistoricosRepository implements HistoricosRepository {
    async findById(id: number) {
        const historico = await prisma.historico.findUnique({
            where: {
                id,
            },
            include: HISTORICO_INCLUDE,
        });
        return historico;
    }
    async findMany() {
        const historicos = await prisma.historico.findMany({
            include: HISTORICO_INCLUDE,
            orderBy: {
                createdAt: "asc",
            },
        });
        return historicos;
    }
    async findManyByChamadoId(chamadoId: number) {
        const historicos = await prisma.historico.findMany({
            where: {
                chamadoId,
            },
            include: HISTORICO_INCLUDE,
            // Ordem cronológica: a timeline é lida de cima para baixo.
            orderBy: {
                createdAt: "asc",
            },
        });
        return historicos;
    }
    async create(data: Prisma.HistoricoCreateInput) {
        const historico = await prisma.historico.create({
            data,
            include: HISTORICO_INCLUDE,
        });
        return historico;
    }
    async update(id: number, data: Prisma.HistoricoUpdateInput) {
        const historico = await prisma.historico.update({
            where: {
                id,
            },
            data,
            include: HISTORICO_INCLUDE,
        });
        return historico;
    }
    async delete(id: number) {
        await prisma.historico.delete({
            where: {
                id,
            },
        });
    }
}
