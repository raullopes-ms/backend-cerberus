import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { UsersRepository } from "../users-repositories";



export class PrismaUsersRepository implements UsersRepository {
    async findById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async findProfileById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                cargo: true,
                setor: true,
            },
        });
        return user;
    }
    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async findManyProfiles() {
        const users = await prisma.user.findMany({
            include: {
                cargo: true,
                setor: true,
            },
            orderBy: {
                nome: "asc",
            },
        });
        return users;
    }
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data,
        });
        return user;
    }
    async update(id: number, data: Prisma.UserUpdateInput) {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data,
            include: {
                cargo: true,
                setor: true,
            },
        });
        return user;
    }
}