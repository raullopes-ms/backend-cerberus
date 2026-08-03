import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { SetoresRepository } from "../setores-repositories";



export class PrismaSetoresRepository implements SetoresRepository {
    async findById(id: number) {
        const setor = await prisma.setor.findUnique({
            where: {
                id,
            },
        });
        return setor;
    }
    async findByNome(nome: string) {
        const setor = await prisma.setor.findUnique({
            where: {
                nome,
            },
        });
        return setor;
    }
    async findMany() {
        const setores = await prisma.setor.findMany();
        return setores;
    }
    async create(data: Prisma.SetorCreateInput) {
        const setor = await prisma.setor.create({
            data,
        });
        return setor;
    }
    async update(id: number, data: Prisma.SetorUpdateInput) {
        const setor = await prisma.setor.update({
            where: {
                id,
            },
            data,
        });
        return setor;
    }
    async delete(id: number) {
        await prisma.setor.delete({
            where: {
                id,
            },
        });
    }
}
