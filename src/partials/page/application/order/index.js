import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import {
  OrderStatus,
  OrderStatusTranslation,
  OrdersPerPageLimit,
} from "@/constants/orders";
import values from "lodash/values";
import { DataGrid, viVN } from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import CancelDialog from "@/components/ui/Orders/CancelDialog";
import OrderDetailDialog from "@/components/ui/Orders/OrderDetailDialog";
import { OrdersColumns } from "./columns";
import PinggoPagination from "@/components/ui/PinggoPagination";
import useOrders from "@/hooks/useOrders";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrderPage = () => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");
  const OrderDetailDialogRef = useRef();
  const CancelDialogRef = useRef();

  const [value, setValue] = useState(0);

  const OrderTabs = useMemo(() => values(OrderStatus), []);

  const {
    orders,
    setStatus,
    isLoading,
    setSelectedOrder,
    orderDetail,
    cancelOrder,
    isCancelOrderMutating,
    mutate,
    isOrderDetailLoading,
    bankAccount,
  } = useOrders({
    setValue,
    OrderDetailDialogRef,
  });

  const handleChange = (_, newValue) => {
    setValue(newValue);
    setStatus(OrderTabs[newValue]);
  };

  return (
    <>
      <Stack>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            {...(!isOverSmScreen
              ? {
                  variant: "scrollable",
                  scrollButtons: true,
                  allowScrollButtonsMobile: true,
                }
              : {})}
          >
            {OrderTabs.map((value) => (
              <Tab
                key={value}
                label={OrderStatusTranslation[value]}
                sx={{
                  textTransform: "none",
                }}
                {...a11yProps(value)}
              />
            ))}
          </Tabs>
        </Box>
        <DataGrid
          rows={!!orders?.data ? orders?.data : []}
          columns={OrdersColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 30,
              },
            },
          }}
          pageSizeOptions={[10, 20, 30, 50, 100]}
          disableRowSelectionOnClick
          rowHeight={80}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
          getRowId={(params) => params?.id}
          loading={isLoading}
          autoHeight
          onCellClick={(params) => {
            if (params?.field === "action") {
              setSelectedOrder(params?.id);
              OrderDetailDialogRef?.current?.handleOpen();
            }
          }}
          hideFooter
        />
        <PinggoPagination
          data={orders}
          limit={OrdersPerPageLimit}
          unit={"Đơn hàng"}
        />
      </Stack>
      <OrderDetailDialog
        ref={OrderDetailDialogRef}
        title={"Chi tiết đơn nhập"}
        loading={isOrderDetailLoading}
        orderDetail={orderDetail}
        bankAccount={bankAccount}
        actionFooter={
          <Stack width={"100%"} spacing={1}>
            <Typography
              fontWeight={400}
              fontSize={13}
              variant="body2"
              textAlign={"right"}
              pr={"4px"}
            >
              Giá trị đơn hàng :
              <Typography
                component={"span"}
                variant="body2"
                fontWeight={500}
                fontSize={13}
                color={"primary"}
                ml={1}
              >
                <NumericFormat
                  thousandSeparator=","
                  decimalSeparator="."
                  value={orderDetail?.grand_total}
                  displayType="text"
                  suffix={" đ"}
                />
              </Typography>
            </Typography>
            <Stack direction={{ sm: "row" }} justifyContent={"flex-end"}>
              {orderDetail?.status === OrderStatus.Pending && (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    m: "4px",
                  }}
                  onClick={() => CancelDialogRef.current?.handleOpen()}
                >
                  Hủy đơn
                </Button>
              )}
            </Stack>
          </Stack>
        }
      />
      <CancelDialog
        ref={CancelDialogRef}
        confirmLoading={isCancelOrderMutating}
        handleConfirm={async () => {
          await cancelOrder(
            { id: orderDetail?.id },
            {
              onSuccess: async () => {
                await mutate();
                CancelDialogRef.current?.handleClose();
                OrderDetailDialogRef?.current?.handleClose();
              },
            }
          );
        }}
      />
    </>
  );
};

export default OrderPage;
