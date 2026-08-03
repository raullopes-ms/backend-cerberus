import { FastifyInstance } from "fastify";
import { health } from "../controllers/health-controller";
import { register } from "../controllers/register-controller";
import { authenticate } from "../controllers/authenticate-controller";
import { authenticateAdmin } from "../controllers/authenticate-admin-controller";
import { verifyJwt } from "../controllers/middlewares/verify-jwt";
import { verifyAdmin } from "../controllers/middlewares/verify-admin";
import { createSetor } from "../controllers/create-setor-controller";
import { listSetores } from "../controllers/list-setores-controller";
import { getSetor } from "../controllers/get-setor-controller";
import { updateSetor } from "../controllers/update-setor-controller";
import { deleteSetor } from "../controllers/delete-setor-controller";
import { createCargo } from "../controllers/create-cargo-controller";
import { listCargos } from "../controllers/list-cargos-controller";
import { getCargo } from "../controllers/get-cargo-controller";
import { updateCargo } from "../controllers/update-cargo-controller";
import { deleteCargo } from "../controllers/delete-cargo-controller";
import { createChamado } from "../controllers/create-chamado-controller";
import { listChamados } from "../controllers/list-chamados-controller";
import { getChamado } from "../controllers/get-chamado-controller";
import { updateChamado } from "../controllers/update-chamado-controller";
import { deleteChamado } from "../controllers/delete-chamado-controller";
import { createHistorico } from "../controllers/create-historico-controller";
import { listHistoricos } from "../controllers/list-historicos-controller";
import { getHistorico } from "../controllers/get-historico-controller";
import { updateHistorico } from "../controllers/update-historico-controller";
import { deleteHistorico } from "../controllers/delete-historico-controller";
import { createAssunto } from "../controllers/create-assunto-controller";
import { listAssuntos } from "../controllers/list-assuntos-controller";
import { getAssunto } from "../controllers/get-assunto-controller";
import { updateAssunto } from "../controllers/update-assunto-controller";
import { deleteAssunto } from "../controllers/delete-assunto-controller";
import { me } from "../controllers/me-controller";
import { adminMe } from "../controllers/admin-me-controller";
import { listUsers } from "../controllers/list-users-controller";
import { getUser } from "../controllers/get-user-controller";
import { updateUser } from "../controllers/update-user-controller";



export async function appRoutes(app: FastifyInstance) {

    /* Health check */
    app.get("/health", { config: { rateLimit: false } }, health);

    /* Rotas de administrador */
    app.post("/panel/admin/authenticate", {
        config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
    }, authenticateAdmin);
    app.post("/panel/admin/register", { onRequest: [verifyJwt, verifyAdmin] }, register);

    /* Perfil do administrador autenticado. O `/me` de usuário recusa token de
       admin, então o painel precisa da sua própria rota. */
    app.get("/panel/admin/me", { onRequest: [verifyJwt, verifyAdmin] }, adminMe);

    /* Rotas de administrador - Usuários.
       Não há exclusão: `usuarios` é referenciado por `chamados` e `historicos`,
       então desligar um acesso é mudar `status` para INATIVO. */
    app.post("/panel/admin/usuarios", { onRequest: [verifyJwt, verifyAdmin] }, register);
    app.get("/panel/admin/usuarios", { onRequest: [verifyJwt, verifyAdmin] }, listUsers);
    app.get("/panel/admin/usuarios/:id", { onRequest: [verifyJwt, verifyAdmin] }, getUser);
    app.put("/panel/admin/usuarios/:id", { onRequest: [verifyJwt, verifyAdmin] }, updateUser);

    /* Rotas de administrador - Setores */
    app.post("/panel/admin/setores", { onRequest: [verifyJwt, verifyAdmin] }, createSetor);
    app.get("/panel/admin/setores", { onRequest: [verifyJwt, verifyAdmin] }, listSetores);
    app.get("/panel/admin/setores/:id", { onRequest: [verifyJwt, verifyAdmin] }, getSetor);
    app.put("/panel/admin/setores/:id", { onRequest: [verifyJwt, verifyAdmin] }, updateSetor);
    app.delete("/panel/admin/setores/:id", { onRequest: [verifyJwt, verifyAdmin] }, deleteSetor);

    /* Rotas de administrador - Cargos */
    app.post("/panel/admin/cargos", { onRequest: [verifyJwt, verifyAdmin] }, createCargo);
    app.get("/panel/admin/cargos", { onRequest: [verifyJwt, verifyAdmin] }, listCargos);
    app.get("/panel/admin/cargos/:id", { onRequest: [verifyJwt, verifyAdmin] }, getCargo);
    app.put("/panel/admin/cargos/:id", { onRequest: [verifyJwt, verifyAdmin] }, updateCargo);
    app.delete("/panel/admin/cargos/:id", { onRequest: [verifyJwt, verifyAdmin] }, deleteCargo);

    /* Rotas de administrador - Assuntos */
    app.post("/panel/admin/assuntos", { onRequest: [verifyJwt, verifyAdmin] }, createAssunto);
    app.get("/panel/admin/assuntos", { onRequest: [verifyJwt, verifyAdmin] }, listAssuntos);
    app.get("/panel/admin/assuntos/:id", { onRequest: [verifyJwt, verifyAdmin] }, getAssunto);
    app.put("/panel/admin/assuntos/:id", { onRequest: [verifyJwt, verifyAdmin] }, updateAssunto);
    app.delete("/panel/admin/assuntos/:id", { onRequest: [verifyJwt, verifyAdmin] }, deleteAssunto);

    /* Rotas de usuário - Chamados */
    app.post("/authenticate", {
        config: { rateLimit: { max: 5, timeWindow: "1 minute" } },
    }, authenticate);

    /* Perfil do usuário autenticado — o token só carrega ids, então o front-end
       busca aqui nome, e-mail, cargo e setor de quem está logado. */
    app.get("/me", { onRequest: [verifyJwt] }, me);

    /* Rotas de usuário - Setores e Assuntos (para seleção de setor de destino e assunto ao abrir chamado) */
    app.get("/panel/setores", { onRequest: [verifyJwt] }, listSetores);
    app.get("/panel/assuntos", { onRequest: [verifyJwt] }, listAssuntos);

    app.post("/panel/chamados", { onRequest: [verifyJwt] }, createChamado);
    app.get("/panel/chamados", { onRequest: [verifyJwt] }, listChamados);
    app.get("/panel/chamados/:id", { onRequest: [verifyJwt] }, getChamado);
    app.put("/panel/chamados/:id", { onRequest: [verifyJwt] }, updateChamado);
    app.delete("/panel/chamados/:id", { onRequest: [verifyJwt] }, deleteChamado);

    /* Rotas de usuário - Histórico */
    app.post("/panel/historicos", { onRequest: [verifyJwt] }, createHistorico);
    app.get("/panel/historicos", { onRequest: [verifyJwt] }, listHistoricos);
    app.get("/panel/historicos/:id", { onRequest: [verifyJwt] }, getHistorico);
    app.put("/panel/historicos/:id", { onRequest: [verifyJwt] }, updateHistorico);
    app.delete("/panel/historicos/:id", { onRequest: [verifyJwt] }, deleteHistorico);
}