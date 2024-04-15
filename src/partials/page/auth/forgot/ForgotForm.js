import React from "react";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "@/models/schema";
import { useRouter } from "next/router";
import Input from "@/components/ui/Controlled/Input";
import PasswordInput from "@/components/ui/Controlled/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/toast";

export default function ForgotForm({ ...props }) {
  const router = useRouter();

  const { triggerForgot, isForgotMutating } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: props?.phone,
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values) => {
    await triggerForgot(
      {
        phone: values.phone,
        password: values.password,
        password_confirmation: values.password_confirmation,
      },
      {
        onSuccess: (res) => {
          toast({ type: "success", message: <Box>{res?.message}</Box> });
          router.push("/auth/login");
        },
      }
    );
  };

  return (
    <>
      <Stack spacing={"5px"}>
        <Typography
          variant="h1"
          component="h1"
          fontWeight={700}
          fontSize={18}
          lineHeight={"40px"}
          textAlign="left"
        >
          Đặt mật khẩu mới
        </Typography>
        <Typography
          variant="body2"
          component="p"
          textAlign="left"
          fontSize={12}
          lineHeight={"18px"}
        >
          Vui lòng nhập theo form bên dưới để đặt lại mật khẩu mới cho tài khoản
          của bạn
        </Typography>
      </Stack>

      <form>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Input
              control={control}
              placeholder={"Nhập số điện thoại"}
              id="phone"
              disabled
              name="phone"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Image
                        src="/icons/vi-flag.svg"
                        width={20}
                        height={14}
                        alt="Vi Flag"
                      />
                      <Typography variant="body2">+84</Typography>
                    </Stack>
                  </InputAdornment>
                ),
              }}
              fullWidth
              size="small"
            />
            <PasswordInput
              control={control}
              placeholder="Nhập mật khẩu"
              id="password"
              name="password"
              label={"Nhập mật khẩu"}
            />
            <PasswordInput
              control={control}
              placeholder="Nhập lại mật khẩu"
              id="password_confirmation"
              name="password_confirmation"
              label={"Nhập lại mật khẩu"}
            />
          </Stack>

          <LoadingButton
            loading={isForgotMutating}
            variant="contained"
            size="large"
            type="submit"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            Xác nhận
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
