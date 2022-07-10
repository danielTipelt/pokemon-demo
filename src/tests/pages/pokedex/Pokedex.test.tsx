import { render, screen, waitFor, within } from "../../test-utils";
import PokedexPage, { limit } from "../../../pages/pokedex";
import { simplePokemons } from "../../../msw/db/simple-pokemons";

describe("Pokedex page", function () {
  test("It shows title and initial list of pokemons", async function () {
    render(
      <PokedexPage
        firstPage={simplePokemons.slice(0, limit)}
        totalCount={simplePokemons.length}
      />
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();

    expect(screen.getByTestId("pokemons")).toBeInTheDocument();
    expect(screen.getByTestId("pokemons").childNodes.item(0)).toHaveAttribute(
      "title",
      simplePokemons[0].name
    );
  });

  test("It leads to detail page", async function () {
    render(
      <PokedexPage
        firstPage={simplePokemons.slice(0, limit)}
        totalCount={simplePokemons.length}
      />
    );

    await waitFor(() =>
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument()
    );

    expect(
      within(screen.getByTestId("pokemons")).getAllByRole("link")[0]
    ).toHaveAttribute("href", `/pokedex/${simplePokemons[0].name}`);
  });

  test("Pagination works", async function () {
    const { user } = render(
      <PokedexPage
        firstPage={simplePokemons.slice(0, limit)}
        totalCount={simplePokemons.length}
      />
    );

    expect(screen.getByTitle("Load previous page")).toBeInTheDocument();
    expect(screen.getByTitle("Load next page")).toBeInTheDocument();

    await user.click(screen.getByTitle("Load next page"));

    await waitFor(() =>
      expect(screen.getByTestId("pokemons").childNodes.item(0)).toHaveAttribute(
        "title",
        simplePokemons[limit].name
      )
    );

    await user.click(screen.getByTitle("Load previous page"));
    expect(screen.getByTestId("pokemons").childNodes.item(0)).toHaveAttribute(
      "title",
      simplePokemons[0].name
    );
  });
});
