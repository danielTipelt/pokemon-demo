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
    back_default?: string;
    back_female?: string;
    back_shiny?: string;
    back_shiny_female?: string;
    front_default?: string;
    front_female?: string;
    front_shiny?: string;
    front_shiny_female?: string;
  };
};
