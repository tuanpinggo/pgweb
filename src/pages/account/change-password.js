import AccountLayout from "@/layouts/account";
import ChangePasswordForm from "@/partials/page/application/change-password";
import ChangePasswordSeo from "@/partials/page/application/change-password/seo";
import { Stack, Typography } from "@mui/material";

const ChangePassword = () => {
  return (
    <Stack p={{ xs: 0, sm: "20px" }}>
      <ChangePasswordSeo />
      <Typography variant="h4" mb={"20px"}>
        Đổi mật khẩu
      </Typography>
      <ChangePasswordForm />
    </Stack>
  );
};

ChangePassword.Layout = AccountLayout;

export default ChangePassword;
