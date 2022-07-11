import { useCallback, useEffect, useRef, useState } from "react";
import { SimplePokemon } from "src/types/SimplePokemon";
import { ListTile } from "@/components/list-tile";
import { PokemonPickerModal } from "./Modal";
import { Sprite } from "@/components/sprite";
import { toggleItemInArray } from "src/utils/toggleItemInArray";

export function PokemonPicker(props: {
  onChange: (pokemons: SimplePokemon[]) => void;
  initialPokemons?: SimplePokemon[];
}) {
  const { onChange } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);
  const { current: initialPokemons = [] } = useRef(props.initialPokemons);

  const handlePokemonsChange = useCallback(
    (pokemons: SimplePokemon[]) => {
      setPokemons(pokemons);
      onChange(pokemons);
    },
    [onChange]
  );

  return (
    <section>
      <ul data-testid="selected-pokemons">
        <li title="Pick pokemon">
          <ListTile image={"➕"}>
            <ListTile.Button
              onClick={() => {
                setModalOpen(true);
              }}
            />
          </ListTile>
        </li>
        {(pokemons.length ? pokemons : initialPokemons).map((pokemon) => (
          <li key={pokemon.name} data-testid="pokeball-pokemon">
            <ListTile
              image={<Sprite detailsUrl={pokemon.url} name={pokemon.name} />}
            >
              <ListTile.Controls
                onDelete={() => {
                  handlePokemonsChange(toggleItemInArray(pokemons, pokemon));
                }}
              />
            </ListTile>
          </li>
        ))}
      </ul>
      <PokemonPickerModal
        alreadySelectedPokemons={pokemons}
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={(pokemons) => {
          handlePokemonsChange(pokemons);
          setModalOpen(false);
        }}
      />
    </section>
  );
}
