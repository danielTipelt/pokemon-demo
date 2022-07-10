import { render, screen, waitFor } from "@/tests/test-utils";
import { SpriteWithName } from "../sprite-with-name/SpriteWithName";

describe("Sprite with name", function () {
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
