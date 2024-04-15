import axiosClient from "@/api-client/axiosClient";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useState } from "react";
import { SalesStatus } from "@/constants/sales";
import { Box } from "@mui/material";
import { toast } from "@/components/toast";
import { useRouter } from "next/router";

export function useSales() {
  const [status, setStatus] = useState(SalesStatus.Confirmed);

  const router = useRouter();

  const {
    data: sales,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(
    `/sales?retailer_status=${status}&page=${Number(router?.query?.page) || 1}`,
    {
      refreshInterval: 1000 * 30,
      throwOnError: false,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      keepPreviousData: true,
      revalidateIfStale: true,
    }
  );

  const [selectedSales, setSelectedSales] = useState({
    id: null,
    time_end: null,
  });

  const {
    data: salesDetail,
    isLoading: isSalesDetailLoading,
    isValidating: isSalesDetailValidating,
  } = useSWR(!!selectedSales?.id ? `/sales/${selectedSales?.id}` : null, {
    revalidateOnFocus: true,
    throwOnError: false,
  });

  const { trigger: receiveSales, isMutating: isReceiveSalesMutating } =
    useSWRMutation("/sales/receive", (url, { arg: body }) => {
      return axiosClient.post(url, body);
    });

  const { trigger: updateSales, isMutating: isUpdateSalesMutating } =
    useSWRMutation(
      "/sales/update-status",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );

  return {
    sales,
    isLoading: isLoading || isValidating,
    status,
    setStatus,
    mutate,
    salesDetail: salesDetail?.data,
    selectedSales,
    setSelectedSales,
    isSalesDetailLoading: isSalesDetailLoading || isSalesDetailValidating,
    receiveSales,
    isReceiveSalesMutating,
    updateSales,
    isUpdateSalesMutating,
  };
}
