import { render, screen, waitFor, within } from "../../test-utils";
import PokedexPage, { limit } from "../../../pages/pokedex";
import { simplePokemons } from "../../../msw/db/simple-pokemons";

describe("Pokedex page", function () {
  test("It shows title and initial list of pokemons", function () {
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

  test("It leads to detail page", function () {
    render(
      <PokedexPage
        firstPage={simplePokemons.slice(0, limit)}
        totalCount={simplePokemons.length}
      />
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
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
    );
    await waitFor(() =>
      expect(screen.getByTestId("pokemons").childNodes.item(0)).toHaveAttribute(
        "title",
        simplePokemons[limit].name
      )
    );

    await user.click(screen.getByTitle("Load previous page"));
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument(); // using cached data, so no asynchronicity
    expect(screen.getByTestId("pokemons").childNodes.item(0)).toHaveAttribute(
      "title",
      simplePokemons[0].name
    );
  });
});