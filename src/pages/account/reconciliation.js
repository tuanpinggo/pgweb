import AccountLayout from "@/layouts/account";
import NotificationSeo from "@/partials/page/application/notifications/seo";
import { Stack, Typography } from "@mui/material";
import React from "react";

const Reconciliation = () => {
  return (
    <React.Fragment>
      <NotificationSeo />
      <Stack p={{ xs: 0, sm: "20px" }}>
        <Typography variant="h4">Đối soát</Typography>
      </Stack>
    </React.Fragment>
  );
};

Reconciliation.Layout = AccountLayout;

export default Reconciliation;
