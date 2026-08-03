import { UserProfile, UsersRepository } from "../repositories/users-repositories";

interface ListUsersUseCaseResponse {
    users: UserProfile[];
}
export class ListUsersUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute(): Promise<ListUsersUseCaseResponse> {
        const users = await this.usersRepository.findManyProfiles();
        return { users };
    }
}
