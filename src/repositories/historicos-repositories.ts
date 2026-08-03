import { Prisma } from "../../generated/prisma/client";


/** Movimentação com o autor, exibido na timeline do chamado. */
export type HistoricoWithUsuario = Prisma.HistoricoGetPayload<{
    include: { usuario: { select: { id: true; nome: true; email: true } } };
}>;

export interface HistoricosRepository {
    findById(id: number): Promise<HistoricoWithUsuario | null>;
    findMany(): Promise<HistoricoWithUsuario[]>;
    findManyByChamadoId(chamadoId: number): Promise<HistoricoWithUsuario[]>;
    create(data: Prisma.HistoricoCreateInput): Promise<HistoricoWithUsuario>;
    update(id: number, data: Prisma.HistoricoUpdateInput): Promise<HistoricoWithUsuario>;
    delete(id: number): Promise<void>;
}
