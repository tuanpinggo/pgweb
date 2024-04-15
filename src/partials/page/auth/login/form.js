import { Alert, InputAdornment, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

// icon

// hooks

// schema
import { loginSchema } from "@/models/schema";
import { useAuth } from "@/hooks/useAuth";
import Input from "@/components/ui/Controlled/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import PasswordInput from "@/components/ui/Controlled/PasswordInput";

const LoginForm = () => {
  // states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // hooks
  const { login } = useAuth();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    await login(data, {
      onError: (error) => {
        setError(error?.response?.data);
      },
    });
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mt={3} mb={1}>
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
        <PasswordInput
          control={control}
          placeholder="Mật khẩu"
          id="password"
          name="password"
        />
      </Stack>
      <Stack mt={2} justifyContent={"flex-end"} direction={"row"}>
        <Link href="/auth/forgot">
          <Typography fontSize={13} fontWeight={400} lineHeight={"18px"}>
            Bạn quên mật khẩu?{" "}
          </Typography>
        </Link>
      </Stack>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{ my: 2 }}
        loading={loading}
      >
        Tiếp tục
      </LoadingButton>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="body2">Bạn chưa có tài khoản ?</Typography>

        <Link href="/auth/register">
          <Typography variant="body2" fontWeight={600} color="primary.main">
            Đăng ký ngay
          </Typography>
        </Link>
      </Stack>
    </form>
  );
};
export default LoginForm;
