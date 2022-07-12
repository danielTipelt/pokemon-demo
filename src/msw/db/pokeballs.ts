import { Pokeball } from "@/types/Pokeball";
import { simplePokemons } from "./simple-pokemons";

export const pokeballs: Pokeball[] = [
  {
    id: "1",
    name: "Bulba",
    pokemons: [simplePokemons[0], simplePokemons[1], simplePokemons[2]],
  },
  {
    id: "1",
    name: "Pika",
    pokemons: [simplePokemons[3], simplePokemons[4], simplePokemons[5]],
  },
];
