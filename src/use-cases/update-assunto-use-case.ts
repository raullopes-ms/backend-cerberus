import { AssuntosRepository } from "../repositories/assuntos-repositories";
import { Assunto, Prisma } from "../../generated/prisma/client";
import { AssuntoNotFoundError } from "./errors/assuntoNotFound";
import { AssuntoAlreadyExistsError } from "./errors/assuntoAlreadyExists";

interface UpdateAssuntoUseCaseRequest {
    id: number;
    nome?: string | undefined;
    ativo?: boolean | undefined;
}
interface UpdateAssuntoUseCaseResponse {
    assunto: Assunto;
}
export class UpdateAssuntoUseCase {
    constructor(private assuntosRepository: AssuntosRepository) {}
    async execute({ id, nome, ativo }: UpdateAssuntoUseCaseRequest): Promise<UpdateAssuntoUseCaseResponse> {
        const existingAssunto = await this.assuntosRepository.findById(id);
        if (!existingAssunto) {
            throw new AssuntoNotFoundError();
        }
        if (nome && nome !== existingAssunto.nome) {
            const assuntoWithSameNome = await this.assuntosRepository.findByNome(nome);
            if (assuntoWithSameNome) {
                throw new AssuntoAlreadyExistsError();
            }
        }
        const data: Prisma.AssuntoUpdateInput = {};
        if (nome !== undefined) data.nome = nome;
        if (ativo !== undefined) data.ativo = ativo;
        const assunto = await this.assuntosRepository.update(id, data);
        return { assunto };
    }
}
