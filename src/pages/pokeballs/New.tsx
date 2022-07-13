import { PokemonPicker } from "@/components/domain/pokemon-picker";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { Pokeball } from "@/types/Pokeball";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm, Controller, FieldError } from "react-hook-form";
import classnames from "classnames";
import { ValidationError } from "@/components/validation-error";

export type Data = Omit<Pokeball, "id">;

export default function NewPokeballPage() {
  const lastData = useRef<Data>();
  const [error, setError] = useState<Error>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors: validationErrors },
  } = useForm<Data>();

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
      <form
        name="new-pokeball"
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-4 items-start"
      >
        <div className="form-control">
          <label className="label flex flex-col items-start">
            <span className="label-text text-lg mb-2">Pokéball name</span>
            <input
              placeholder="Name"
              {...register("name", {
                validate: (val) => (val ? undefined : "Name your pokeball"),
              })}
              className={classnames(
                "input input-bordered w-full max-w-xs placeholder:italic",
                {
                  "input-error": validationErrors?.name?.message,
                }
              )}
            />
          </label>
          <ValidationError error={validationErrors?.name} />
        </div>
        <Controller
          control={control}
          rules={{
            validate: (val) => (val ? undefined : "Pick at least one pokemon"),
          }}
          name="pokemons"
          render={({ field }) => (
            <div className="form-control">
              <span className="label-text text-lg mb-2">
                Pokémons in pokeball
              </span>
              <PokemonPicker
                onChange={(pokemons) => {
                  field.onChange(pokemons);
                }}
              />
              <ValidationError
                error={validationErrors?.pokemons as FieldError}
              />
            </div>
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
