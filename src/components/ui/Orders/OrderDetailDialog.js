import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LoadingSection from "@/components/loading/loadingSection";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import Image from "next/image";
import { OrderSvg } from "public/icons";
import CartItem from "../Header/Cart/CartItem";
import BankingInfo from "./BankingInfo";
import {
  PaymentMethod,
  PaymentMethodTranslation,
} from "@/constants/payment-methods";

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
    sx: {
      textTransform: "none",
    },
  };
};

const OrderDetailDialog = forwardRef(
  (
    { title = "Chi tiết đơn", loading, orderDetail, actionFooter, bankAccount },
    ref
  ) => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    useImperativeHandle(ref, () => ({
      handleOpen,
      handleClose,
    }));

    const [value, setValue] = useState(0);

    const handleChange = (_, newValue) => {
      setValue(newValue);
    };
    return (
      <Dialog
        open={openModal}
        onClose={handleClose}
        disableScrollLock
        fullWidth
      >
        <DialogTitle
          sx={{
            padding: {
              xs: "16px",
              sm: "16px 24px",
            },
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="body2" fontSize={16} fontWeight={600}>
              {title}
            </Typography>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClose}
              color="inherit"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        {loading ? (
          <LoadingSection />
        ) : (
          <>
            <DialogContent
              sx={{
                padding: {
                  xs: "16px",
                  sm: "16px 24px",
                },
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab label="Thông tin đơn hàng" {...a11yProps(0)} />
                  <Tab label="Danh sách sản phẩm" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Stack
                  component={Paper}
                  elevation={0}
                  sx={{ border: "1px solid #eee" }}
                  p={{ xs: 1, sm: 2 }}
                  borderRadius={2}
                  mb={1}
                >
                  <Stack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    direction={"row"}
                  >
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      <Image src={OrderSvg} width={26} height={26} alt="logo" />
                      <Typography fontSize={14} fontWeight={600}>
                        Thông tin đơn hàng
                      </Typography>
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Stack spacing={1}>
                    <Typography fontWeight={400} fontSize={13} variant="body2">
                      Mã đơn :
                      <Typography
                        component={"span"}
                        variant="body2"
                        fontWeight={500}
                        fontSize={13}
                        color={"primary"}
                        ml={1}
                      >
                        {orderDetail?.code}
                      </Typography>
                    </Typography>
                    <Typography fontWeight={400} fontSize={13} variant="body2">
                      Trạng thái :
                      <Typography
                        component={"span"}
                        variant="body2"
                        fontWeight={500}
                        fontSize={13}
                        ml={1}
                      >
                        {orderDetail?.status_label}
                      </Typography>
                    </Typography>
                    <Typography fontWeight={400} fontSize={13} variant="body2">
                      Khách hàng :
                      <Typography
                        component={"span"}
                        variant="body2"
                        fontWeight={500}
                        fontSize={13}
                        ml={1}
                      >
                        {orderDetail?.address?.name}
                      </Typography>
                    </Typography>
                    <Typography fontWeight={400} fontSize={13} variant="body2">
                      Địa chỉ :
                      <Typography
                        component={"span"}
                        variant="body2"
                        fontWeight={500}
                        fontSize={13}
                        ml={1}
                      >
                        {orderDetail?.address?.address}
                      </Typography>
                    </Typography>
                    <Typography fontWeight={400} fontSize={13} variant="body2">
                      Điện thoại :
                      <Typography
                        component={"span"}
                        variant="body2"
                        fontWeight={500}
                        fontSize={13}
                        ml={1}
                      >
                        {orderDetail?.address?.phone}
                      </Typography>
                    </Typography>
                    {orderDetail?.payment_method === PaymentMethod.COD && (
                      <Typography
                        fontWeight={400}
                        fontSize={13}
                        variant="body2"
                      >
                        Phương thức thanh toán :
                        <Typography
                          component={"span"}
                          variant="body2"
                          fontWeight={500}
                          fontSize={13}
                          ml={1}
                        >
                          {PaymentMethodTranslation[PaymentMethod.COD]}
                        </Typography>
                      </Typography>
                    )}
                  </Stack>
                </Stack>
                {orderDetail?.payment_method === PaymentMethod.BankTransfer && (
                  <BankingInfo
                    bankAccount={bankAccount}
                    code={orderDetail?.code}
                  />
                )}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Stack
                  maxHeight={"calc(100vh - 310px)"}
                  pr={1}
                  overflow={"auto"}
                  spacing={1}
                >
                  {orderDetail?.items?.map((item) => (
                    <Stack
                      component={Paper}
                      elevation={0}
                      sx={{ border: "1px solid #eee" }}
                      key={item?.id}
                      p={1}
                      borderRadius={2}
                    >
                      <CartItem item={item} editable={false} />
                    </Stack>
                  ))}
                </Stack>
              </CustomTabPanel>
            </DialogContent>
            <DialogActions
              sx={{
                padding: {
                  xs: "16px",
                  sm: "16px 24px",
                },
              }}
            >
              {actionFooter}
            </DialogActions>
          </>
        )}
      </Dialog>
    );
  }
);

OrderDetailDialog.displayName = "OrderDetailDialog";

export default OrderDetailDialog;
