import { Stack, Typography } from "@mui/material";
import MainSales from "@/partials/page/application/sales";
import React from "react";
import AccountLayout from "@/layouts/account";

const SalesPage = () => {
  return (
    <Stack p={{ xs: 0, sm: "20px" }}>
      <Typography
        variant="h2"
        fontSize={20}
        lineHeight={"28px"}
        fontWeight={700}
        mb={2}
      >
        Đơn hàng đã tiếp nhận
      </Typography>
      <MainSales />
    </Stack>
  );
};

SalesPage.Layout = AccountLayout;

export default SalesPage;
