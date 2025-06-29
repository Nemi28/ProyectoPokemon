import { NextResponse } from "next/server";

const mockCreate = jest.fn();
const mockFindFirst = jest.fn();

jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn(() => ({
      pokemonFavorito: {
        create: mockCreate,
        findFirst: mockFindFirst,
      },
    })),
  };
});
import { POST } from "@/app/api/favoritos/route";
describe("POST /api/favoritos", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("✅ should create a favorite and return 201", async () => {
    mockFindFirst.mockResolvedValue(null); // No existe previamente
    mockCreate.mockResolvedValue({
      id: 1,
      nombre: "pikachu",
      imagenUrl: "https://example.com/pikachu.png",
      createdAt: new Date(),
    });

    const mockReq = {
      json: async () => ({
        name: "pikachu",
        image: "https://example.com/pikachu.png",
      }),
    } as Request;

    const res = await POST(mockReq);
    const json = await (res as NextResponse).json();

    expect((res as NextResponse).status).toBe(201);
    expect(json.nombre).toBe("pikachu");
    expect(json.imagenUrl).toBe("https://example.com/pikachu.png");
  });

  it("⚠ should return 400 if name or image is missing", async () => {
    const mockReq = {
      json: async () => ({ name: "" }), // Falta imagen
    } as Request;

    const res = await POST(mockReq);
    const json = await (res as NextResponse).json();

    expect((res as NextResponse).status).toBe(400);
    expect(json.error).toBe("Faltan datos");
  });

  it("🚫 should return 409 if Pokémon is already a favorite", async () => {
    mockFindFirst.mockResolvedValue({
      id: 1,
      nombre: "pikachu",
      imagenUrl: "https://example.com/pikachu.png",
      createdAt: new Date(),
    });

    const mockReq = {
      json: async () => ({
        name: "pikachu",
        image: "https://example.com/pikachu.png",
      }),
    } as Request;

    const res = await POST(mockReq);
    const json = await (res as NextResponse).json();

    expect((res as NextResponse).status).toBe(409);
    expect(json.message).toBe("pikachu ya está en tus favoritos");
  });
});
