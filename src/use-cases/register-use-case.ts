import { UsersRepository } from "../repositories/users-repositories";
import {hash} from "bcryptjs";
import { User } from "../../generated/prisma/client";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";

interface RegisterUseCaseRequest {
    nome: string;
    email: string;
    senha: string;
    cargoId: number;
    setorId: number;
}
interface RegisterUseCaseResponse {
    user: User;
}
export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({nome, email, senha, cargoId, setorId}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new UserAlreadyExistsError();
        }
        const hashedPassword = await hash(senha, 8);
        const user = await this.usersRepository.create({
            nome,
            email,
            senhaHash: hashedPassword,
            cargo: {
                connect: { id: cargoId }
            },
            setor: {
                connect: { id: setorId }
            }
        });
        return { user };
    }
}