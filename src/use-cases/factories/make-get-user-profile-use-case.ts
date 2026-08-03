import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repositories";
import { GetUserProfileUseCase } from "../get-user-profile-use-case";

export function makeGetUserProfileUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
    return getUserProfileUseCase;
}
