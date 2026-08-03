-- CreateTable
CREATE TABLE "assuntos_setores" (
    "id" SERIAL NOT NULL,
    "assuntoId" INTEGER NOT NULL,
    "setorId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assuntos_setores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "assuntos_setores_assuntoId_setorId_key" ON "assuntos_setores"("assuntoId", "setorId");

-- AddForeignKey
ALTER TABLE "assuntos_setores" ADD CONSTRAINT "assuntos_setores_assuntoId_fkey" FOREIGN KEY ("assuntoId") REFERENCES "assuntos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assuntos_setores" ADD CONSTRAINT "assuntos_setores_setorId_fkey" FOREIGN KEY ("setorId") REFERENCES "setores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
