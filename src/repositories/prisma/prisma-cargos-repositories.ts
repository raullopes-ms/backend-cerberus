import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { CargosRepository } from "../cargos-repositories";



export class PrismaCargosRepository implements CargosRepository {
    async findById(id: number) {
        const cargo = await prisma.cargo.findUnique({
            where: {
                id,
            },
        });
        return cargo;
    }
    async findByNome(nome: string) {
        const cargo = await prisma.cargo.findUnique({
            where: {
                nome,
            },
        });
        return cargo;
    }
    async findMany() {
        const cargos = await prisma.cargo.findMany();
        return cargos;
    }
    async create(data: Prisma.CargoCreateInput) {
        const cargo = await prisma.cargo.create({
            data,
        });
        return cargo;
    }
    async update(id: number, data: Prisma.CargoUpdateInput) {
        const cargo = await prisma.cargo.update({
            where: {
                id,
            },
            data,
        });
        return cargo;
    }
    async delete(id: number) {
        await prisma.cargo.delete({
            where: {
                id,
            },
        });
    }
}
