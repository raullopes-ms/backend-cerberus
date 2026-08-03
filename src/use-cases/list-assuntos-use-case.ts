import { AssuntosRepository, AssuntoWithSetores } from "../repositories/assuntos-repositories";

interface ListAssuntosUseCaseResponse {
    assuntos: AssuntoWithSetores[];
}
export class ListAssuntosUseCase {
    constructor(private assuntosRepository: AssuntosRepository) {}
    async execute(): Promise<ListAssuntosUseCaseResponse> {
        const assuntos = await this.assuntosRepository.findMany();
        return { assuntos };
    }
}
