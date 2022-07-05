import PokeballsPage from "../../pages/pokeballs";
import { rest } from "msw";
import { Pokeball } from "../../types/Pokeball";
import { server } from "../../msw/server";
import { render, screen, waitFor, within } from "../test-utils";

const usedPokeballs: Pokeball[] = [
  {
    name: "Pika pika",
    id: "1",
    content: [
      { id: "1", name: "pikachu" },
      { id: "2", name: "rajcu" },
    ],
  },
  {
    name: "Bulba bulba",
    id: "2",
    content: [
      { id: "1", name: "pikachu" },
      { id: "2", name: "rajcu" },
    ],
  },
  {
    name: "Char char",
    id: "3",
    content: [
      { id: "1", name: "pikachu" },
      { id: "2", name: "rajcu" },
    ],
  },
];

describe("Pokeball page", function () {
  beforeEach(() => {
    const getPokeballs = rest.get(
      "http://localhost/api/pokeballs",
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

      const pokeballs = await waitFor(() => screen.getAllByTestId("pokeball"));

      expect(pokeballs).toHaveLength(3);

      expect(pokeballs[0].title).toEqual("Pika pika");
      expect(pokeballs[1].title).toEqual("Bulba bulba");
      expect(pokeballs[2].title).toEqual("Char char");
    });

    test("It shows active pokeball", async function () {
      const { user } = render(<PokeballsPage />);

      const [activePokeball, nextPokeball] = await waitFor(() =>
        screen.getAllByTestId("pokeball")
      );

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
          return res(ctx.json(usedPokeballs));
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
    test("It shows active pokeball details", async function () {
      render(<PokeballsPage />);

      const pokeballs = await waitFor(() => screen.getAllByTestId("pokeball"));
      const activePokeballElement = pokeballs.find(
        (pokeball) => pokeball.getAttribute("aria-current") === "true"
      );
      const activePokeball = usedPokeballs.find(
        (pokeball) => pokeball.name === activePokeballElement?.title
      );

      expect(screen.getByRole("heading", { level: 2 }).textContent).toEqual(
        activePokeballElement?.title
      );

      const pokemonsInPokeball = screen.getAllByTestId("pokeball-pokemon");
      expect(pokemonsInPokeball).toHaveLength(2);
      expect(pokemonsInPokeball[0]).toHaveAttribute(
        "title",
        activePokeball?.content[0].name
      );
      expect(within(pokemonsInPokeball[0]).getByRole("link")).toHaveAttribute(
        "href",
        `/pokemons/${activePokeball?.content[0].id}`
      );
    });
  });
});
