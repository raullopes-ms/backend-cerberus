import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetAdminProfileUseCase } from "../use-cases/factories/make-get-admin-profile-use-case";
import { UserNotFoundError } from "../use-cases/errors/userNotFound";

/**
 * Perfil do administrador autenticado. O `/me` de usuário não serve aqui: o
 * token de admin aponta para a tabela `admins`, que não tem cargo nem setor.
 */
export async function adminMe(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user;
    try {
        const getAdminProfileUseCase = makeGetAdminProfileUseCase();
        const { admin } = await getAdminProfileUseCase.execute({ id: Number(sub) });
        // Serialização explícita: `senhaHash` nunca sai na resposta.
        return reply.status(200).send({
            admin: {
                id: admin.id,
                nome: admin.nome,
                email: admin.email,
                status: admin.status,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt,
            },
        });
    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
