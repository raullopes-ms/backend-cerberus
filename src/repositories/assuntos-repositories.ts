import { Prisma, Assunto } from "../../generated/prisma/client";


export interface AssuntosRepository {
    findById(id: number): Promise<Assunto | null>;
    findByNome(nome: string): Promise<Assunto | null>;
    findMany(): Promise<Assunto[]>;
    create(data: Prisma.AssuntoCreateInput): Promise<Assunto>;
    update(id: number, data: Prisma.AssuntoUpdateInput): Promise<Assunto>;
    delete(id: number): Promise<void>;
}
