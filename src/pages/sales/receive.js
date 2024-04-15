import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import WaitingOrders from "@/partials/page/home/WaitingOrders";

const SalesReceipt = () => {
  return (
    <Stack minHeight={"50vh"}>
      <Paper
        sx={{
          p: 4,
          flexGrow: 1,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4">Đơn hàng chờ tiếp nhận</Typography>
        <WaitingOrders noHeader />
      </Paper>
    </Stack>
  );
};

export default SalesReceipt;
