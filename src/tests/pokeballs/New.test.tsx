import PokeballsPage from "../../pages/pokeballs";
import { rest } from "msw";
import { Pokeball } from "../../types/Pokeball";
import { server } from "../../msw/server";
import { render, screen, waitFor, within } from "../test-utils";
import NewPokeballPage from "../../pages/pokeballs/New";

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
