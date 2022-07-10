import { render, screen, within, waitFor } from "@/tests/test-utils";
import NewPokeballPage from "@/pages/pokeballs/new";

describe("New Pokeball page", function () {
  test("It shows title and input fields", async function () {
    render(<NewPokeballPage />);

    expect(screen.getByRole("heading")).toBeInTheDocument();

    const form = screen.getByRole("form");
    expect(
      within(form).getByPlaceholderText("Pokeball name")
    ).toBeInTheDocument();
    expect(within(form).getByTitle("Pick pokemon")).toBeInTheDocument();
    expect(form.querySelector('button[type="submit"]')).toBeInTheDocument();
  });

  test("It submits data", async function () {
    const { user } = render(<NewPokeballPage />);

    expect(screen.getByRole("heading")).toBeInTheDocument();

    const form = screen.getByRole("form");

    await user.click(within(form).getByPlaceholderText("Pokeball name"));
    await user.keyboard("Pikachues");
    expect(within(form).getByPlaceholderText("Pokeball name")).toHaveValue(
      "Pikachues"
    );

    await user.click(
      within(screen.getByTitle("Pick pokemon")).getByRole("button")
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    await waitFor(() =>
      expect(screen.getAllByTestId("pokemon-tile")[0]).toBeInTheDocument()
    );
  });
});
