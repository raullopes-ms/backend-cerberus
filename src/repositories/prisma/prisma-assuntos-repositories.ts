import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { AssuntosRepository } from "../assuntos-repositories";

const assuntoInclude = {
    setores: { include: { setor: true } },
} satisfies Prisma.AssuntoInclude;

export class PrismaAssuntosRepository implements AssuntosRepository {
    async findById(id: number) {
        const assunto = await prisma.assunto.findUnique({
            where: {
                id,
            },
            include: assuntoInclude,
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
            include: assuntoInclude,
        });
        return assuntos;
    }
    async create(data: Prisma.AssuntoCreateInput, setorIds: number[]) {
        const assunto = await prisma.assunto.create({
            data: {
                ...data,
                setores: {
                    create: setorIds.map((setorId) => ({ setor: { connect: { id: setorId } } })),
                },
            },
            include: assuntoInclude,
        });
        return assunto;
    }
    async update(id: number, data: Prisma.AssuntoUpdateInput, setorIds?: number[]) {
        const assunto = await prisma.assunto.update({
            where: {
                id,
            },
            data: {
                ...data,
                ...(setorIds !== undefined && {
                    setores: {
                        deleteMany: {},
                        create: setorIds.map((setorId) => ({ setor: { connect: { id: setorId } } })),
                    },
                }),
            },
            include: assuntoInclude,
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
