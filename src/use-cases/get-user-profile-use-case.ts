import { UserProfile, UsersRepository } from "../repositories/users-repositories";
import { UserNotFoundError } from "./errors/userNotFound";

interface GetUserProfileUseCaseRequest {
    id: number;
}
interface GetUserProfileUseCaseResponse {
    user: UserProfile;
}
export class GetUserProfileUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({ id }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
        const user = await this.usersRepository.findProfileById(id);
        if (!user) {
            throw new UserNotFoundError();
        }
        return { user };
    }
}
