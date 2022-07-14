import { render, screen, waitFor } from "@/tests/test-utils";
import { Sprite } from "./Sprite";

describe("Sprite", function () {
  test("It shows loader and image afterwards", async function () {
    render(
      <Sprite
        detailsUrl="https://pokeapi.co/api/v2/pokemon/101/"
        name={"electrode"}
      />
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(screen.getByTitle("Image is being loaded")).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByRole("img")).toBeInTheDocument());
  });
});
