import { render, screen, within } from "@/tests/test-utils";
import NewPokeballPage from "@/pages/pokeballs/new";

describe("Pokeball page", function () {
  describe("Pokeball list section", function () {
    test("It shows title and input fields", async function () {
      render(<NewPokeballPage />);

      expect(screen.getByRole("heading")).toBeInTheDocument();

      const form = screen.getByRole("form");
      expect(
        within(form).getByPlaceholderText("Pokeball name")
      ).toBeInTheDocument();
      expect(within(form).getByTestId("add-pokemon")).toBeInTheDocument();
      expect(form.querySelector('button[type="submit"]')).toBeInTheDocument();
    });
  });
});
