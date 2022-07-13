import PokeballsPage from "../../../pages/pokeballs";
import { rest } from "msw";
import { Pokeball } from "../../../types/Pokeball";
import { server } from "../../../msw/server";
import { render, screen, waitFor, within, fireEvent } from "../../test-utils";
import mockRouter from "next-router-mock";
import { simplePokemons } from "@/msw/db/simple-pokemons";

const usedPokeballs: Pokeball[] = [
  {
    name: "Pika pika",
    id: "1",
    pokemons: [simplePokemons[0], simplePokemons[1]],
  },
  {
    name: "Bulba bulba",
    id: "2",
    pokemons: [simplePokemons[2], simplePokemons[3]],
  },
  {
    name: "Char char",
    id: "3",
    pokemons: [simplePokemons[4], simplePokemons[5]],
  },
];

describe("Pokeball page", function () {
  beforeEach(() => {
    const getPokeballs = rest.get(
      `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/pokeballs`,
      async (req, res, ctx) => {
        return res(ctx.json(usedPokeballs));
      }
    );

    server.use(getPokeballs);
  });

  describe("Pokeball list section", function () {
    test("It shows title and 3 existing pokeballs", async function () {
      render(<PokeballsPage />);

      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

      await waitFor(() =>
        expect(
          within(screen.getByTestId("pokeballs")).getAllByRole("button")
        ).toHaveLength(4)
      );

      const pokeballs = within(screen.getByTestId("pokeballs")).getAllByRole(
        "button"
      );

      expect(pokeballs[0].title).toEqual("Create new pokeball");
      expect(pokeballs[1].title).toEqual("Pika pika");
      expect(pokeballs[2].title).toEqual("Bulba bulba");
      expect(pokeballs[3].title).toEqual("Char char");
    });

    test("It shows active pokeball", async function () {
      const { user } = render(<PokeballsPage />);

      await waitFor(() =>
        expect(
          within(screen.getByTestId("pokeballs")).getAllByRole("button")
        ).toHaveLength(4)
      );

      const [_, activePokeball, nextPokeball] = within(
        screen.getByTestId("pokeballs")
      ).getAllByRole("button");

      await waitFor(() =>
        expect(activePokeball).toHaveAttribute("aria-pressed", "true")
      );
      expect(nextPokeball).not.toHaveAttribute("aria-pressed", "true");

      await user.click(nextPokeball);
      expect(nextPokeball).toHaveAttribute("aria-pressed", "true");
      expect(activePokeball).not.toHaveAttribute("aria-pressed", "true");
    });

    test("It shows new pokeball button", async function () {
      const { user } = render(<PokeballsPage />);

      const createPokeballItem = screen.getByTestId("new-pokeball-button");
      expect(createPokeballItem).toBeInTheDocument();
      await user.click(within(createPokeballItem).getByRole("button"));

      expect(mockRouter.asPath).toEqual("/pokeballs/new");
    });

    test("It shows loading state", async function () {
      render(<PokeballsPage />);
      expect(screen.queryByTestId("spinner")).toBeInTheDocument();
      expect(screen.queryAllByTestId("pokeball-button")).toHaveLength(0);

      await waitFor(() =>
        expect(screen.queryAllByTestId("pokeball-button")).toHaveLength(3)
      );
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    test("It shows error state", async function () {
      server.use(
        rest.get(
          `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/pokeballs`,
          async (req, res, ctx) => {
            return res(
              ctx.status(400),
              ctx.json({ errorMessage: "Unknown test error" })
            );
          }
        )
      );

      const { user } = render(<PokeballsPage />);

      await waitFor(() =>
        expect(screen.queryByTestId("spinner")).not.toBeInTheDocument()
      );
      expect(screen.getByRole("alert")).toBeInTheDocument();

      server.resetHandlers();
      server.use(
        rest.get(
          `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/pokeballs`,
          async (req, res, ctx) => {
            return res(ctx.json(usedPokeballs));
          }
        )
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
    test("It shows active pokeball details", async function () {
      render(<PokeballsPage />);

      await waitFor(() =>
        expect(
          within(screen.getByTestId("pokeballs")).getByRole("button", {
            pressed: true,
          })
        ).toBeInTheDocument()
      );

      const activePokeball = within(screen.getByTestId("pokeballs")).getByRole(
        "button",
        {
          pressed: true,
        }
      );

      expect(activePokeball).toHaveAttribute("title", "Pika pika");

      expect(screen.getByRole("heading", { level: 2 }).textContent).toEqual(
        "Pika pika"
      );

      const pokemonsInPokeball = screen.getAllByTestId("pokeball-pokemon");
      expect(pokemonsInPokeball).toHaveLength(2);
      expect(pokemonsInPokeball[0]).toHaveAttribute("title", "electrode");
      expect(within(pokemonsInPokeball[0]).getByRole("link")).toHaveAttribute(
        "href",
        `/pokedex/electrode`
      );
    });
  });
});
