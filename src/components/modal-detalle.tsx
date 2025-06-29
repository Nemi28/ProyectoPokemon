"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { Pokemon } from "@/lib/getPokemonList";
import { Eye } from "lucide-react";

interface Props {
  pokemon: Pokemon;
}

export default function MiModal({ pokemon }: Props) {
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
          <p className="text-sm text-center text-gray-600">
            Este es el Pokemon <strong>{pokemon.name}</strong>.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
