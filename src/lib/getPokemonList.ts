export interface Pokemon {
  name: string;
  image: string;
}

interface PokeAPIListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

interface PokeAPIDetailResponse {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}

export async function getPokemonList(page: number): Promise<Pokemon[]> {
  const limit = 10;
  const offset = (page - 1) * limit;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data: PokeAPIListResponse = await res.json();

  const results: Pokemon[] = await Promise.all(
    data.results.map(async (pokemon): Promise<Pokemon> => {
      const detailRes = await fetch(pokemon.url);
      const detail: PokeAPIDetailResponse = await detailRes.json();

      return {
        name: pokemon.name,
        image: detail.sprites.other["official-artwork"].front_default,
      };
    })
  );

  return results;
}
