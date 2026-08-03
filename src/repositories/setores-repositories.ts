import { Prisma, Setor } from "../../generated/prisma/client";


export interface SetoresRepository {
    findById(id: number): Promise<Setor | null>;
    findByNome(nome: string): Promise<Setor | null>;
    findMany(): Promise<Setor[]>;
    create(data: Prisma.SetorCreateInput): Promise<Setor>;
    update(id: number, data: Prisma.SetorUpdateInput): Promise<Setor>;
    delete(id: number): Promise<void>;
}
