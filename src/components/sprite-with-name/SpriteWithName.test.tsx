import {
  findAllByRole,
  render,
  screen,
  waitFor,
  within,
} from "@/tests/test-utils";
import { rest } from "msw";
import { server } from "../../msw/server";
import { simplePokemons } from "../../msw/db/simple-pokemons";
import { PaginatedResource } from "../../types/PaginatedResouce";
import { SimplePokemon } from "../../types/SimplePokemon";
import { SpriteWithName } from "./SpriteWithName";

describe("Pokedex page", function () {
  test("It shows title and initial list of pokemons", async function () {
    render(
      <SpriteWithName
        detailsUrl="https://pokeapi.co/api/v2/pokemon/101/"
        name={"electrode"}
      />
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByTitle("Image is being loaded")).toBeInTheDocument();
    expect(screen.getByText("Electrode")).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByRole("img")).toBeInTheDocument());
  });
});
