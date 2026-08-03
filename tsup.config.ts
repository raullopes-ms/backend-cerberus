import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/server.ts"],
    outDir: "build",
    /* O package.json declara "type": "module", então o bundle precisa sair em ESM
       — em CJS o Node recusaria o arquivo .js gerado. */
    format: ["esm"],
    platform: "node",
    target: "node22",
    // Remove a saída anterior para que arquivos de um build antigo não sobrevivam.
    clean: true,
    sourcemap: true,
    /* Dependências continuam sendo resolvidas de node_modules em runtime; só o
       código de src (e o client gerado do Prisma) entra no bundle. */
    skipNodeModulesBundle: true,
});
