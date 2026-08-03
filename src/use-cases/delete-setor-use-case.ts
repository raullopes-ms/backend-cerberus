import { SetoresRepository } from "../repositories/setores-repositories";
import { SetorNotFoundError } from "./errors/setorNotFound";

interface DeleteSetorUseCaseRequest {
    id: number;
}
export class DeleteSetorUseCase {
    constructor(private setoresRepository: SetoresRepository) {}
    async execute({ id }: DeleteSetorUseCaseRequest): Promise<void> {
        const existingSetor = await this.setoresRepository.findById(id);
        if (!existingSetor) {
            throw new SetorNotFoundError();
        }
        await this.setoresRepository.delete(id);
    }
}
