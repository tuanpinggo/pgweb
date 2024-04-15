import { Box, Stack, Tab, Tabs } from "@mui/material";
import React, { useMemo } from "react";

import values from "lodash/values";
import { DataGrid, viVN } from "@mui/x-data-grid";

import PinggoPagination from "@/components/ui/PinggoPagination";
import { NotificationsColumn } from "./column";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationType } from "@/constants/notifications";
import { useRouter } from "next/router";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Notifications = () => {
  const NotificationsTabs = useMemo(() => values(NotificationType), []);

  const router = useRouter();

  const { notifications, isLoading } = useNotifications();

  const handleChange = (_, newValue) => {
    router.push({
      pathname: router.pathname,
      query: {
        page: 1,
        ...(!!NotificationsTabs[newValue]?.value
          ? { topic: NotificationsTabs[newValue]?.value }
          : {}),
      },
    });
  };

  return (
    <>
      <Stack mt={"20px"}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={Number(router?.query?.topic || 0)}
            onChange={handleChange}
          >
            {NotificationsTabs.map(({ tabName }) => (
              <Tab
                key={tabName}
                label={tabName}
                sx={{
                  textTransform: "none",
                }}
                {...a11yProps(tabName)}
              />
            ))}
          </Tabs>
        </Box>
        <DataGrid
          rows={!!notifications?.data ? notifications?.data : []}
          columns={NotificationsColumn}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 30,
              },
            },
          }}
          pageSizeOptions={[10, 20, 30, 50, 100]}
          disableRowSelectionOnClick
          getRowHeight={() => "auto"}
          getEstimatedRowHeight={() => 200}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          getRowId={(params) => params?.id}
          loading={isLoading}
          autoHeight
          hideFooter
          getRowClassName={(params) =>
            !params?.row?.read_at ? "unread_noti_row" : ""
          }
        />
        <PinggoPagination data={notifications} limit={10} unit={"Đơn hàng"} />
      </Stack>
    </>
  );
};

export default Notifications;
