import PokeballsPage from "../../pages/pokeballs";
import { rest } from "msw";
import { Pokeball } from "../../types/Pokeball";
import { server } from "../../msw/server";
import { render, screen, waitFor, within } from "../test-utils";

describe("Pokeball page", function () {
  beforeEach(() => {
    const getPokeballs = rest.get(
      "http://localhost/api/pokeballs",
      async (req, res, ctx) => {
        return res(
          ctx.json([
            { name: "Pika pika", id: "1" },
            { name: "Bulba bulba", id: "2" },
            { name: "Char char", id: "3" },
          ] as Pokeball[])
        );
      }
    );

    server.use(getPokeballs);
  });

  describe("Pokeball list section", function () {
    test("It shows title and 3 existing pokeballs", async function () {
      render(<PokeballsPage />);

      expect(screen.getByRole("heading")).toBeInTheDocument();

      const pokeballs = await waitFor(() => screen.getAllByTestId("pokeball"));

      expect(pokeballs).toHaveLength(3);

      expect(pokeballs[0].textContent).toEqual("Pika pika");
      expect(pokeballs[1].textContent).toEqual("Bulba bulba");
      expect(pokeballs[2].textContent).toEqual("Char char");
    });

    test("It shows active pokeball", async function () {
      const { user } = render(<PokeballsPage />);

      expect(screen.getByRole("heading")).toBeInTheDocument();

      const pokeballs = await waitFor(() => screen.getAllByTestId("pokeball"));
      const activePokeball = pokeballs[0];
      const nextPokeball = pokeballs[1];

      expect(activePokeball).toHaveAttribute("aria-current", "true");
      expect(nextPokeball).not.toHaveAttribute("aria-current", "true");

      await user.click(within(nextPokeball).getByRole("button"));
      expect(nextPokeball).toHaveAttribute("aria-current", "true");
      expect(activePokeball).not.toHaveAttribute("aria-current", "true");
    });

    test("It shows loading state", async function () {
      render(<PokeballsPage />);
      expect(screen.queryByTestId("spinner")).toBeInTheDocument();
      expect(screen.queryAllByTestId("pokeball")).toHaveLength(0);

      await waitFor(() =>
        expect(screen.queryAllByTestId("pokeball")).toHaveLength(3)
      );
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    test("It shows error state", async function () {
      server.use(
        rest.get("http://localhost/api/pokeballs", async (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({ errorMessage: "Unknown test error" })
          );
        })
      );

      const { user } = render(<PokeballsPage />);

      await waitFor(() =>
        expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
      );
      expect(screen.getByRole("alert")).toBeInTheDocument();

      server.resetHandlers();
      server.use(
        rest.get("http://localhost/api/pokeballs", async (req, res, ctx) => {
          return res(ctx.json([{ name: "Pika pika", id: "1" }] as Pokeball[]));
        })
      );

      const retryButton = screen.getByRole("alert").querySelector("button");
      expect(retryButton).toBeInTheDocument();

      await user.click(retryButton as HTMLButtonElement);

      await waitFor(() =>
        expect(screen.queryByRole("alert")).not.toBeInTheDocument()
      );
    });
  });

  describe("Pokeball detail section", function () {
    test("It shows pokeball name input", async function () {
      render(<PokeballsPage />);
    });
  });
});
