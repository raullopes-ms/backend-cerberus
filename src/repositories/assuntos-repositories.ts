import { Prisma, Assunto } from "../../generated/prisma/client";

export type AssuntoWithSetores = Prisma.AssuntoGetPayload<{
    include: { setores: { include: { setor: true } } };
}>;

export interface AssuntosRepository {
    findById(id: number): Promise<AssuntoWithSetores | null>;
    findByNome(nome: string): Promise<Assunto | null>;
    findMany(): Promise<AssuntoWithSetores[]>;
    create(data: Prisma.AssuntoCreateInput, setorIds: number[]): Promise<AssuntoWithSetores>;
    update(id: number, data: Prisma.AssuntoUpdateInput, setorIds?: number[]): Promise<AssuntoWithSetores>;
    delete(id: number): Promise<void>;
}
