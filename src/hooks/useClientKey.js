import useSWR from "swr";

export function useClientKey() {
  const { data: clientKey } = useSWR(`/auth/clientKey`, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  return {
    clientKey,
  };
}
