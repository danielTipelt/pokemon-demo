import { Icon, PlusIcon } from "@/components/Icon";
import Link from "next/link";
import Router from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { useFetch } from "../../api/fetch";
import { ErrorBoundary } from "../../components/error/ErrorBoundary";
import { Layout } from "../../components/Layout";
import { ListTile } from "../../components/list-tile";
import { Pokeball } from "../../types/Pokeball";

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
      <div className="sm:container mx-auto flex gap-6 flex-col">
        <h1 className="text-5xl font-bold mt-8">Choose pokéball</h1>
        <div className="flex flex-col sm:flex-row gap-6">
          <Section>
            <ErrorBoundary
              error={error}
              onReset={() => {
                mutate();
              }}
            >
              <ul>
                <li data-testid="create-pokeball" title="Create new pokeball">
                  <ListTile
                    className="text-white dark:text-black"
                    image={<PlusIcon />}
                  >
                    <ListTile.Button
                      onClick={() => {
                        Router.push("/pokeballs/new");
                      }}
                    />
                  </ListTile>
                </li>
                {!pokeballs.length && isValidating ? (
                  <li>
                    <span data-testid="spinner">...loading</span>
                  </li>
                ) : (
                  pokeballs.map((pokeball) => (
                    <li key={pokeball.id} title={pokeball.name}>
                      <ListTile
                        className="text-white dark:text-black"
                        image={<PlusIcon />}
                        aria-current={pokeball === activePokeball}
                        data-testid="pokeball"
                      >
                        <ListTile.Button
                          onClick={() => {
                            setActivePokeball(pokeball);
                          }}
                        />
                      </ListTile>
                    </li>
                  ))
                )}
              </ul>
            </ErrorBoundary>
          </Section>

          <Section>
            <h2>{activePokeball?.name}</h2>
            <ul>
              {activePokeball?.pokemons?.map((pokemon) => (
                <li
                  key={pokemon.name}
                  data-testid="pokeball-pokemon"
                  title={pokemon.name}
                >
                  <Link href={`/pokemons/${pokemon.name}`}>{pokemon.name}</Link>
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
