import { useState } from "react";
import { SimplePokemon } from "src/types/SimplePokemon";
import { ListItemButton } from "../../list-item-button";
import { PokemonPickerModal } from "./Modal";

export function PokemonPicker(props: {}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);

  return (
    <section>
      <ul>
        <li title="Pick pokemon">
          <ListItemButton
            image={"➕"}
            onClick={() => {
              setModalOpen(true);
            }}
          ></ListItemButton>
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
