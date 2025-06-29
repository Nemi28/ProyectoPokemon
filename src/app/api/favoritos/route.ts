import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image } = body;
    const normalizedName = name.toLowerCase();
    if (!name || !image) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const existente = await prisma.pokemonFavorito.findFirst({
      where: { nombre: normalizedName },
    });

    console.log("🎯 ¿Existe ya?", existente);

    if (existente) {
      return NextResponse.json(
        { message: `${name} ya está en tus favoritos` },
        { status: 409 }
      );
    } else {
      const favorito = await prisma.pokemonFavorito.create({
        data: {
          nombre: normalizedName,
          imagenUrl: image,
        },
      });

      return NextResponse.json(favorito, { status: 201 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Error al guardar favorito:", error.message);
    } else {
      console.error("❌ Error al guardar favorito:", error);
    }

    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
