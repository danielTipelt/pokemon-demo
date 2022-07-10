import { DefaultBodyType, PathParams, rest } from "msw";
import { Pokemon } from "src/types/Pokemon";
import { PaginatedResource } from "../types/PaginatedResouce";
import { Pokeball } from "../types/Pokeball";
import { SimplePokemon } from "../types/SimplePokemon";
import { pokemons } from "./db/pokemons";
import { simplePokemons } from "./db/simple-pokemons";
import { Blob } from "buffer";

export const handlers = [
  rest.get("http://localhost:3000/api/pokeballs", async (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Pika pika", id: "1" },
        { name: "Bulba bulba", id: "2" },
        { name: "Char char", id: "3" },
      ] as Pokeball[])
    );
  }),
  rest.get<DefaultBodyType, PathParams, PaginatedResource<SimplePokemon>>(
    "https://pokeapi.co/api/v2/pokemon",
    async (req, res, ctx) => {
      const offset = Number(req.url.searchParams.get("offset")) ?? 0;
      const limit = Number(req.url.searchParams.get("limit")) ?? 20;

      return res(
        ctx.json({
          results: simplePokemons.slice(offset, offset + limit),
          count: simplePokemons.length,
          next: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${Math.min(
            offset + limit,
            simplePokemons.length
          )}`,
          previous: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${Math.max(
            offset - limit,
            0
          )}`,
        })
      );
    }
  ),
  rest.get<DefaultBodyType, PathParams, Pokemon>(
    "https://pokeapi.co/api/v2/pokemon/:id",
    async (req, res, ctx) => {
      const { id } = req.params;
      const pokemon = pokemons.find((pokemon) => pokemon.id === Number(id));
      return res(ctx.json(pokemon || pokemons[0]));
    }
  ),
  rest.get<DefaultBodyType, PathParams, Blob>(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/*.png",
    async (req, res, ctx) => {
      const imageBuffer = await ctx
        .fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/bulbasaur.png`)
        .then((res) => res.arrayBuffer());

      return res(
        ctx.set("Content-Length", imageBuffer.byteLength.toString()),
        ctx.set("Content-Type", "image/jpeg"),
        ctx.body(imageBuffer as any)
      );
    }
  ),
];
