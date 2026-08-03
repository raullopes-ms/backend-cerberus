import { SetoresRepository } from "../repositories/setores-repositories";
import { Setor, Prisma } from "../../generated/prisma/client";
import { SetorNotFoundError } from "./errors/setorNotFound";
import { SetorAlreadyExistsError } from "./errors/setorAlreadyExists";

interface UpdateSetorUseCaseRequest {
    id: number;
    nome?: string | undefined;
    ativo?: boolean | undefined;
}
interface UpdateSetorUseCaseResponse {
    setor: Setor;
}
export class UpdateSetorUseCase {
    constructor(private setoresRepository: SetoresRepository) {}
    async execute({ id, nome, ativo }: UpdateSetorUseCaseRequest): Promise<UpdateSetorUseCaseResponse> {
        const existingSetor = await this.setoresRepository.findById(id);
        if (!existingSetor) {
            throw new SetorNotFoundError();
        }
        if (nome && nome !== existingSetor.nome) {
            const setorWithSameNome = await this.setoresRepository.findByNome(nome);
            if (setorWithSameNome) {
                throw new SetorAlreadyExistsError();
            }
        }
        const data: Prisma.SetorUpdateInput = {};
        if (nome !== undefined) data.nome = nome;
        if (ativo !== undefined) data.ativo = ativo;
        const setor = await this.setoresRepository.update(id, data);
        return { setor };
    }
}
