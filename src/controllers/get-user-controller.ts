import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetUserProfileUseCase } from "../use-cases/factories/make-get-user-profile-use-case";
import { UserNotFoundError } from "../use-cases/errors/userNotFound";
import { toUserResponse } from "./serializers/user-serializer";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
    const getUserParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = getUserParamsSchema.parse(request.params);
    try {
        const getUserProfileUseCase = makeGetUserProfileUseCase();
        const { user } = await getUserProfileUseCase.execute({ id });
        return reply.status(200).send({ user: toUserResponse(user) });
    } catch (err) {
        if (err instanceof UserNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
