import AccountLayout from "@/layouts/account";
import Notifications from "@/partials/page/application/notifications";
import NotificationSeo from "@/partials/page/application/notifications/seo";
import { Stack, Typography } from "@mui/material";
import React from "react";

const NotificationsPage = () => {
  return (
    <React.Fragment>
      <NotificationSeo />
      <Stack p={{ xs: 0, sm: "20px" }}>
        <Typography variant="h4">Thông báo</Typography>
        <Notifications />
      </Stack>
    </React.Fragment>
  );
};

NotificationsPage.Layout = AccountLayout;

export default NotificationsPage;
