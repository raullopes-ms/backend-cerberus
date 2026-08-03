import { AssuntosRepository, AssuntoWithSetores } from "../repositories/assuntos-repositories";
import { SetoresRepository } from "../repositories/setores-repositories";
import { Prisma } from "../../generated/prisma/client";
import { AssuntoNotFoundError } from "./errors/assuntoNotFound";
import { AssuntoAlreadyExistsError } from "./errors/assuntoAlreadyExists";
import { SetorNotFoundError } from "./errors/setorNotFound";

interface UpdateAssuntoUseCaseRequest {
    id: number;
    nome?: string | undefined;
    ativo?: boolean | undefined;
    setorIds?: number[] | undefined;
}
interface UpdateAssuntoUseCaseResponse {
    assunto: AssuntoWithSetores;
}
export class UpdateAssuntoUseCase {
    constructor(
        private assuntosRepository: AssuntosRepository,
        private setoresRepository: SetoresRepository,
    ) {}
    async execute({ id, nome, ativo, setorIds }: UpdateAssuntoUseCaseRequest): Promise<UpdateAssuntoUseCaseResponse> {
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
        if (setorIds !== undefined) {
            for (const setorId of setorIds) {
                const setor = await this.setoresRepository.findById(setorId);
                if (!setor) {
                    throw new SetorNotFoundError();
                }
            }
        }
        const data: Prisma.AssuntoUpdateInput = {};
        if (nome !== undefined) data.nome = nome;
        if (ativo !== undefined) data.ativo = ativo;
        const assunto = await this.assuntosRepository.update(id, data, setorIds);
        return { assunto };
    }
}
