import { RestRequest } from "msw";

const safeUrlStarts = [
  "/_next",
  "/__nextjs_original-stack-frame",
  "/site.webmanifest",
  "/favicon.ico",
];

export function catchUnhandledRequests(req: RestRequest) {
  if (safeUrlStarts.some((url) => req.url.pathname.startsWith(url))) {
    return;
  }

  throw Error(`Unhandled request:
  ${req.url.pathname}`);
}
