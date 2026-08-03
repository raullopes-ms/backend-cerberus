import { Prisma, User } from "../../generated/prisma/client";


/** Usuário com os vínculos que o front-end precisa exibir (cargo e setor). */
export type UserProfile = Prisma.UserGetPayload<{
    include: { cargo: true; setor: true };
}>;

export interface UsersRepository {
    findById(id: number): Promise<User | null>;
    findProfileById(id: number): Promise<UserProfile | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
}