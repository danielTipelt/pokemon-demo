import { useCallback, useRef, useState } from "react";
import { SimplePokemon } from "src/types/SimplePokemon";
import { PokemonPickerModal } from "./Modal";
import { Sprite } from "@/components/common/sprite/Sprite";
import { toggleItemInArray } from "src/utils/toggleItemInArray";
import { LabeledButton } from "@/components/common/LabeledButton";
import { MinusIcon, PlusIcon } from "@/components/common/Icon";

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
        className="border border-white/10 rounded-lg p-4 flex flex-wrap gap-4"
      >
        <li title="Pick pokemon">
          <LabeledButton direction="row">
            <LabeledButton.Button
              onClick={() => {
                setModalOpen(true);
              }}
            >
              <PlusIcon />
            </LabeledButton.Button>
            <LabeledButton.Label>Add</LabeledButton.Label>
          </LabeledButton>
        </li>
        {(pokemons.length ? pokemons : initialPokemons).map((pokemon) => (
          <li key={pokemon.name}>
            <LabeledButton data-testid="pokeball-pokemon" direction="row">
              <LabeledButton.Button
                onClick={() => {
                  handlePokemonsChange(toggleItemInArray(pokemons, pokemon));
                }}
                className="relative"
              >
                <Sprite detailsUrl={pokemon.url} name={pokemon.name} />
                <LabeledButton.ShowOnHover>
                  <div className="text-[24px] absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <MinusIcon />
                  </div>
                </LabeledButton.ShowOnHover>
              </LabeledButton.Button>
              <LabeledButton.Label autohide>{pokemon.name}</LabeledButton.Label>
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
