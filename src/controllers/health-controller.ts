import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../lib/prisma";

export async function health(request: FastifyRequest, reply: FastifyReply) {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return reply.status(200).send({ status: "ok", database: "up" });
    } catch (err) {
        return reply.status(503).send({ status: "error", database: "down" });
    }
}
