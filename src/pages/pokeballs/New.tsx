import { useState } from "react";
import { Pokemon } from "../../types/Pokemon";

export default function NewPokeballPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  return (
    <div>
      <h1>Add new pokéball to your collection</h1>
      <form name="new-pokeball">
        <input name="pokeball-name" placeholder="Pokéball name"></input>
        <ul>
          <li data-testid="add-pokemon">Add new Pokémon</li>
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>{pokemon.name}</li>
          ))}
        </ul>
        <button type="submit">Create Pokéball</button>
      </form>
    </div>
  );
}
