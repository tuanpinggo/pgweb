import axiosClient from "@/api-client/axiosClient";
import { toast } from "@/components/toast";
import { Box } from "@mui/material";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useWishList() {
  const {
    data: wishLists,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR(`/wishlist`, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  const { trigger: addToWishList, isMutating: isAddToWishListMutating } =
    useSWRMutation(
      "/wishlist/add",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          toast({
            type: "success",
            message: <Box>Sản phẩm đã được thêm vào yêu thích</Box>,
          });
          await mutate();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );

  const { trigger: deleteWishlist, isMutating: isDeleteWishListsMutating } =
    useSWRMutation(
      "/wishlist/delete",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          toast({
            type: "success",
            message: <Box>Sản phẩm đã được xóa khỏi yêu thích</Box>,
          });
          await mutate();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );

  const isFavorited = (productId) => {
    return wishLists?.data?.find((item) => item?.id === productId);
  };

  return {
    wishLists: wishLists?.data,
    addToWishList,
    isAddToWishListMutating,
    isDeleteWishListsMutating,
    deleteWishlist,
    isFavorited,
    isLoading: isLoading || isValidating,
  };
}
