import { AssuntosRepository } from "../repositories/assuntos-repositories";
import { Assunto } from "../../generated/prisma/client";
import { AssuntoNotFoundError } from "./errors/assuntoNotFound";

interface GetAssuntoUseCaseRequest {
    id: number;
}
interface GetAssuntoUseCaseResponse {
    assunto: Assunto;
}
export class GetAssuntoUseCase {
    constructor(private assuntosRepository: AssuntosRepository) {}
    async execute({ id }: GetAssuntoUseCaseRequest): Promise<GetAssuntoUseCaseResponse> {
        const assunto = await this.assuntosRepository.findById(id);
        if (!assunto) {
            throw new AssuntoNotFoundError();
        }
        return { assunto };
    }
}
