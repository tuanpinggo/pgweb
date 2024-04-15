import { StorageKeys } from "@/constants/storage-keys";
import AuthLayout from "@/layouts/auth";
import LoginForm from "@/partials/page/auth/login/form";
import LoginSeo from "@/partials/page/auth/login/seo";
import { Container, Stack, Typography } from "@mui/material";
import { get } from "lodash";

const LoginPage = () => {
  return (
    <>
      <LoginSeo />
      <Container maxWidth="xs">
        <Stack spacing={1} minHeight={500} justifyContent="center">
          <Typography
            variant="h1"
            component="h1"
            fontSize={22}
            textAlign="left"
          >
            PINGGO xin chào!
          </Typography>
          <Typography variant="body2" component="p" textAlign="left">
            Vui lòng sử dụng số điện thoại của bạn để đăng nhập tài khoản PingGO
            Retailer
          </Typography>
          <LoginForm />
        </Stack>
      </Container>
    </>
  );
};

LoginPage.Layout = AuthLayout;

// export async function getServerSideProps({ req }) {
//   const token = get(req?.cookies, StorageKeys.Token, "");
//   if (!!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       notFound: true,
//     },
//   };
// }

export default LoginPage;
