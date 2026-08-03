import { hash } from "bcryptjs";
import { Prisma, StatusUsuario } from "../../generated/prisma/client";
import { UserProfile, UsersRepository } from "../repositories/users-repositories";
import { UserNotFoundError } from "./errors/userNotFound";
import { UserAlreadyExistsError } from "./errors/userAlreadyExists";

interface UpdateUserUseCaseRequest {
    id: number;
    nome?: string | undefined;
    email?: string | undefined;
    /** Quando informada, substitui a senha atual; o hash é refeito aqui. */
    senha?: string | undefined;
    cargoId?: number | undefined;
    setorId?: number | undefined;
    status?: StatusUsuario | undefined;
}
interface UpdateUserUseCaseResponse {
    user: UserProfile;
}
export class UpdateUserUseCase {
    constructor(private usersRepository: UsersRepository) {}
    async execute({
        id,
        nome,
        email,
        senha,
        cargoId,
        setorId,
        status,
    }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
        const existingUser = await this.usersRepository.findById(id);
        if (!existingUser) {
            throw new UserNotFoundError();
        }
        // O e-mail é a credencial de login: precisa continuar único.
        if (email && email !== existingUser.email) {
            const userWithSameEmail = await this.usersRepository.findByEmail(email);
            if (userWithSameEmail) {
                throw new UserAlreadyExistsError();
            }
        }
        const data: Prisma.UserUpdateInput = {};
        if (nome !== undefined) data.nome = nome;
        if (email !== undefined) data.email = email;
        if (senha !== undefined) data.senhaHash = await hash(senha, 8);
        if (cargoId !== undefined) data.cargo = { connect: { id: cargoId } };
        if (setorId !== undefined) data.setor = { connect: { id: setorId } };
        if (status !== undefined) data.status = status;
        const user = await this.usersRepository.update(id, data);
        return { user };
    }
}
