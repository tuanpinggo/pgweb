import AccountLayout from "@/layouts/account";
import AccountInfoForm from "@/partials/page/application/info";
import AccountInfoSeo from "@/partials/page/application/info/seo";
import { Stack, Typography } from "@mui/material";
import React from "react";

const Info = () => {
  return (
    <React.Fragment>
      <AccountInfoSeo />
      <Stack p={{ xs: 0, sm: "20px" }}>
        <Typography
          fontWeight={600}
          fontSize={24}
          lineHeight={"32px"}
          color={"primary"}
        >
          Thông tin tài khoản
        </Typography>
        <AccountInfoForm />
      </Stack>
    </React.Fragment>
  );
};

Info.Layout = AccountLayout;

export default Info;
