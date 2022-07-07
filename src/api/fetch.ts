import useSWR, { SWRConfiguration } from "swr";

const fetcher = async (
  url: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const response = await fetch(url, init);

  if (response.ok === false) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }

  const result = await response.json();
  return result;
};

export function useFetch<T>(
  url: RequestInfo | URL | null,
  options?: SWRConfiguration
) {
  return useSWR<T>(url, { fetcher: fetcher, ...options });
}
