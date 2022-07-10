import { useState } from "react";
import { SimplePokemon } from "src/types/SimplePokemon";
import { ListTile, ListTileButton } from "@/components/list-tile";
import { PokemonPickerModal } from "./Modal";

export function PokemonPicker(props: {}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);

  return (
    <section>
      <ul>
        <li title="Pick pokemon">
          <ListTile image={"➕"}>
            <ListTile.Button
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </ListTile>
        </li>
        {pokemons.map((pokemon) => (
          <li key={pokemon.name}></li>
        ))}
      </ul>
      <PokemonPickerModal
        alreadySelectedPokemons={[]}
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => {}}
      />
    </section>
  );
}
