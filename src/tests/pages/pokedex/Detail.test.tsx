import { render, screen, within } from "@/tests/test-utils";
import PokedexDetailPage from "@/pages/pokedex/[id]";
import { pokemons } from "@/msw/db/pokemons";

describe("Pokedex detail page", function () {
  test("It shows name, forms, sprites", function () {
    render(<PokedexDetailPage pokemon={pokemons[0]} />);
    expect(screen.getByRole("heading")).toHaveTextContent("Bulbasaur");
    expect(screen.getByTestId("forms")).toHaveTextContent("bulbasaur");
    expect(
      within(screen.getByTestId("sprites")).getByTitle("Front view")
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("sprites")).getByTitle("Back view")
    ).toBeInTheDocument();
  });
});
