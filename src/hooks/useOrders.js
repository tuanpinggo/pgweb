import axiosClient from "@/api-client/axiosClient";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { OrderStatus } from "@/constants/orders";
import { Box } from "@mui/material";
import { toast } from "@/components/toast";
import { useRouter } from "next/router";
import { values } from "lodash";
import { PaymentMethod } from "@/constants/payment-methods";
import useCheckout from "./useCheckout";

const useOrders = (props) => {
  const [status, setStatus] = useState(OrderStatus.All);
  const router = useRouter();
  const { bankAccount, setCode } = useCheckout();
  const {
    data: orders,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(
    !!status
      ? `/orders?status=${status}&page=${Number(router?.query?.page) || 1}`
      : `/orders?page=${Number(router?.query?.page) || 1}`,
    {
      refreshInterval: 1000 * 30,
      throwOnError: false,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
      keepPreviousData: true,
      revalidateIfStale: true,
    }
  );

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!!router.query?.orderId) {
      setSelectedOrder(router.query?.orderId);
    }
  }, [router.query?.orderId]);

  const {
    data: orderDetail,
    mutate: mutateOrderDetail,
    isLoading: isOrderDetailLoading,
    isValidating: isOrderDetailValidating,
  } = useSWR(!!selectedOrder ? `/orders/${selectedOrder}` : null, {
    throwOnError: false,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
    keepPreviousData: true,
    onSuccess: (res) => {
      const order = res?.data;
      if (!!router.query?.orderId) {
        const tabIndex = values(OrderStatus).findIndex(
          (item) => item === order?.status
        );
        props?.setValue(tabIndex);
        setStatus(order?.status);
        props?.OrderDetailDialogRef?.current?.handleOpen();
        router.push("/orders", null, { shallow: true });
        setSelectedOrder(null);
      }
      if (
        order?.status === OrderStatus.Pending &&
        order?.payment_method === PaymentMethod.BankTransfer
      ) {
        setCode(order?.code);
      }
    },
  });

  const { trigger: cancelOrder, isMutating: isCancelOrderMutating } =
    useSWRMutation(
      "/orders",
      (url, { arg: { id } }) => {
        return axiosClient.post(`${url}/${id}/cancel`);
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
    orders,
    isLoading: isLoading || isValidating,
    orderDetail: orderDetail?.data,
    mutate,
    mutateOrderDetail,
    selectedOrder,
    setSelectedOrder,
    isOrderDetailLoading: isOrderDetailLoading || isOrderDetailValidating,
    status,
    setStatus,
    cancelOrder,
    isCancelOrderMutating,
    bankAccount,
  };
};
export default useOrders;
