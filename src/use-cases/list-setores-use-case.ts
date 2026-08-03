import { SetoresRepository } from "../repositories/setores-repositories";
import { Setor } from "../../generated/prisma/client";

interface ListSetoresUseCaseResponse {
    setores: Setor[];
}
export class ListSetoresUseCase {
    constructor(private setoresRepository: SetoresRepository) {}
    async execute(): Promise<ListSetoresUseCaseResponse> {
        const setores = await this.setoresRepository.findMany();
        return { setores };
    }
}
