import { Prisma, Cargo } from "../../generated/prisma/client";


export interface CargosRepository {
    findById(id: number): Promise<Cargo | null>;
    findByNome(nome: string): Promise<Cargo | null>;
    findMany(): Promise<Cargo[]>;
    create(data: Prisma.CargoCreateInput): Promise<Cargo>;
    update(id: number, data: Prisma.CargoUpdateInput): Promise<Cargo>;
    delete(id: number): Promise<void>;
}
