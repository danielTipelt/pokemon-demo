import { useState } from "react";
import { SimplePokemon } from "../../types/SimplePokemon";

export default function NewPokeballPage() {
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);

  return (
    <div>
      <h1>Add new pokéball to your collection</h1>
      <form name="new-pokeball">
        <input name="pokeball-name" placeholder="Pokeball name"></input>
        <ul>
          <li data-testid="add-pokemon">Add new Pokémon</li>
          {pokemons.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
        <button type="submit">Create Pokéball</button>
      </form>
    </div>
  );
}
