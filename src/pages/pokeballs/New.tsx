import { PokemonPicker } from "@/components/domain/pokemon-picker";
import { ListItemButton } from "@/components/list-item-button";
import { useState } from "react";
import { SimplePokemon } from "../../types/SimplePokemon";

export default function NewPokeballPage() {
  return (
    <div>
      <h1>Add new pokéball to your collection</h1>
      <form name="new-pokeball">
        <input name="pokeball-name" placeholder="Pokeball name"></input>
        <PokemonPicker />
        <button type="submit">Create Pokéball</button>
      </form>
    </div>
  );
}
