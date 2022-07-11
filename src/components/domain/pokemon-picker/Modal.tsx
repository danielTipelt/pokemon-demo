import { ListTile } from "@/components/list-tile";
import { LoadableContent } from "@/components/loadable-content";
import { Pagination } from "@/components/pagination";
import { Sprite } from "@/components/sprite";
import { SimplePokemon } from "@/types/SimplePokemon";
import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { usePokemons } from "src/hooks/usePokemons";
import { toggleItemInArray } from "src/utils/toggleItemInArray";

export function PokemonPickerModal(props: {
  modalOpen: boolean;
  onClose: () => void;
  onConfirm: (pokemons: SimplePokemon[]) => void;
  alreadySelectedPokemons: SimplePokemon[];
}) {
  const [offset, setOffset] = useState(0);
  const [selectedPokemons, setSelectedPokemons] = useState(
    props.alreadySelectedPokemons || []
  );

  const { data, error, isValidating, mutate } = usePokemons({
    limit: 10,
    offset,
  });

  return (
    <Dialog open={props.modalOpen} onClose={props.onClose}>
      <h1>Pick pokemons</h1>
      <LoadableContent
        error={error}
        isLoading={!data?.results && isValidating}
        onReset={() => mutate()}
      >
        <ul>
          {data?.results.map((pokemon) => (
            <li key={pokemon.name} data-testid="pokemon-tile">
              <ListTile
                image={<Sprite detailsUrl={pokemon.url} name={pokemon.name} />}
                selected={selectedPokemons.includes(pokemon)}
              >
                <ListTile.Button
                  onClick={() => {
                    setSelectedPokemons((selectedPokemons) =>
                      toggleItemInArray(selectedPokemons, pokemon)
                    );
                  }}
                />
              </ListTile>
            </li>
          ))}
        </ul>
        <Pagination setOffset={setOffset} total={data?.count || 0} limit={10}>
          <Pagination.PrevButton />
          <Pagination.NextButton />
        </Pagination>
      </LoadableContent>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          props.onConfirm(selectedPokemons);
        }}
      >
        Confirm
      </button>
    </Dialog>
  );
}
