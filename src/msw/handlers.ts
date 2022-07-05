import { rest } from "msw";
import { Pokeball } from "../types/Pokeball";

export const handlers = [
  rest.get("http://localhost:3000/api/pokeballs", async (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Pika pika", id: "1" },
        { name: "Bulba bulba", id: "2" },
        { name: "Char char", id: "3" },
      ] as Pokeball[])
    );
  }),
  // rest.get("http://localhost:3000/api/pokeballs", async (req, res, ctx) => {
  //   return res(
  //     ctx.status(400),
  //     ctx.json({ errorMessage: "Unknown test error" })
  //   );
  // }),
];
