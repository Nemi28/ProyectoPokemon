"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, Eye } from "lucide-react";
import Image from "next/image";
import { Pokemon } from "@/lib/getPokemonList";
import { usePokemonDetail } from "@/lib/getDetallePokemon";

interface Props {
  pokemon: Pokemon;
}

export default function MiModal({ pokemon }: Props) {
  const { data, loading } = usePokemonDetail(pokemon.name);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-full h-10 text-sm font-medium flex items-center justify-center gap-2 bg-green-100 text-green-700 rounded-full hover:bg-green-300 transition-all shadow-sm">
          <Eye size={16} />
          Ver detalle
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-lg p-6 z-50 -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="sr-only">Detalle del Pokemon</Dialog.Title>

          <div className="flex justify-between items-center mb-4">
            <div className="w-full text-center mt-2">
              <p className="text-lg font-semibold capitalize">{pokemon.name}</p>
            </div>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-black">
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={160}
            height={160}
            className="mx-auto mb-4"
          />

          {loading ? (
            <p className="text-center text-gray-500">Cargando...</p>
          ) : (
            data && (
              <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-md overflow-hidden">
                <tbody>
                  <tr className="border-b">
                    <th className="px-4 py-2 bg-gray-100 font-medium">
                      Altura
                    </th>
                    <td className="px-4 py-2">{data.height}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 bg-gray-100 font-medium">Peso</th>
                    <td className="px-4 py-2">{data.weight}</td>
                  </tr>
                  <tr className="border-b">
                    <th className="px-4 py-2 bg-gray-100 font-medium">Tipos</th>
                    <td className="px-4 py-2">
                      {data.types.map((t) => t.type.name).join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 bg-gray-100 font-medium">
                      Habilidades
                    </th>
                    <td className="px-4 py-2">
                      {data.abilities.map((a) => a.ability.name).join(", ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            )
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
