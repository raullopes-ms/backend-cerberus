import { compare } from "bcryptjs";
import { Admin } from "../../generated/prisma/client";
import { AdminsRepository } from "../repositories/admins-repositories";
import { InvalidCredentialsError } from "./errors/invalidCredentials";

interface AuthenticateAdminUseCaseRequest {
    email: string;
    senha: string;
}
interface AuthenticateAdminUseCaseResponse {
    admin: Admin
}
export class AuthenticateAdminUseCase {
    constructor(private adminsRepository: AdminsRepository) {}
    async execute({ email, senha }: AuthenticateAdminUseCaseRequest): Promise<AuthenticateAdminUseCaseResponse> {
        const admin = await this.adminsRepository.findByEmail(email);
        if (!admin){
            throw new InvalidCredentialsError();
        }
        const isPasswordCorrect = await compare(senha, admin.senhaHash);
        if (!isPasswordCorrect) {
            throw new InvalidCredentialsError();
        }
        return { admin };
    }
}
