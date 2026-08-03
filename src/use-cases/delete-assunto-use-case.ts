import { AssuntosRepository } from "../repositories/assuntos-repositories";
import { AssuntoNotFoundError } from "./errors/assuntoNotFound";

interface DeleteAssuntoUseCaseRequest {
    id: number;
}
export class DeleteAssuntoUseCase {
    constructor(private assuntosRepository: AssuntosRepository) {}
    async execute({ id }: DeleteAssuntoUseCaseRequest): Promise<void> {
        const existingAssunto = await this.assuntosRepository.findById(id);
        if (!existingAssunto) {
            throw new AssuntoNotFoundError();
        }
        await this.assuntosRepository.delete(id);
    }
}
