import { useEffect, useState } from "react";
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

  const [activePokeball, setActivePokeball] = useState<Pokeball | null>(null);

  useEffect(() => {
    if (!activePokeball && pokeballs.length) {
      setActivePokeball(pokeballs[0]);
    }
  }, [activePokeball, pokeballs]);

  return (
    <Layout>
      <div className="flex gap-6 flex-column md:flex-row">
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
                  <li
                    key={pokeball.id}
                    data-testid="pokeball"
                    aria-current={pokeball === activePokeball}
                    title={pokeball.name}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setActivePokeball(pokeball);
                      }}
                    >
                      {pokeball.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </ErrorBoundary>
        </section>

        <section className="flex flex-col">
          <h2>{activePokeball?.name}</h2>
        </section>
      </div>
    </Layout>
  );
}
