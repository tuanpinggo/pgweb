import { Box } from "@mui/material";
import axiosClient from "@/api-client/axiosClient";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { toast } from "@/components/toast";
import { useState } from "react";

const useCheckout = () => {
  const { trigger: checkout, isMutating: isCheckoutMutating } = useSWRMutation(
    "/checkout",
    (url, { arg: body }) => {
      return axiosClient.post(url, body);
    },
    {
      throwOnError: false,
      onSuccess: async () => {},
      onError: async (error) => {
        toast({
          type: "error",
          message: <Box>{error?.response?.data?.message}</Box>,
        });
      },
    }
  );

  const [code, setCode] = useState(null);

  const {
    data: bankAccount,
    isLoading: isBankAccountLoading,
    isValidating: isBankAccountValidating,
  } = useSWR(!!code ? `/vat/${code}` : null, {
    dedupingInterval: 2000,
    throwOnError: false,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  return {
    checkout,
    isCheckoutMutating,
    bankAccount: bankAccount?.data,
    isBankAccountLoading: isBankAccountLoading || isBankAccountValidating,
    code,
    setCode,
  };
};

export default useCheckout;
