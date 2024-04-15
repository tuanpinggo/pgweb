import { Stack, Typography } from "@mui/material";
import MainOrder from "@/partials/page/application/order";
import React from "react";
import AccountLayout from "@/layouts/account";

const OrderPage = () => {
  return (
    <Stack p={{ xs: 0, sm: "20px" }}>
      <Typography
        variant="h2"
        fontSize={20}
        lineHeight={"28px"}
        fontWeight={700}
        mb={2}
      >
        Danh sách đơn hàng nhập
      </Typography>
      <MainOrder />
    </Stack>
  );
};
OrderPage.Layout = AccountLayout;

export default OrderPage;
