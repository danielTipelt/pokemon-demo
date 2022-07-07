import { Ability } from "./Ability";
import { GameIndice } from "./GameIndices";
import { SimplePokemon } from "./SimplePokemon";

export type Pokemon = {
  abilities: Ability[];
  base_experience: number;
  forms: SimplePokemon[];
  game_indices: GameIndice[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  species: SimplePokemon;
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      [key: string]: unknown;
    };
  };
};
