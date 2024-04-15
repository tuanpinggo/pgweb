import useSWR from "swr";
import axiosClient from "@/api-client/axiosClient";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import { encryptWb } from "@/ultils/crypto";
import { Box } from "@mui/material";
import { toast } from "@/components/toast";

export function useAuth() {
  const router = useRouter();
  const {
    data: userData,
    isValidating,
    isLoading,
    mutate,
  } = useSWR(`/auth/me`, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
    onSuccess: (res) => {
      localStorage.setItem("user", encryptWb(res?.data));
    },
  });

  const { trigger: triggerLogin } = useSWRMutation(
    "/auth/login",
    (url, { arg: body }) => {
      return axiosClient.post(url, encryptWb(body));
    },
    {
      throwOnError: false,
      onSuccess: async () => {
        await mutate();
        router.replace("/home");
      },
    }
  );
  const { trigger: triggerLogout, isMutating: isLogoutMutating } =
    useSWRMutation(
      "/auth/logout",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: () => {
          mutate(null, false);
          localStorage.removeItem("user");
          router.replace("/auth/login");
        },
        onError: () => {},
      }
    );

  const { trigger: triggerUpdateInfo, isMutating: isUpdateInfoMutating } =
    useSWRMutation(
      "/account/update-profile",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          toast({
            type: "success",
            message: <Box>Cập nhật thông tin tài khoản thành công</Box>,
          });
          await mutate();
        },
        onError: (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );

  const {
    trigger: triggerChangePassword,
    isMutating: isChangePasswordMutating,
  } = useSWRMutation(
    "/auth/change-password",
    (url, { arg: body }) => {
      return axiosClient.post(url, encryptWb(body));
    },
    {
      throwOnError: false,
    }
  );

  const { trigger: triggerCheckPhone, isMutating: isCheckPhoneMutating } =
    useSWRMutation(
      "/auth/check-phone-exist",
      (url, { arg: body }) => {
        return axiosClient.post(url, encryptWb(body));
      },
      {
        throwOnError: false,
      }
    );

  const { trigger: triggerSendOTP, isMutating: isSendOTPMutating } =
    useSWRMutation(
      "/auth/send-otp",
      (url, { arg: body }) => {
        return axiosClient.post(url, encryptWb(body));
      },
      {
        throwOnError: false,
      }
    );

  const { trigger: triggerValidateOTP, isMutating: isValidateOTPMutating } =
    useSWRMutation(
      "/auth/validate-otp",
      (url, { arg: body }) => {
        return axiosClient.post(url, encryptWb(body));
      },
      {
        throwOnError: false,
      }
    );

  const { data: SaleRetailers } = useSWR(`/auth/sale-retailers`, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  const { trigger: triggerRegister, isMutating: isRegisterMutating } =
    useSWRMutation(
      "/auth/register",
      (url, { arg: body }) => {
        return axiosClient.post(url, encryptWb(body));
      },
      {
        throwOnError: false,
      }
    );
  const { trigger: triggerForgot, isMutating: isForgotMutating } =
    useSWRMutation(
      "/auth/forgot-password",
      (url, { arg: body }) => {
        return axiosClient.post(url, encryptWb(body));
      },
      {
        throwOnError: false,
      }
    );

  return {
    userData: userData?.data,
    isLoading: isLoading || isValidating,
    login: triggerLogin,
    getUserInfo: mutate,
    logout: triggerLogout,
    updateAccountInfo: triggerUpdateInfo,
    isUpdateInfoMutating,
    changePassword: triggerChangePassword,
    isChangePasswordMutating,
    isLogoutMutating,
    triggerCheckPhone,
    isCheckPhoneMutating,
    triggerSendOTP,
    isSendOTPMutating,
    triggerValidateOTP,
    isValidateOTPMutating,
    SaleRetailers: SaleRetailers?.data,
    triggerRegister,
    isRegisterMutating,
    triggerForgot,
    isForgotMutating,
  };
}
