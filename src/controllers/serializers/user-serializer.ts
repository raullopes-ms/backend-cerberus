import { UserProfile } from "../../repositories/users-repositories";

/**
 * Formato único de usuário nas respostas da API. Montado campo a campo de
 * propósito: devolver a entidade inteira exporia `senhaHash`.
 */
export function toUserResponse(user: UserProfile) {
    return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        status: user.status,
        cargo: { id: user.cargo.id, nome: user.cargo.nome },
        setor: { id: user.setor.id, nome: user.setor.nome },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
