import { PokemonPicker } from "@/components/domain/pokemon-picker";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Pokeball } from "@/types/Pokeball";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

export type Data = Omit<Pokeball, "id">;

export default function NewPokeballPage() {
  const lastData = useRef<Data>();
  const [error, setError] = useState<Error>();
  const { register, handleSubmit, control } = useForm<Data>();

  const Router = useRouter();

  const submit = async (data: Data) => {
    lastData.current = data;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/pokeballs`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      Router.push("/pokeballs");
    } catch (err) {
      setError(err as Error);
    }
  };

  return (
    <div className="sm:container mx-4 sm:mx-auto mt-6">
      <h1 className="text-4xl font-bold mb-4">
        Add new pokéball to your collection
      </h1>
      <form name="new-pokeball" onSubmit={handleSubmit(submit)}>
        <input
          placeholder="Pokeball name"
          {...register("name")}
          className="form-control"
        ></input>
        <Controller
          control={control}
          rules={{ required: true }}
          name="pokemons"
          render={({ field }) => (
            <PokemonPicker
              onChange={(pokemons) => {
                field.onChange(pokemons);
              }}
            />
          )}
        />
        <ErrorBoundary
          onReset={() => (lastData.current ? submit(lastData.current) : null)}
          error={error}
        >
          <button className="btn btn-primary" type="submit">
            Create Pokéball
          </button>
        </ErrorBoundary>
      </form>
    </div>
  );
}
