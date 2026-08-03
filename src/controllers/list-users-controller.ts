import { FastifyReply, FastifyRequest } from "fastify";
import { makeListUsersUseCase } from "../use-cases/factories/make-list-users-use-case";
import { toUserResponse } from "./serializers/user-serializer";

export async function listUsers(_request: FastifyRequest, reply: FastifyReply) {
    const listUsersUseCase = makeListUsersUseCase();
    const { users } = await listUsersUseCase.execute();
    return reply.status(200).send({ users: users.map(toUserResponse) });
}
