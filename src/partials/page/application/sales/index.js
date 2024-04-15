import {
  Box,
  Button,
  Pagination,
  Stack,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useMemo, useRef, useState } from "react";
import values from "lodash/values";
import { DataGrid, viVN } from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import {
  SalesPerPageLimit,
  SalesStatus,
  SalesStatusTranslation,
} from "@/constants/sales";
import { useSales } from "@/hooks/useSales";
import OrderDetailDialog from "@/components/ui/Orders/OrderDetailDialog";
import CancelDialog from "@/components/ui/Orders/CancelDialog";
import { SalesColumns } from "./columns";
import Countdown from "react-countdown";
import { addHours } from "date-fns";
import ShippingDialog from "@/components/ui/Orders/ShippingDialog";
import PinggoPagination from "@/components/ui/PinggoPagination";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SalesPage = () => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");
  const SalesTabs = useMemo(() => values(SalesStatus), []);

  const {
    sales,
    setStatus,
    isLoading,
    mutate,
    setSelectedSales,
    salesDetail,
    isSalesDetailLoading,
    updateSales,
    isUpdateSalesMutating,
  } = useSales();

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
    setStatus(SalesTabs[newValue]);
  };

  const OrderDetailDialogRef = useRef();
  const CancelDialogRef = useRef();
  const ShippingDialogRef = useRef();

  const handleSubmitShipping = async (values) => {
    await updateSales(
      {
        id: salesDetail?.id,
        data: {
          retailer_status: SalesStatus.Shipping,
          ...(!!values?.ship_code ? { ship_code: values?.ship_code } : {}),
          ...(!!values?.logistic_id
            ? { logistic_id: values?.logistic_id }
            : {}),
        },
      },
      {
        onSuccess: async () => {
          await mutate();
          ShippingDialogRef.current?.handleClose();
          OrderDetailDialogRef?.current?.handleClose();
        },
      }
    );
  };

  return (
    <>
      <Stack>
        <Stack
          className="pageContent"
          px={2}
          py={1}
          bgcolor={"#FFF3DB"}
          borderRadius={1}
          my={1}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: "15px !important",
              fontWeight: "600 !important",
            }}
          >
            Lưu ý
          </Typography>
          <ul>
            <Typography
              fontWeight={400}
              fontSize={13}
              variant="body2"
              component={"li"}
            >
              Với các đơn hàng đã tiếp nhận từ PingGO, thời gian tối đa để
              chuyển từ{" "}
              <Typography
                sx={{
                  fontSize: "13px !important",
                  fontWeight: "600 !important",
                }}
                component={"span"}
              >
                chờ giao hàng
              </Typography>{" "}
              thành{" "}
              <Typography
                sx={{
                  fontSize: "13px !important",
                  fontWeight: "600 !important",
                }}
                component={"span"}
              >
                đang giao hàng
              </Typography>{" "}
              là{" "}
              <Typography
                sx={{
                  fontSize: "13px !important",
                  fontWeight: "600 !important",
                }}
                component={"span"}
              >
                12 tiếng
              </Typography>{" "}
              kể từ lúc tiếp nhận đơn hàng thành công
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={13}
              variant="body2"
              component={"li"}
            >
              Sau thời gian này, đơn hàng không thực hiện chuyển sang trạng thái
              đang giao hàng sẽ tự động bị thu hồi để PingGO xử lý
            </Typography>
          </ul>
        </Stack>
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
            {SalesTabs.map((value) => (
              <Tab
                key={value}
                label={SalesStatusTranslation[value]}
                sx={{
                  textTransform: "none",
                }}
                {...a11yProps(value)}
              />
            ))}
          </Tabs>
        </Box>
        <DataGrid
          rows={!!sales?.data ? sales?.data : []}
          columns={SalesColumns}
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
              setSelectedSales({ id: params?.id });
              OrderDetailDialogRef?.current?.handleOpen();
            }
          }}
          hideFooter
        />
        <PinggoPagination
          data={sales}
          limit={SalesPerPageLimit}
          unit={"Đơn hàng"}
        />
      </Stack>

      <OrderDetailDialog
        ref={OrderDetailDialogRef}
        title={"Chi tiết đơn bán"}
        loading={isSalesDetailLoading}
        orderDetail={salesDetail}
        actionFooter={
          <Stack width={"100%"} spacing={1}>
            {salesDetail?.status === SalesStatus.Confirmed && (
              <>
                <Typography
                  fontWeight={400}
                  fontSize={13}
                  variant="body2"
                  pl={2}
                >
                  Thời gian còn lại để xử lý đơn hàng:
                </Typography>
                <Typography
                  component={"span"}
                  variant="body2"
                  fontWeight={500}
                  fontSize={16}
                  color={"primary"}
                  pl={2}
                >
                  <Countdown
                    date={addHours(new Date(salesDetail.updated_at), 12)}
                  />
                </Typography>
              </>
            )}

            <Typography
              fontWeight={400}
              fontSize={13}
              variant="body2"
              textAlign={"right"}
              pr={"4px"}
            >
              Số tiền COD :
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
                  value={salesDetail?.grand_total}
                  displayType="text"
                  suffix={" đ"}
                />
              </Typography>
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={13}
              variant="body2"
              textAlign={"right"}
              pr={"4px"}
            >
              Số tiền bạn nhận về :
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
                  value={salesDetail?.rev_share_retailer}
                  displayType="text"
                  suffix={" đ"}
                />
              </Typography>
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={13}
              variant="body2"
              textAlign={"right"}
              pr={"4px"}
            >
              Hoàn lại cho PingGO :
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
                  value={salesDetail?.the_rest}
                  displayType="text"
                  suffix={" đ"}
                />
              </Typography>
            </Typography>
            <Stack direction={{ sm: "row" }} justifyContent={"flex-end"}>
              {salesDetail?.status === SalesStatus.Confirmed && (
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    textTransform: "none",
                    m: "4px",
                  }}
                  onClick={() => ShippingDialogRef.current?.handleOpen()}
                >
                  Chuyển sang trạng thái giao hàng
                </Button>
              )}

              {salesDetail?.status === SalesStatus.Confirmed && (
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
        confirmLoading={isUpdateSalesMutating}
        handleConfirm={async () => {
          await updateSales(
            {
              id: salesDetail?.id,
              data: {
                retailer_status: SalesStatus.Rejected,
              },
            },
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
      <ShippingDialog
        ref={ShippingDialogRef}
        handleSubmit={handleSubmitShipping}
        loading={isUpdateSalesMutating}
      />
    </>
  );
};

export default SalesPage;
