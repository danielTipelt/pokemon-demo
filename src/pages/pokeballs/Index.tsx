import { useEffect } from "react";
import { useFetch } from "../../api/fetch";
import { ErrorBoundary } from "../../components/error/ErrorBoundary";
import { Layout } from "../../components/Layout";
import { Pokeball } from "../../types/Pokeball";

export default function PokeballsPage() {
  const {
    data: pokeballs = [],
    error,
    isValidating,
    mutate,
  } = useFetch<Pokeball[]>("/api/pokeballs");

  return (
    <Layout>
      <div className="flex">
        <h1>Choose pokéball</h1>
        <section className="flex flex-col">
          <ErrorBoundary
            error={error}
            onReset={() => {
              mutate();
            }}
          >
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
          </ErrorBoundary>
        </section>
      </div>
    </Layout>
  );
}
