import { useMemo } from "react";
import axiosClient from "@/api-client/axiosClient";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { useDispatch } from "react-redux";
import { setVisible } from "@/store/cartDrawerReducer";
import { toast } from "@/components/toast";
import { Box } from "@mui/material";

const useCart = () => {
  const dispatch = useDispatch();

  const {
    data: cart,
    mutate: mutateCart,
    isLoading: isCartLoading,
    isValidating: isCartValidating,
  } = useSWR(`/cart`, {
    dedupingInterval: 2000,
    // refreshInterval: 1000 * 30,
    throwOnError: false,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const {
    data: miniCart,
    mutate: mutateMiniCart,
    isLoading: isMiniCartLoading,
    isValidating: isMiniCartValidating,
  } = useSWR(`/cart/mini`, {
    dedupingInterval: 2000,
    // refreshInterval: 1000 * 30,
    throwOnError: false,
    revalidateOnFocus: true,
    shouldRetryOnError: false,
  });

  const refetchCart = async () => {
    await mutateCart();
    await mutateMiniCart();
  };

  const { trigger: deleteProduct, isMutating: isDeleteProductMutating } =
    useSWRMutation(
      "/cart/delete-product",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          await refetchCart();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );

  const { trigger: addProduct, isMutating: isAddProductMutating } =
    useSWRMutation(
      "/cart/add-product",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          toast({
            type: "success",
            message: <Box>Sản phẩm đã được thêm vào giỏ hàng</Box>,
          });
          await refetchCart();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );
  const { trigger: updateItem, isMutating: isUpdateItemMutating } =
    useSWRMutation(
      "/cart/update-item",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          await refetchCart();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );

  const disableCheckout = useMemo(() => {
    return cart?.data?.items?.length === 0 || !miniCart;
  }, [cart, miniCart]);

  const isLoading = isMiniCartLoading || isCartLoading;

  const isValidating = isMiniCartValidating || isCartValidating;

  const setCartDrawerVisible = (value) => {
    dispatch(setVisible(value));
  };

  const { trigger: updateShipping, isMutating: isUpdateShippingMutating } =
    useSWRMutation(
      "/cart/update-shipping",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          await refetchCart();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );

  return {
    disableCheckout,
    isLoading,
    isValidating,
    cart: cart?.data?.items || [],
    cartAmount: cart?.data?.sub_total || 0,
    cartShippingAmount: cart?.data?.shipping_amount || 0,
    badgeNum: miniCart?.data?.total_item || 0,
    cartGrandTotal: cart?.data?.grand_total || 0,
    cartDiscount: cart?.data?.discount_amount || 0,
    addProduct,
    deleteProduct,
    refetchCart,
    isAddProductMutating,
    isDeleteProductMutating,
    setCartDrawerVisible,
    updateItem,
    isUpdateItemMutating,
    updateShipping,
    isUpdateShippingMutating,
  };
};

export default useCart;
