import { AssuntosRepository, AssuntoWithSetores } from "../repositories/assuntos-repositories";
import { SetoresRepository } from "../repositories/setores-repositories";
import { AssuntoAlreadyExistsError } from "./errors/assuntoAlreadyExists";
import { SetorNotFoundError } from "./errors/setorNotFound";

interface CreateAssuntoUseCaseRequest {
    nome: string;
    setorIds: number[];
}
interface CreateAssuntoUseCaseResponse {
    assunto: AssuntoWithSetores;
}
export class CreateAssuntoUseCase {
    constructor(
        private assuntosRepository: AssuntosRepository,
        private setoresRepository: SetoresRepository,
    ) {}
    async execute({ nome, setorIds }: CreateAssuntoUseCaseRequest): Promise<CreateAssuntoUseCaseResponse> {
        const assuntoAlreadyExists = await this.assuntosRepository.findByNome(nome);
        if (assuntoAlreadyExists) {
            throw new AssuntoAlreadyExistsError();
        }
        for (const setorId of setorIds) {
            const setor = await this.setoresRepository.findById(setorId);
            if (!setor) {
                throw new SetorNotFoundError();
            }
        }
        const assunto = await this.assuntosRepository.create({ nome }, setorIds);
        return { assunto };
    }
}
