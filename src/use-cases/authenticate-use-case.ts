import { compare } from "bcryptjs";
import { User } from "../../generated/prisma/client";
import { UsersRepository } from "../repositories/users-repositories";
import { InvalidCredentialsError } from "./errors/invalidCredentials";

interface AuthenticateUseCaseRequest {
    email: string;
    senha: string;
}
interface AuthenticateUseCaseResponse {
    user: User
}
export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({ email, senha }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user){
            throw new InvalidCredentialsError();
        }
        const isPasswordCorrect = await compare(senha, user.senhaHash);
        if (!isPasswordCorrect) {
            throw new InvalidCredentialsError();
        }
        return { user };
    }
}