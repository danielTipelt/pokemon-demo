import { rest } from "msw";
import { Pokeball } from "../types/Pokeball";

export const handlers = [
  // rest.get("http://localhost/api/pokeballs", async (req, res, ctx) => {
  //   return res(
  //     ctx.json([
  //       { name: "Pika pika", id: "1" },
  //       { name: "Bulba bulba", id: "2" },
  //       { name: "Char char", id: "3" },
  //     ] as Pokeball[])
  //   );
  // }),
];
