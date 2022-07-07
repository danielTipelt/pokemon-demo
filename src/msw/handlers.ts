import { Console } from "console";
import { DefaultBodyType, PathParams, rest } from "msw";
import { PaginatedResource } from "../types/PaginatedResouce";
import { Pokeball } from "../types/Pokeball";
import { Pokemon } from "../types/Pokemon";
import { pokemons } from "./db/pokemons";

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
  rest.get<DefaultBodyType, PathParams, PaginatedResource<Pokemon>>(
    "https://pokeapi.co/api/v2/pokemon",
    async (req, res, ctx) => {
      const offset = Number(req.url.searchParams.get("offset")) ?? 0;
      const limit = Number(req.url.searchParams.get("limit")) ?? 20;

      return res(
        ctx.json({
          results: pokemons.slice(offset, offset + limit),
          count: pokemons.length,
          next: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${Math.min(
            offset + limit,
            pokemons.length
          )}`,
          previous: `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${Math.max(
            offset - limit,
            0
          )}`,
        })
      );
    }
  ),
];
