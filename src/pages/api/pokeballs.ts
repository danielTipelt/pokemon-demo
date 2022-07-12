import { Pokeball } from "../../types/Pokeball";
import type { NextApiRequest, NextApiResponse } from "next";
import { pokeballs } from "@/msw/db/pokeballs";

// this should serve as an API when mocking is turned off
const userPokeballs: Pokeball[] = pokeballs;

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
      const newPokeballData = JSON.parse(req.body) as Omit<Pokeball, "id">;

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
      const newPokeballData = JSON.parse(req.body) as Omit<Pokeball, "id">;
      const newPokeball = {
        id: userPokeballs.length.toString(),
        ...newPokeballData,
      };
      userPokeballs.push(newPokeball);
      res.status(201).json(newPokeball);
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
