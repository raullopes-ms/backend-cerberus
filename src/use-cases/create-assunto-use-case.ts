import { AssuntosRepository } from "../repositories/assuntos-repositories";
import { Assunto } from "../../generated/prisma/client";
import { AssuntoAlreadyExistsError } from "./errors/assuntoAlreadyExists";

interface CreateAssuntoUseCaseRequest {
    nome: string;
}
interface CreateAssuntoUseCaseResponse {
    assunto: Assunto;
}
export class CreateAssuntoUseCase {
    constructor(private assuntosRepository: AssuntosRepository) {}
    async execute({ nome }: CreateAssuntoUseCaseRequest): Promise<CreateAssuntoUseCaseResponse> {
        const assuntoAlreadyExists = await this.assuntosRepository.findByNome(nome);
        if (assuntoAlreadyExists) {
            throw new AssuntoAlreadyExistsError();
        }
        const assunto = await this.assuntosRepository.create({ nome });
        return { assunto };
    }
}
