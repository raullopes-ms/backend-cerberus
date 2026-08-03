import { prisma } from "../../lib/prisma";
import { Prisma } from "../../../generated/prisma/client";
import { AdminsRepository } from "../admins-repositories";

export class PrismaAdminsRepository implements AdminsRepository {
    async findById(id: number) {
        const admin = await prisma.admin.findUnique({ where: { id } });
        return admin;
    }
    async findByEmail(email: string) {
        const admin = await prisma.admin.findUnique({ where: { email } });
        return admin;
    }
    async create(data: Prisma.AdminCreateInput) {
        const admin = await prisma.admin.create({ data });
        return admin;
    }
}
