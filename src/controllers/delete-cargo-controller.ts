import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeDeleteCargoUseCase } from "../use-cases/factories/make-delete-cargo-use-case";
import { CargoNotFoundError } from "../use-cases/errors/cargoNotFound";

export async function deleteCargo(request: FastifyRequest, reply: FastifyReply) {
    const deleteCargoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const { id } = deleteCargoParamsSchema.parse(request.params);
    try {
        const deleteCargoUseCase = makeDeleteCargoUseCase();
        await deleteCargoUseCase.execute({ id });
        return reply.status(204).send();
    } catch (err) {
        if (err instanceof CargoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        throw err;
    }
}
