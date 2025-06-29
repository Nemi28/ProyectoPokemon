-- CreateTable
CREATE TABLE "PokemonFavorito" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "imagenUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PokemonFavorito_pkey" PRIMARY KEY ("id")
);
