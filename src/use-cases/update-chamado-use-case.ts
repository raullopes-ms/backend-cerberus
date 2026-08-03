import { ChamadosRepository, ChamadoWithRelations } from "../repositories/chamados-repositories";
import { Prisma, StatusChamado } from "../../generated/prisma/client";
import { ChamadoNotFoundError } from "./errors/chamadoNotFound";

interface UpdateChamadoUseCaseRequest {
    id: number;
    titulo?: string | undefined;
    descricao?: string | undefined;
    assuntoId?: number | undefined;
    setorDestinoId?: number | undefined;
    /**
     * `undefined` mantém o atendente atual; `null` remove o vínculo — necessário
     * na transferência de setor, em que o atendimento volta à estaca zero.
     */
    atendidoPorId?: number | null | undefined;
    status?: StatusChamado | undefined;
}
interface UpdateChamadoUseCaseResponse {
    chamado: ChamadoWithRelations;
}
export class UpdateChamadoUseCase {
    constructor(private chamadosRepository: ChamadosRepository) {}
    async execute({
        id,
        titulo,
        descricao,
        assuntoId,
        setorDestinoId,
        atendidoPorId,
        status,
    }: UpdateChamadoUseCaseRequest): Promise<UpdateChamadoUseCaseResponse> {
        const existingChamado = await this.chamadosRepository.findById(id);
        if (!existingChamado) {
            throw new ChamadoNotFoundError();
        }
        const data: Prisma.ChamadoUpdateInput = {};
        if (titulo !== undefined) data.titulo = titulo;
        if (descricao !== undefined) data.descricao = descricao;
        if (assuntoId !== undefined) data.assunto = { connect: { id: assuntoId } };
        if (setorDestinoId !== undefined) data.setorDestino = { connect: { id: setorDestinoId } };
        if (atendidoPorId !== undefined) {
            data.atendidoPor = atendidoPorId === null
                ? { disconnect: true }
                : { connect: { id: atendidoPorId } };
        }
        if (status !== undefined) data.status = status;
        const chamado = await this.chamadosRepository.update(id, data);
        return { chamado };
    }
}
