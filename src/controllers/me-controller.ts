import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../use-cases/factories/make-get-user-profile-use-case";
import { UserNotFoundError } from "../use-cases/errors/userNotFound";
import { toUserResponse } from "./serializers/user-serializer";

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

        return reply.status(200).send({ user: toUserResponse(user) });
    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
