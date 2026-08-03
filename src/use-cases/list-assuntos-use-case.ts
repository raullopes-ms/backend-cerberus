import { AssuntosRepository } from "../repositories/assuntos-repositories";
import { Assunto } from "../../generated/prisma/client";

interface ListAssuntosUseCaseResponse {
    assuntos: Assunto[];
}
export class ListAssuntosUseCase {
    constructor(private assuntosRepository: AssuntosRepository) {}
    async execute(): Promise<ListAssuntosUseCaseResponse> {
        const assuntos = await this.assuntosRepository.findMany();
        return { assuntos };
    }
}
