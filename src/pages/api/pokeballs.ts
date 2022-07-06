import { Pokeball } from "../../types/Pokeball";
import type { NextApiRequest, NextApiResponse } from "next";

const userPokeballs: Pokeball[] = [
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

export default function userPokeballsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id, name },
    method,
  } = req;

  switch (method) {
    case "GET":
      res.status(200).json(userPokeballs);
      break;
    case "PUT": {
      const newPokeballData = req.body as Omit<Pokeball, "id">;

      const pokeballIndex = userPokeballs.findIndex(
        (pokeball) => pokeball.id === id
      );

      if (pokeballIndex === -1 || typeof id !== "string") {
        res.status(404);
        break;
      }
      const newPokeball = {
        id: id,
        ...newPokeballData,
      };

      userPokeballs.splice(pokeballIndex, 1, newPokeball);
      res.status(200).json(newPokeball);
      break;
    }
    case "POST": {
      const newPokeballData = req.body as Omit<Pokeball, "id">;

      userPokeballs.push({
        id: userPokeballs.length.toString(),
        ...newPokeballData,
      });
      res.status(200).json(userPokeballs);
    }
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
