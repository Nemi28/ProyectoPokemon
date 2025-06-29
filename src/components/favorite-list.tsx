"use client";

import Image from "next/image";
interface Favorite {
  id: number;
  nombre: string;
  imagenUrl: string;
}

export default function FavoriteList({ favoritos }: { favoritos: Favorite[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {favoritos.map((pokemon) => (
        <div
          key={pokemon.id}
          className="border p-3 rounded-lg text-center shadow-sm"
        >
          <Image
            src={pokemon.imagenUrl}
            alt={pokemon.nombre}
            width={96}
            height={96}
            className="mx-auto"
          />
          <p className="capitalize mt-2 font-semibold">{pokemon.nombre}</p>
        </div>
      ))}
    </div>
  );
}
