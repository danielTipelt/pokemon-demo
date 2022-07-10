import { LoadableContent } from "@/components/loadable-content";
import { Pagination } from "@/components/pagination";
import { SpriteWithName } from "@/components/sprite-with-name/SpriteWithName";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { usePokemons } from "src/hooks/usePokemons";
import { PaginatedResource } from "../../types/PaginatedResouce";
import { SimplePokemon } from "../../types/SimplePokemon";

export const limit = 5;

type PageProps = { firstPage: SimplePokemon[]; totalCount: number };

const PokedexPage: NextPage<PageProps> = (props) => {
  const [offset, setOffset] = useState(0);

  const { data, error, isValidating, mutate } = usePokemons({
    offset,
    limit,
    fallbackData: { results: props.firstPage, count: props.totalCount },
    revalidateOnMount: false,
  });

  return (
    <div>
      <h1>Pokedex - get know your pokémons</h1>
      <LoadableContent
        isLoading={!data?.results && isValidating}
        onReset={() => mutate()}
        error={error}
      >
        <>
          <ul data-testid="pokemons">
            {data?.results.map((pokemon) => (
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
          <Pagination
            limit={limit}
            total={data?.count || 0}
            setOffset={setOffset}
          >
            <Pagination.PrevButton />
            <Pagination.NextButton />
          </Pagination>
        </>
      </LoadableContent>
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
