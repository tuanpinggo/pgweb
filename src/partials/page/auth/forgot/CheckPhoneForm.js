import React from "react";
import { Alert, InputAdornment, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkPhoneSchema } from "@/models/schema";
import Input from "@/components/ui/Controlled/Input";
import { useAuth } from "@/hooks/useAuth";
import { Steps } from "@/pages/auth/register";

export default function CheckPhoneForm({ ...props }) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const { triggerCheckPhone, triggerSendOTP } = useAuth();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(checkPhoneSchema),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    setError("");
    await triggerCheckPhone(
      { phone: values?.phone },
      {
        onSuccess: async (res) => {
          if (!!res?.data?.exist) {
            await triggerSendOTP(
              { phone: values?.phone },
              {
                onSuccess: (res) => {
                  props?.setPhone(values?.phone);
                  props?.setStep(Steps.TypingOTP);
                },
                onError: (res) => {
                  if (res?.response?.status === 409) {
                    props?.setPhone(values?.phone);
                    props?.setStep(Steps.TypingOTP);
                  } else if (!!res) setError(res?.response?.data);
                },
              }
            );
          } else {
            setError("Số điện thoại chưa được sử dụng, vui lòng kiểm tra lại");
          }
        },
        onError: (res) => {},
      }
    );
    setLoading(false);
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
          Quên mật khẩu?
        </Typography>
        <Typography
          variant="body2"
          component="p"
          textAlign="left"
          fontSize={12}
          lineHeight={"18px"}
        >
          Vui lòng nhập số điện thoại bạn đã đăng ký để đặt lại mật khẩu mới cho
          tài khoản
        </Typography>
      </Stack>

      <Stack component={"form"} spacing={2} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={1.5}>
          {!!error && <Alert severity="error">{error}</Alert>}
          <Input
            control={control}
            placeholder={"Nhập số điện thoại"}
            id="phone"
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
        </Stack>
        <LoadingButton
          loading={loading}
          variant="contained"
          size="large"
          type="submit"
          fullWidth
        >
          TIẾP TỤC
        </LoadingButton>
      </Stack>
    </>
  );
}
