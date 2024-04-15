import useSWR from "swr";

export function useCampaign() {
  const {data: campaigns, isLoading, isValidating, error, mutate} = useSWR(`https://pinggocamp.pinggo.vn/api/campaigns?populate=*`,{
    refreshInterval: 10000,
    dedupingInterval: 10000,
    refreshWhenHidden: true,
    revalidateOnFocus: true
  })


  return {
    campaigns,
    isLoading
  };
}
