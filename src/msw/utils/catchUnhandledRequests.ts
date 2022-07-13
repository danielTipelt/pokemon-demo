import { RestRequest } from "msw";

export function catchUnhandledRequests(req: RestRequest) {
  if (req.url.href.startsWith(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api`)) {
    throw Error(`Unhandled request:
  ${req.url.pathname}`);
  }

  if (req.url.host === "localhost:3000") {
    return;
  }

  throw Error(`Unhandled request:
  ${req.url.pathname}`);
}
