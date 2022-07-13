import { LabeledButton } from "@/components/LabeledButton";
import { LoadableContent } from "@/components/loadable-content";
import { Pagination } from "@/components/pagination";
import { Sprite } from "@/components/sprite";
import { SpriteWithName } from "@/components/sprite-with-name/SpriteWithName";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { usePokemons } from "src/hooks/usePokemons";
import { PaginatedResource } from "../../types/PaginatedResouce";
import { SimplePokemon } from "../../types/SimplePokemon";

export const limit = 10;

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
    <div className="sm:container mx-4 sm:mx-auto mt-4">
      <h1 className="text-2xl mb-6">
        <span className="text-5xl dark:text-white">Pokedex</span>
        <br />
        <span>get know your pokémons</span>
      </h1>
      <LoadableContent
        isLoading={!data?.results && isValidating}
        onReset={() => mutate()}
        error={error}
      >
        <>
          <ul data-testid="pokemons" className="grid grid-auto-columns">
            {data?.results.map((pokemon) => (
              <li key={pokemon.name} title={pokemon.name}>
                <Link href={`/pokedex/${pokemon.name}`}>
                  <a>
                    <LabeledButton className="flex flex-row items-center gap-4">
                      <LabeledButton.Button className="w-20 h-20">
                        <Sprite detailsUrl={pokemon.url} name={pokemon.name} />
                      </LabeledButton.Button>
                      <LabeledButton.Label className="max-w-none">
                        {pokemon.name}
                      </LabeledButton.Label>
                    </LabeledButton>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination
            limit={limit}
            total={data?.count || 0}
            setOffset={setOffset}
            className={"align-self-end"}
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
