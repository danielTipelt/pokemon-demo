import { render, screen, waitFor, within } from "../test-utils";
import PokedexPage from "../../pages/pokedex";
import { rest } from "msw";
import { server } from "../../msw/server";
import { pokemons } from "../../msw/db/pokemons";
import { PaginatedResource } from "../../types/PaginatedResouce";
import { Pokemon } from "../../types/Pokemon";

describe("Pokedex page", function () {
  test("It shows title and initial list of pokemons", function () {
    render(
      <PokedexPage
        firstPage={pokemons.slice(0, 20)}
        totalCount={pokemons.length}
      />
    );
    expect(screen.getByRole("heading")).toBeInTheDocument();

    expect(screen.getByTestId("pokemons")).toBeInTheDocument();
    expect(screen.getByTestId("pokemons").childNodes.item(0)).toHaveAttribute(
      "title",
      pokemons[0].name
    );
  });

  test("Pagination works", async function () {
    const { user } = render(
      <PokedexPage
        firstPage={pokemons.slice(0, 20)}
        totalCount={pokemons.length}
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
        pokemons[20].name
      )
    );

    await user.click(screen.getByTitle("Load previous page"));
    expect(screen.queryByTestId("spinner")).not.toBeInTheDocument(); // using cached data, so no asynchronicity
    expect(screen.getByTestId("pokemons").childNodes.item(0)).toHaveAttribute(
      "title",
      pokemons[0].name
    );
  });
});
