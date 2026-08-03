import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeUpdateCargoUseCase } from "../use-cases/factories/make-update-cargo-use-case";
import { CargoNotFoundError } from "../use-cases/errors/cargoNotFound";
import { CargoAlreadyExistsError } from "../use-cases/errors/cargoAlreadyExists";

export async function updateCargo(request: FastifyRequest, reply: FastifyReply) {
    const updateCargoParamsSchema = z.object({
        id: z.coerce.number(),
    })
    const updateCargoBodySchema = z.object({
        nome: z.string().optional(),
        ativo: z.boolean().optional(),
    })
    const { id } = updateCargoParamsSchema.parse(request.params);
    const { nome, ativo } = updateCargoBodySchema.parse(request.body);
    try {
        const updateCargoUseCase = makeUpdateCargoUseCase();
        const { cargo } = await updateCargoUseCase.execute({ id, nome, ativo });
        return reply.status(200).send({ cargo });
    } catch (err) {
        if (err instanceof CargoNotFoundError) {
            return reply.status(404).send({ message: err.message });
        }
        if (err instanceof CargoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
