import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "@/models/schema";
import { useForm } from "react-hook-form";
import PasswordInput from "@/components/ui/Controlled/PasswordInput";
import { Alert, Box, Stack, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { toast } from "@/components/toast";

const ChangePasswordForm = () => {
  const { changePassword, isChangePasswordMutating } = useAuth();
  const [error, setError] = useState("");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      old_password: "",
      password: "",
      password_confirmation: "",
    },
    resolver: yupResolver(changePasswordSchema),
  });
  const onSubmit = async (data) => {
    setError("");
    await changePassword(data, {
      onSuccess: () => {
        toast({
          type: "success",
          message: <Box>Cập nhật mật khẩu mới thành công</Box>,
        });
      },
      onError: (error) => {
        setError(error?.response?.data?.message);
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!error && (
        <Alert severity="error" sx={{ mb: "16px" }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <PasswordInput
          control={control}
          placeholder="Mật khẩu hiện tại"
          id="old_password"
          name="old_password"
          label={"Mật khẩu hiện tại"}
        />
        <PasswordInput
          control={control}
          placeholder="Mật khẩu"
          id="password"
          name="password"
          label={"Mật khẩu"}
        />
        <PasswordInput
          control={control}
          placeholder="Xác nhận mật khẩu mới"
          id="password_confirmation"
          name="password_confirmation"
          label={"Xác nhận mật khẩu mới"}
        />
        <LoadingButton
          variant="contained"
          sx={{
            color: "white",
          }}
          type="submit"
          loading={isChangePasswordMutating}
        >
          <Typography
            textTransform={"initial"}
            variant="body1"
            color={"white !important"}
          >
            Đổi mật khẩu
          </Typography>
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default ChangePasswordForm;
