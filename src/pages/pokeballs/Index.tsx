import { useFetch } from "../../api/fetch";
import { Pokeball } from "../../types/Pokeball";

export default function PokeballsPage() {
  const {
    data: pokeballs = [],
    error,
    isValidating,
  } = useFetch<Pokeball[]>("/api/pokeballs");

  return (
    <>
      <div className="flex">
        <h1>Choose pokéball</h1>
        <section className="flex flex-col">
          {!pokeballs.length && isValidating ? (
            <span data-testid="spinner">...loading</span>
          ) : (
            <ul>
              {pokeballs.map((pokeball) => (
                <li key={pokeball.id} data-testid="pokeball">
                  {pokeball.name}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
