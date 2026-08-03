import { ChamadosRepository, ChamadoWithRelations } from "../repositories/chamados-repositories";

interface CreateChamadoUseCaseRequest {
    titulo: string;
    descricao: string;
    assuntoId: number;
    setorOrigemId: number;
    setorDestinoId: number;
    criadoPorId: number;
}
interface CreateChamadoUseCaseResponse {
    chamado: ChamadoWithRelations;
}
export class CreateChamadoUseCase {
    constructor(private chamadosRepository: ChamadosRepository) {}
    async execute({
        titulo,
        descricao,
        assuntoId,
        setorOrigemId,
        setorDestinoId,
        criadoPorId,
    }: CreateChamadoUseCaseRequest): Promise<CreateChamadoUseCaseResponse> {
        const chamado = await this.chamadosRepository.create({
            titulo,
            descricao,
            assunto: { connect: { id: assuntoId } },
            setorOrigem: { connect: { id: setorOrigemId } },
            setorDestino: { connect: { id: setorDestinoId } },
            criadoPor: { connect: { id: criadoPorId } },
        });
        return { chamado };
    }
}
