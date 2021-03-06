import { render, screen, within, waitFor, fireEvent } from "@/tests/test-utils";
import NewPokeballPage, { Data } from "@/pages/pokeballs/new";
import mockRouter from "next-router-mock";
import { server } from "@/msw/server";
import pokeballs from "@/pages/pokeballs";
import { Pokeball } from "@/types/Pokeball";
import { rest, PathParams } from "msw";

describe("New Pokeball page", function () {
  test("It shows title and input fields", async function () {
    render(<NewPokeballPage />);

    expect(screen.getByRole("heading")).toBeInTheDocument();

    const form = screen.getByRole("form");
    expect(within(form).getByPlaceholderText("Name")).toBeInTheDocument();
    expect(within(form).getByTitle("Pick pokemon")).toBeInTheDocument();
    expect(form.querySelector('button[type="submit"]')).toBeInTheDocument();
  });

  test("It can pick pokemons", async function () {
    const { user } = render(<NewPokeballPage />);

    expect(screen.getByRole("heading")).toBeInTheDocument();

    const form = screen.getByRole("form");

    await user.click(within(form).getByPlaceholderText("Name"));
    await user.keyboard("Pikachues");
    expect(within(form).getByPlaceholderText("Name")).toHaveValue("Pikachues");

    await user.click(
      within(screen.getByTitle("Pick pokemon")).getByRole("button")
    );
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
    let dialog = screen.getByRole("dialog");

    await waitFor(() =>
      expect(
        within(dialog).getAllByTestId("pokemon-tile")[0]
      ).toBeInTheDocument()
    );

    let pokemonTiles = within(dialog).getAllByTestId("pokemon-tile");
    await user.click(within(pokemonTiles[0]).getByRole("button"));
    await user.click(within(pokemonTiles[1]).getByRole("button"));

    expect(within(pokemonTiles[0]).getByRole("button")).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(within(pokemonTiles[1]).getByRole("button")).toHaveAttribute(
      "aria-pressed",
      "true"
    );

    await user.click(within(dialog).getByText("Confirm"));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );

    expect(screen.getAllByTestId("pokeball-pokemon")).toHaveLength(2);
    expect(
      within(screen.getByTestId("selected-pokemons")).getByTitle("electrode")
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId("selected-pokemons")).getByTitle("exeggcute")
    ).toBeInTheDocument();
  });

  test("It validates form", async function () {
    const { user } = render(<NewPokeballPage />);

    const form = screen.getByRole("form");

    const serverCall = jest.fn();

    server.use(
      rest.post<string, PathParams, {}>(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/pokeballs`,
        async (req, res, ctx) => {
          serverCall();
          return res(ctx.status(400), ctx.json({ message: "Bad request" }));
        }
      )
    );

    // submit
    await user.click(screen.getByText("Create Pok??ball"));

    await waitFor(() =>
      expect(
        screen.getByRole("alert", {
          name: (x, element) => {
            return element.textContent === "Name your pokeball";
          },
        })
      ).toBeInTheDocument()
    );

    // fill name
    await user.click(within(form).getByPlaceholderText("Name"));
    await user.keyboard("Pikachues");
    expect(within(form).getByPlaceholderText("Name")).toHaveValue("Pikachues");

    //submit
    await user.click(screen.getByText("Create Pok??ball"));

    await waitFor(() =>
      expect(
        screen.getByRole("alert", {
          name: (x, element) => {
            return element.textContent === "Pick at least one pokemon";
          },
        })
      ).toBeInTheDocument()
    );

    // clear name
    await user.dblClick(within(form).getByPlaceholderText("Name"));
    await user.cut();
    expect(within(form).getByPlaceholderText("Name")).toHaveValue("");

    // submit
    await user.click(screen.getByText("Create Pok??ball"));

    // pick pokemon
    await user.click(
      within(screen.getByTitle("Pick pokemon")).getByRole("button")
    );
    let dialog = screen.getByRole("dialog");
    await waitFor(() =>
      expect(
        within(dialog).getAllByTestId("pokemon-tile")[0]
      ).toBeInTheDocument()
    );

    let dialogPokemons = within(dialog).getAllByTestId("pokemon-tile");
    await user.click(within(dialogPokemons[0]).getByRole("button"));
    await user.click(within(dialogPokemons[1]).getByRole("button"));

    await user.click(within(dialog).getByText("Confirm"));

    // submit
    await user.click(screen.getByText("Create Pok??ball"));

    expect(serverCall).not.toBeCalled();
  });

  test("It can submit the form", async function () {
    const { user } = render(<NewPokeballPage />);

    expect(screen.getByRole("heading")).toBeInTheDocument();

    const form = screen.getByRole("form");

    await user.click(within(form).getByPlaceholderText("Name"));
    await user.keyboard("Pikachues");
    expect(within(form).getByPlaceholderText("Name")).toHaveValue("Pikachues");

    await user.click(
      within(screen.getByTitle("Pick pokemon")).getByRole("button")
    );

    let dialog = screen.getByRole("dialog");

    await waitFor(() =>
      expect(
        within(dialog).getAllByTestId("pokemon-tile")[0]
      ).toBeInTheDocument()
    );

    let dialogPokemons = within(dialog).getAllByTestId("pokemon-tile");
    await user.click(within(dialogPokemons[0]).getByRole("button"));
    await user.click(within(dialogPokemons[1]).getByRole("button"));

    await user.click(within(dialog).getByText("Confirm"));

    server.use(
      rest.post<string, PathParams, Pokeball>(
        `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/pokeballs`,
        async (req, res, ctx) => {
          const { pokemons, name } = JSON.parse(req.body) as Data;
          const pokeball = {
            pokemons,
            name,
            id: String(pokeballs.length + 1),
          };

          expect(pokemons.map((x) => x.name)).toEqual([
            "electrode",
            "exeggcute",
          ]);
          expect(name).toBe("Pikachues");

          return res(ctx.status(201), ctx.json(pokeball));
        }
      )
    );

    await user.click(screen.getByText("Create Pok??ball"));

    await waitFor(() => expect(mockRouter.asPath).toEqual("/pokeballs"));
    expect.assertions(7);
  });
});
