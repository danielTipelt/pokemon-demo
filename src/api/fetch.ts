import useSWR from "swr";

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

export function useFetch<T>(url: RequestInfo | URL) {
  return useSWR<T>(url, fetcher);
}
