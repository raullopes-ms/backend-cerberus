import { SetoresRepository } from "../repositories/setores-repositories";
import { Setor } from "../../generated/prisma/client";
import { SetorNotFoundError } from "./errors/setorNotFound";

interface GetSetorUseCaseRequest {
    id: number;
}
interface GetSetorUseCaseResponse {
    setor: Setor;
}
export class GetSetorUseCase {
    constructor(private setoresRepository: SetoresRepository) {}
    async execute({ id }: GetSetorUseCaseRequest): Promise<GetSetorUseCaseResponse> {
        const setor = await this.setoresRepository.findById(id);
        if (!setor) {
            throw new SetorNotFoundError();
        }
        return { setor };
    }
}
