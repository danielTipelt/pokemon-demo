import useSWR from "swr";

const fetcher = (url: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(url, init).then((res) => res.json());

export function useFetch<T>(url: RequestInfo | URL) {
  return useSWR<T>(url, fetcher);
}
