import { pokemons } from "@/msw/db/pokemons";

export type Pokemon = Partial<typeof pokemons[number]>;
