import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../use-cases/factories/make-get-user-profile-use-case";
import { UserNotFoundError } from "../use-cases/errors/userNotFound";

/**
 * Perfil do usuário autenticado. O token carrega apenas `sub` e `setorId`, então
 * o front-end depende desta rota para saber nome, e-mail, cargo e setor de quem
 * está logado.
 */
export async function me(request: FastifyRequest, reply: FastifyReply) {
    const { sub, role } = request.user;

    // O token de admin aponta para a tabela `admins`, que não tem cargo/setor.
    if (role === "admin") {
        return reply.status(403).send({
            message: "Esta rota é exclusiva de usuários. Utilize o painel administrativo.",
        });
    }

    try {
        const getUserProfileUseCase = makeGetUserProfileUseCase();
        const { user } = await getUserProfileUseCase.execute({ id: Number(sub) });

        // Serialização explícita: garante que `senhaHash` nunca vaze na resposta.
        return reply.status(200).send({
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                status: user.status,
                cargo: { id: user.cargo.id, nome: user.cargo.nome },
                setor: { id: user.setor.id, nome: user.setor.nome },
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
