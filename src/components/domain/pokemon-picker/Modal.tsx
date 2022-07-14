import { LabeledButton } from "@/components/common/LabeledButton";
import { LoadableContent } from "@/components/common/loadable-content/LoadableContent";
import { Pagination } from "@/components/common/pagination/Pagination";
import { Sprite } from "@/components/common/sprite/Sprite";
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
    <Dialog
      open={props.modalOpen}
      onClose={props.onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60">
        <Dialog.Panel className="w-full rounded bg-neutral p-4 max-w-xl">
          <Dialog.Title className={"text-2xl mb-4"}>Pick pokemons</Dialog.Title>

          <LoadableContent
            error={error}
            isLoading={!data?.results && isValidating}
            onReset={() => mutate()}
          >
            <ul className="flex flex-wrap gap-4 justify-around">
              {data?.results.map((pokemon) => (
                <li key={pokemon.name}>
                  <LabeledButton
                    active={selectedPokemons.includes(pokemon)}
                    data-testid="pokemon-tile"
                  >
                    <LabeledButton.Button
                      onClick={() => {
                        setSelectedPokemons((selectedPokemons) =>
                          toggleItemInArray(selectedPokemons, pokemon)
                        );
                      }}
                      className="bg-neutral-focus h-20 w-20"
                    >
                      <Sprite detailsUrl={pokemon.url} name={pokemon.name} />
                    </LabeledButton.Button>
                  </LabeledButton>
                </li>
              ))}
            </ul>

            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  props.onConfirm(selectedPokemons);
                }}
              >
                Confirm
              </button>

              <Pagination
                setOffset={setOffset}
                total={data?.count || 0}
                limit={10}
              >
                <Pagination.PrevButton />
                <Pagination.NextButton />
              </Pagination>
            </div>
          </LoadableContent>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
