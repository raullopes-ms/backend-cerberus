import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { AssuntosRepository } from "../assuntos-repositories";



export class PrismaAssuntosRepository implements AssuntosRepository {
    async findById(id: number) {
        const assunto = await prisma.assunto.findUnique({
            where: {
                id,
            },
        });
        return assunto;
    }
    async findByNome(nome: string) {
        const assunto = await prisma.assunto.findUnique({
            where: {
                nome,
            },
        });
        return assunto;
    }
    async findMany() {
        // Ordem alfabética: alimenta diretamente o select de assuntos do front.
        const assuntos = await prisma.assunto.findMany({
            orderBy: {
                nome: "asc",
            },
        });
        return assuntos;
    }
    async create(data: Prisma.AssuntoCreateInput) {
        const assunto = await prisma.assunto.create({
            data,
        });
        return assunto;
    }
    async update(id: number, data: Prisma.AssuntoUpdateInput) {
        const assunto = await prisma.assunto.update({
            where: {
                id,
            },
            data,
        });
        return assunto;
    }
    async delete(id: number) {
        await prisma.assunto.delete({
            where: {
                id,
            },
        });
    }
}
