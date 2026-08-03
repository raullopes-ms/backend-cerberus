import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeGetCargoUseCase } from "../use-cases/factories/make-get-cargo-use-case";
import { CargoNotFoundError } from "../use-cases/errors/cargoNotFound";

export async function getCargo(request: FastifyRequest, reply: FastifyReply) {
    const getCargoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = getCargoParamsSchema.parse(request.params);
    try {
        const getCargoUseCase = makeGetCargoUseCase();
        const { cargo } = await getCargoUseCase.execute({ id });
        return reply.status(200).send({ cargo });
    } catch (err) {
        if (err instanceof CargoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
