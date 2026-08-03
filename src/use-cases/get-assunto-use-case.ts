import { AssuntosRepository, AssuntoWithSetores } from "../repositories/assuntos-repositories";
import { AssuntoNotFoundError } from "./errors/assuntoNotFound";

interface GetAssuntoUseCaseRequest {
    id: number;
}
interface GetAssuntoUseCaseResponse {
    assunto: AssuntoWithSetores;
}
export class GetAssuntoUseCase {
    constructor(private assuntosRepository: AssuntosRepository) {}
    async execute({ id }: GetAssuntoUseCaseRequest): Promise<GetAssuntoUseCaseResponse> {
        const assunto = await this.assuntosRepository.findById(id);
        if (!assunto) {
            throw new AssuntoNotFoundError();
        }
        return { assunto };
    }
}
