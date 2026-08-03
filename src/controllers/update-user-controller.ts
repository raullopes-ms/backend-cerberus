import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateUserUseCase } from "../use-cases/factories/make-update-user-use-case";
import { UserNotFoundError } from "../use-cases/errors/userNotFound";
import { UserAlreadyExistsError } from "../use-cases/errors/userAlreadyExists";
import { toUserResponse } from "./serializers/user-serializer";

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
    const updateUserParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const updateUserBodySchema = z.object({
        nome: z.string().min(1).optional(),
        email: z.email().optional(),
        // Ausente mantém a senha atual; informada, substitui.
        senha: z.string().min(6).optional(),
        cargoId: z.number().optional(),
        setorId: z.number().optional(),
        status: z.enum(["ATIVO", "INATIVO"]).optional(),
    })
    const { id } = updateUserParamsSchema.parse(request.params);
    const body = updateUserBodySchema.parse(request.body);
    try {
        const updateUserUseCase = makeUpdateUserUseCase();
        const { user } = await updateUserUseCase.execute({ id, ...body });
        return reply.status(200).send({ user: toUserResponse(user) });
    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
