import { useCallback, useRef, useState } from "react";
import { SimplePokemon } from "src/types/SimplePokemon";
import { PokemonPickerModal } from "./Modal";
import { Sprite } from "@/components/sprite";
import { toggleItemInArray } from "src/utils/toggleItemInArray";
import { LabeledButton } from "@/components/LabeledButton";
import { PlusIcon } from "@/components/Icon";
import Image from "next/image";

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
      <ul
        data-testid="selected-pokemons"
        className="border border-white/10 rounded-lg p-4"
      >
        <li title="Pick pokemon">
          <LabeledButton>
            <LabeledButton.Label>Add</LabeledButton.Label>
            <LabeledButton.Button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <PlusIcon />
            </LabeledButton.Button>
          </LabeledButton>
        </li>
        {(pokemons.length ? pokemons : initialPokemons).map((pokemon) => (
          <li key={pokemon.name}>
            <LabeledButton data-testid="pokeball-pokemon">
              <LabeledButton.Button
                onClick={() => {
                  handlePokemonsChange(toggleItemInArray(pokemons, pokemon));
                }}
              >
                <Sprite detailsUrl={pokemon.url} name={pokemon.name} />
              </LabeledButton.Button>
            </LabeledButton>
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
