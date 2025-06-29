"use client";

import { getPokemonList } from "@/lib/getPokemonList";
import PokemonList from "@/components/pokemon-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Pokemon } from "@/lib/getPokemonList";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const MAX_PAGE = 15;

  useEffect(() => {
    setLoading(true);
    getPokemonList(page).then((data) => {
      setPokemons(data);
      setLoading(false);
    });
  }, [page]);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">POKEMONES</h1>
        <Link href="/favorite">
          <Button className="bg-yellow-400 text-black hover:bg-yellow-500 shadow-md transition-all rounded-xl px-5 py-2 flex items-center gap-2 text-sm font-semibold">
            <Star size={16} className="text-black" />
            Ver favoritos
          </Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Cargando Pokemones...</p>
      ) : (
        <>
          <PokemonList pokemons={pokemons} />
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>
            <span className="self-center text-gray-600">
              Página {page} de {MAX_PAGE}
            </span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              disabled={page === MAX_PAGE}
            >
              Siguiente
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
