import axiosClient from "@/api-client/axiosClient";
import { toast } from "@/components/toast";
import { Box } from "@mui/material";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const useSystem = () => {
  const {
    data: promotions,
    isLoading,
    isValidating,
  } = useSWR(`/promotions/get`, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  const {
    data: events,
    isLoading: isEventsLoading,
    isValidating: isEventsValidating,
  } = useSWR(`/events/get`, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  return {
    promotions: promotions?.data,
    isPromotionsLoading: isLoading || isValidating,
    events: events?.data,
    isEventsLoading: isEventsValidating || isEventsLoading,
  };
};

export default useSystem;
