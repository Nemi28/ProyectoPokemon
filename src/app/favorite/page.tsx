import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FavoriteList from "@/components/favorite-list";
import { redirect } from "next/navigation";


const prisma = new PrismaClient();

interface Props {
  searchParams: { page?: string };
}

export default async function FavoritePage({ searchParams }: Props) {
  // ✅ Redirigir si no hay página
  if (!searchParams.page) {
    redirect("/favorite?page=1");
  }

  const page = Number(searchParams.page);
  const LIMIT = 10;
  const offset = (page - 1) * LIMIT;
  const totalFavoritos = await prisma.pokemonFavorito.count();
  const totalPages = Math.ceil(totalFavoritos / LIMIT);
  if (page > totalPages && totalFavoritos > 0) {
    redirect(`/favorite?page=${totalPages}`);
  }
  const favoritos = await prisma.pokemonFavorito.findMany({
    orderBy: { createdAt: "desc" },
    take: LIMIT,
    skip: offset,
  });

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Mis Pokemones Favoritos
        </h1>
        <Link href="/">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-sm font-medium rounded-xl border-gray-300 shadow-sm hover:bg-gray-100 transition-all"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Button>
        </Link>
      </div>

      {favoritos.length === 0 ? (
        <p className="text-gray-600">No hay favoritos aún.</p>
      ) : (
        <>
          <FavoriteList favoritos={favoritos} />
          

          <div className="flex justify-center gap-4 mt-6">
            <Button disabled={page <= 1} asChild variant="secondary">
              <Link href={`/favorite?page=${page - 1}`}>Anterior</Link>
            </Button>

            <span className="self-center text-gray-600">
              Página {page} de {totalPages}
            </span>

            <Button disabled={page >= totalPages} asChild variant="secondary">
              <Link href={`/favorite?page=${page + 1}`}>Siguiente</Link>
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
