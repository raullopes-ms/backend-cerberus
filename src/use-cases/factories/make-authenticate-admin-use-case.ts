import { PrismaAdminsRepository } from "../../repositories/prisma/prisma-admins-repositories";
import { AuthenticateAdminUseCase } from "../authenticate-admin-use-case";

export function makeAuthenticateAdminUseCase() {
    const adminsRepository = new PrismaAdminsRepository();
    const authenticateAdminUseCase = new AuthenticateAdminUseCase(adminsRepository);
    return authenticateAdminUseCase;
}
