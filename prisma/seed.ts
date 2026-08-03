import "dotenv/config";
import { hash } from "bcryptjs";
import { prisma } from "../src/lib/prisma";
import { PrismaAdminsRepository } from "../src/repositories/prisma/prisma-admins-repositories";
/*
const setores = [
  "ADMINISTRATIVO",
  "FROTA",
  "LOGISTICA",
  "EXPEDIÇÃO",
  "PRODUÇÃO",
  "CONTABILIDADE",
  "MARKETING",
  "RH/DP",
  "DIRETORIA",
  "FINANCEIRO",
  "ALMOXARIFADO",
  "SUPRIMENTOS/COMPRAS",
  "SSMA",
  "CONTROLE DE QUALIDADE",
  "RECEPÇÃO",
  "MANUTENÇÃO",
  "JOTAPE",
  "MANUTENÇÃO PREDIAL",
  "CADASTROS",
  "CRÉDITO/COBRANÇA",
  "TRADE MARKETING",
];

async function seedSetores() {
  const result = await prisma.setor.createMany({
    data: setores.map((nome) => ({ nome })),
    skipDuplicates: true,
  });

  console.log(`${result.count} setores processados.`);
}
*/
async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const senha = process.env.ADMIN_PASSWORD;
  const nome = process.env.ADMIN_NOME ?? "Administrador";

  if (!email || !senha) {
    throw new Error(
      "Defina ADMIN_EMAIL e ADMIN_PASSWORD no .env antes de rodar o seed do administrador inicial."
    );
  }

  if (senha.length < 6) {
    throw new Error("ADMIN_PASSWORD deve ter no mínimo 6 caracteres.");
  }

  const adminsRepository = new PrismaAdminsRepository();
  const existingAdmin = await adminsRepository.findByEmail(email);

  if (existingAdmin) {
    console.log(`Admin com e-mail ${email} já existe. Nenhuma ação necessária.`);
    return;
  }

  const senhaHash = await hash(senha, 8);
  await adminsRepository.create({ nome, email, senhaHash });
  console.log(`Admin ${email} criado com sucesso.`);
}

async function main() {
  //await seedSetores();
  await seedAdmin();
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });