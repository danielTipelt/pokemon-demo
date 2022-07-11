import { RestRequest } from "msw";

export function catchUnhandledRequests(req: RestRequest) {
  if (req.url.href.startsWith("http://localhost:3000/api")) {
    throw Error(`Unhandled request:
  ${req.url.pathname}`);
  }

  if (req.url.host === "localhost:3000") {
    return;
  }

  throw Error(`Unhandled request:
  ${req.url.pathname}`);
}
