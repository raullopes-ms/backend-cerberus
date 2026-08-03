import { AssuntoWithSetores } from "../../repositories/assuntos-repositories";

export function toAssuntoResponse(assunto: AssuntoWithSetores) {
    return {
        id: assunto.id,
        nome: assunto.nome,
        ativo: assunto.ativo,
        createdAt: assunto.createdAt,
        setores: assunto.setores.map((vinculo) => ({ id: vinculo.setor.id, nome: vinculo.setor.nome })),
    };
}
