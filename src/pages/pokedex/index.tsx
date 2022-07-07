import { SpriteWithName } from "@/components/sprite-with-name/SpriteWithName";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { useFetch } from "../../api/fetch";
import { ErrorBoundary } from "../../components/error/ErrorBoundary";
import { Spinner } from "../../components/Spinner";
import { PaginatedResource } from "../../types/PaginatedResouce";
import { SimplePokemon } from "../../types/SimplePokemon";

export const limit = 5;

type PageProps = { firstPage: SimplePokemon[]; totalCount: number };

const PokedexPage: NextPage<PageProps> = (props) => {
  const [offset, setOffset] = useState(0);

  const { data, isValidating, error, mutate } = useFetch<
    PaginatedResource<SimplePokemon>
  >(
    offset > 0
      ? `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      : null
  );

  const currentPagePokemons = data?.results ?? props.firstPage;
  const totalPokemonsInPokedex = data?.count ?? props.totalCount;

  return (
    <div>
      <h1>Pokedex - get know your pokémons</h1>
      <ErrorBoundary
        error={error}
        onReset={() => {
          mutate();
        }}
      >
        {!data?.results && isValidating ? (
          <Spinner />
        ) : (
          <>
            <ul data-testid="pokemons">
              {currentPagePokemons.map((pokemon) => (
                <li key={pokemon.name} title={pokemon.name}>
                  <Link href={`/pokedex/${pokemon.name}`}>
                    <a>
                      <SpriteWithName
                        detailsUrl={pokemon.url}
                        name={pokemon.name}
                      />
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              title="Load previous page"
              type="button"
              onClick={() => {
                setOffset((offset) => Math.max(offset - limit, 0));
              }}
            >
              {"<"}
            </button>
            <button
              title="Load next page"
              type="button"
              onClick={() => {
                setOffset((offset) =>
                  Math.min(offset + limit, totalPokemonsInPokedex)
                );
              }}
            >
              {">"}
            </button>
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
  );
  if (!res.ok) {
    throw Error(
      "Fetch for the first pokemons page has failed. Last pokemons working version was served by Next.js"
    );
  }

  const data: PaginatedResource<SimplePokemon> = await res.json();

  return {
    props: { firstPage: data.results, totalCount: data.count } as PageProps,
  };
}

export default PokedexPage;