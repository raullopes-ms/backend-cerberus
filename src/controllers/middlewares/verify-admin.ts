import {FastifyReply, FastifyRequest} from "fastify";

export async function verifyAdmin(request: FastifyRequest, reply: FastifyReply) {
    const {role} = request.user;
    if (role !== "admin") {
        return reply.status(403).send({ error: "Acesso restrito a administradores" });
    }
}