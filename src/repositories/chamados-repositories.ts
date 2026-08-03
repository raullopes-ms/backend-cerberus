import { Prisma, Chamado } from "../../generated/prisma/client";


/**
 * Chamado com os vínculos que a interface exibe (nomes de setor, assunto,
 * solicitante e atendente). Sem isso o front-end precisaria de uma requisição
 * extra por chamado só para resolver cada nome.
 */
export type ChamadoWithRelations = Prisma.ChamadoGetPayload<{
    include: {
        assunto: true;
        setorOrigem: true;
        setorDestino: true;
        criadoPor: { select: { id: true; nome: true; email: true } };
        atendidoPor: { select: { id: true; nome: true; email: true } };
    };
}>;

/**
 * Recorte da listagem. Um usuário enxerga o que abriu (`criadoPorId`) e o que
 * chegou para o setor dele (`setorDestinoId`) — os dois combinados em OU.
 */
export interface ChamadosVisibilityFilter {
    criadoPorId: number;
    setorDestinoId: number;
}

export interface ChamadosRepository {
    findById(id: number): Promise<ChamadoWithRelations | null>;
    findMany(filter?: ChamadosVisibilityFilter): Promise<ChamadoWithRelations[]>;
    create(data: Prisma.ChamadoCreateInput): Promise<ChamadoWithRelations>;
    update(id: number, data: Prisma.ChamadoUpdateInput): Promise<ChamadoWithRelations>;
    delete(id: number): Promise<void>;
}
