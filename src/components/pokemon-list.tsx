"use client";

import { toast } from "sonner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MiModal from "./modal-detalle";
interface Pokemon {
  name: string;
  image: string;
}

export default function PokemonList({ pokemons }: { pokemons: Pokemon[] }) {
  const handleAddFavorite = async (pokemon: Pokemon) => {
    const res = await fetch("/api/favoritos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: pokemon.name, image: pokemon.image }),
    });

    if (res.status === 201) {
      toast.success(`${pokemon.name} fue agregado a favoritos`);
    } else if (res.status === 409) {
      const data = await res.json();
      toast.warning(data.message || `${pokemon.name} ya está en tus favoritos`);
    } else {
      toast.error("No se pudo agregar a favoritos");
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          className="border rounded-lg p-4 shadow-sm text-center"
        >
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={120}
            height={120}
            className="mx-auto"
          />
          <p className="capitalize mt-2 font-semibold">{pokemon.name}</p>
          <div className="flex flex-col gap-2 mt-2">
            <Button
              
              className="w-full h-10 text-sm font-semibold bg-amber-100  text-amber-600 rounded-full hover:bg-amber-300 transition-all shadow-sm"
              onClick={() => handleAddFavorite(pokemon)}
            >
              Agregar a favoritos
            </Button>
            <MiModal pokemon={pokemon} />
          </div>
        </div>
      ))}
    </div>
  );
}
