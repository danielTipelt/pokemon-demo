import { rest } from "msw";

export const handlers = [
  rest.get("https://my.backend/name", (req, res, ctx) => {
    return res(ctx.json("Homepage server title"));
  }),
  rest.get("/name", (req, res, ctx) => {
    return res(ctx.json("Homepage client title"));
  }),
];
