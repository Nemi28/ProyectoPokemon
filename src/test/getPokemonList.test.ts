import { getPokemonList } from "../lib/getPokemonList";

global.fetch = jest.fn();

describe("getPokemonList", () => {
  it("should return a list of Pokémon with name and image", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                name: "bulbasaur",
                url: "https://pokeapi.co/api/v2/pokemon/1/",
              },
            ],
          }),
      })
    );
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            sprites: {
              other: {
                "official-artwork": {
                  front_default: "https://example.com/bulbasaur.png",
                },
              },
            },
          }),
      })
    );

    const result = await getPokemonList(1);

    expect(result).toEqual([
      {
        name: "bulbasaur",
        image: "https://example.com/bulbasaur.png",
      },
    ]);
  });
});
