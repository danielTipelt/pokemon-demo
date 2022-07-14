import { ErrorComponent } from "@/components/common/error/Error";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { Pokemon } from "src/types/Pokemon";
import { firstLetterCased } from "src/utils/firstLetterCased";

type PageProps =
  | { pokemon: Pokemon; error?: never }
  | { error: Error; pokemon?: Pokemon };

const PokedexDetailPage: NextPage<PageProps> = (props) => {
  if (props.error) {
    return <ErrorComponent error={props.error} />;
  }

  return (
    <div>
      <h1>{firstLetterCased(props.pokemon.name || "")}</h1>

      <span>Forms</span>
      <ul data-testid="forms">
        {props.pokemon.forms?.map((form) => (
          <li key={form.name}>{form.name}</li>
        ))}
      </ul>

      <span>Sprites</span>
      <ul data-testid="sprites">
        <li>
          <Image
            width={200}
            height={200}
            src={props.pokemon.sprites?.front_default || ""}
            alt={`${props.pokemon.name}'s front preview`}
            title="Front view"
          />
        </li>
        <li>
          <Image
            width={200}
            height={200}
            src={props.pokemon.sprites?.back_default || ""}
            alt={`${props.pokemon.name}'s back preview`}
            title="Back view"
          />
        </li>
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  PageProps,
  { name: string }
> = async (context) => {
  const { name } = context.params || {};

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!res.ok) {
      console.error(res.body);
      throw Error(
        "Fetch for the first pokemons page has failed. Last pokemons working version was served by Next.js"
      );
    }

    const data: Pokemon = await res.json();

    return {
      props: { pokemon: data } as PageProps,
    };
  } catch (err) {
    // overcome: Reason: `object` ("[object Error]") cannot be serialized as JSON. Please only return JSON serializable data types.
    const error = JSON.parse(JSON.stringify(err));

    return {
      props: { error } as PageProps,
    };
  }
};

export default PokedexDetailPage;
