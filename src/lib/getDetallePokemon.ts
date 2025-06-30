import { useEffect, useState } from "react";

export interface PokemonDetail {
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export const usePokemonDetail = (name: string) => {
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [name]);

  return { data, loading };
};
