import { PrismaAdminsRepository } from "../../repositories/prisma/prisma-admins-repositories";
import { GetAdminProfileUseCase } from "../get-admin-profile-use-case";

export function makeGetAdminProfileUseCase() {
    const adminsRepository = new PrismaAdminsRepository();
    const getAdminProfileUseCase = new GetAdminProfileUseCase(adminsRepository);
    return getAdminProfileUseCase;
}
