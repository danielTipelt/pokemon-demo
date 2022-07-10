import { PaginatedResource } from "@/types/PaginatedResouce";
import { SimplePokemon } from "@/types/SimplePokemon";
import { useFetch } from "src/api/fetch";

export function usePokemons({
  limit = 20,
  offset,
  fallbackData,
  revalidateOnMount = true,
}: {
  limit?: number;
  offset?: number;
  fallbackData?: Pick<PaginatedResource<SimplePokemon>, "count" | "results">;
  revalidateOnMount?: boolean;
}) {
  const { data, isValidating, error, mutate } = useFetch<
    PaginatedResource<SimplePokemon>
  >(
    offset != null
      ? `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      : null,
    { fallbackData: fallbackData, revalidateOnMount: revalidateOnMount }
  );

  return { data, isValidating, error, mutate };
}
