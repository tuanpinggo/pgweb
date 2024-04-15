import React from "react";
import { Box, InputAdornment, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/models/schema";
import axiosClient from "@/api-client/axiosClient";
import { useRouter } from "next/router";
import Input from "@/components/ui/Controlled/Input";
import PasswordInput from "@/components/ui/Controlled/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import Select from "@/components/ui/Controlled/Select";
import { toast } from "@/components/toast";

export default function RegisterForm({ ...props }) {
  const router = useRouter();

  const { SaleRetailers, triggerRegister, isRegisterMutating } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      phone: props?.phone,
      password: "",
      password_confirmation: "",
      admin_id: "",
    },
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (values) => {
    await triggerRegister(
      {
        phone: values.phone,
        name: values.name,
        password: values.password,
        region_id: 1,
        district_id: 2,
        ward_id: 3,
        admin_id: values?.admin_id || null,
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
          Hoàn tất đăng ký
        </Typography>
        <Typography
          variant="body2"
          component="p"
          textAlign="left"
          fontSize={12}
          lineHeight={"18px"}
        >
          Vui lòng nhập theo form bên dưới để hoàn tất đăng ký tài khoản tại
          PingGO
        </Typography>
      </Stack>

      <form onSubmit={handleSubmit(onSubmit)}>
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
            <Input
              control={control}
              label={"Họ tên bạn"}
              placeholder={"Nhập họ tên bạn"}
              id="name"
              name="name"
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
            <Select
              control={control}
              label="Người phụ trách"
              id="admin"
              name="admin_id"
              formControlProps={{
                sx: {
                  width: "100%",
                },
              }}
              options={SaleRetailers?.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              size="small"
              inputLabelProps={{
                size: "small",
              }}
            />
          </Stack>

          <LoadingButton
            loading={isRegisterMutating}
            variant="contained"
            size="large"
            type="submit"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            Đăng ký
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
}
