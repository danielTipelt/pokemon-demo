import { PlusIcon } from "@/components/common/Icon";
import { LabeledButton } from "@/components/common/LabeledButton";
import { Sprite } from "@/components/common/sprite/Sprite";
import Link from "next/link";
import Router from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { firstLetterCased } from "src/utils/firstLetterCased";
import { useFetch } from "src/api/fetch";
import { ErrorBoundary } from "@/components/common/error/ErrorBoundary";
import { Layout } from "@/components/common/Layout";
import { Pokeball } from "@/types/Pokeball";

export default function PokeballsPage() {
  const {
    data: pokeballs = [],
    error,
    isValidating,
    mutate,
  } = useFetch<Pokeball[]>(
    `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/pokeballs`
  );

  const [activePokeball, setActivePokeball] = useState<Pokeball | null>(null);

  useEffect(() => {
    if (!activePokeball && pokeballs.length) {
      setActivePokeball(pokeballs[0]);
    }
  }, [activePokeball, pokeballs]);

  return (
    <Layout>
      <div className="sm:container mx-4 sm:mx-auto flex gap-6 flex-col">
        <h1 className="text-5xl font-bold mt-8">Choose pokéball</h1>
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <Section>
            <ErrorBoundary
              error={error}
              onReset={() => {
                mutate();
              }}
            >
              <ul
                className="flex flex-row flex-wrap gap-4"
                data-testid="pokeballs"
              >
                <li>
                  <LabeledButton data-testid="new-pokeball-button">
                    <LabeledButton.Label>Create</LabeledButton.Label>
                    <LabeledButton.Button
                      shape="btn-circle"
                      title="Create new pokeball"
                      onClick={() => {
                        Router.push("/pokeballs/new");
                      }}
                    >
                      <PlusIcon />
                    </LabeledButton.Button>
                  </LabeledButton>
                </li>
                {!pokeballs.length && isValidating ? (
                  <li>
                    <span data-testid="spinner">...loading</span>
                  </li>
                ) : (
                  pokeballs.map((pokeball) => {
                    return (
                      <li key={pokeball.id}>
                        <LabeledButton
                          active={pokeball === activePokeball}
                          data-testid={`pokeball-button`}
                        >
                          <LabeledButton.Label>
                            {pokeball.name}
                          </LabeledButton.Label>
                          <LabeledButton.Button
                            shape="btn-circle"
                            onClick={() => {
                              setActivePokeball(pokeball);
                            }}
                            title={pokeball.name}
                          >
                            {!!pokeball.pokemons[0]?.url && (
                              <Sprite
                                detailsUrl={pokeball.pokemons[0].url}
                                name={pokeball.pokemons[0].name}
                              />
                            )}
                          </LabeledButton.Button>
                        </LabeledButton>
                      </li>
                    );
                  })
                )}
              </ul>
            </ErrorBoundary>
          </Section>

          <Section>
            <span className="text-xs text-start">Pokéball</span>
            <h2 className="text-4xl mb-4 mt-2">{activePokeball?.name}</h2>
            <ul className="flex flex-col gap-2">
              {activePokeball?.pokemons?.map((pokemon) => (
                <li
                  key={pokemon.name}
                  data-testid="pokeball-pokemon"
                  title={pokemon.name}
                >
                  <Link href={`/pokedex/${pokemon.name}`}>
                    <a>
                      <LabeledButton direction="row">
                        <LabeledButton.Button>
                          <Sprite
                            detailsUrl={pokemon.url}
                            name={pokemon.name}
                          />
                        </LabeledButton.Button>
                        <span className="text-xl font-bold">
                          {firstLetterCased(pokemon.name)}
                        </span>
                      </LabeledButton>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </Layout>
  );
}

const Section = (props: { children: ReactNode }) => (
  <section className="flex flex-col flex-1 rounded bg-gray-200 dark:bg-gray-700 p-4">
    {props.children}
  </section>
);
