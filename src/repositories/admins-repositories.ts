import { Prisma, Admin } from "../../generated/prisma/client";

export interface AdminsRepository {
    findById(id: number): Promise<Admin | null>;
    findByEmail(email: string): Promise<Admin | null>;
    create(data: Prisma.AdminCreateInput): Promise<Admin>;
}
