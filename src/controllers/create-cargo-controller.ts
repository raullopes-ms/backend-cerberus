import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { makeCreateCargoUseCase } from "../use-cases/factories/make-create-cargo-use-case";
import { CargoAlreadyExistsError } from "../use-cases/errors/cargoAlreadyExists";

export async function createCargo(request: FastifyRequest, reply: FastifyReply) {
    const createCargoBodySchema = z.object({
        nome: z.string(),
    })
    const { nome } = createCargoBodySchema.parse(request.body);
    try {
        const createCargoUseCase = makeCreateCargoUseCase();
        const { cargo } = await createCargoUseCase.execute({ nome });
        return reply.status(201).send({ cargo });
    } catch (err) {
        if (err instanceof CargoAlreadyExistsError) {
            return reply.status(409).send({ message: err.message });
        }
        throw err;
    }
}
