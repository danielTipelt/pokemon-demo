import { useFetch } from "src/api/fetch";
import { Pokemon } from "src/types/Pokemon";

const staleOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

/** Pokeapi doesn't send anything else than the name and url for pokemon details
 * ⚠️ Uses stale data by default - (doesn't do SWR revalidation)
 */
export function usePokemonData(
  url: string,
  options: { stale: boolean } = { stale: true }
) {
  const { data, isValidating, error } = useFetch<Pokemon>(
    url,
    options.stale ? staleOptions : undefined
  );

  return {
    data,
    isInitialLoading: !data && isValidating,
    error,
  };
}
