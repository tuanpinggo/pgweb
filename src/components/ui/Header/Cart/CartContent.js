import LoadingSection from "@/components/loading/loadingSection";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import CartItem from "./CartItem";
import ShoppingBasketOutlinedIcon from "@mui/icons-material/ShoppingBasketOutlined";
import useCart from "@/hooks/useCart";
import { useRouter } from "next/router";
import { NumericFormat } from "react-number-format";
import { LoadingButton } from "@mui/lab";

const CartContent = ({ onClose, handleRefetchCart }) => {
  const router = useRouter();

  const {
    disableCheckout,
    cart,
    isLoading,
    isValidating,
    cartAmount,
    cartShippingAmount,
    cartGrandTotal,
    refreshData,
    cartDiscount,
  } = useCart();

  const redirectToCheckout = () => {
    onClose?.();
    router.replace("/checkout");
  };

  return (
    <React.Fragment>
      <Stack
        flexGrow={1}
        minWidth={0}
        height={"100%"}
        overflow={"auto"}
        bgcolor={cart?.length === 0 ? "#FFF" : "#EEEEEE"}
        spacing={1}
        py={1}
      >
        {cart?.length === 0 && (
          <Box sx={{ textAlign: "center", margin: "20px 0 0 0" }}>
            <ShoppingBasketOutlinedIcon
              color="primary"
              style={{ fontSize: "45px" }}
            />
            <Typography variant="body2">Giỏ hàng trống</Typography>
          </Box>
        )}
        {cart?.length > 0 &&
          cart?.map((item) => (
            <React.Fragment key={item?.id}>
              <CartItem
                item={item}
                onClose={onClose}
                handleRefetchCart={handleRefetchCart}
              />
            </React.Fragment>
          ))}
        {isLoading && <LoadingSection />}
      </Stack>
      <Stack p={2}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Tạm tính
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cartAmount}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
        <Divider
          flexItem
          sx={{
            my: 0.5,
          }}
        />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Phí giao hàng
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cart?.length !== 0 ? cartShippingAmount : 0}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
        <Divider
          flexItem
          sx={{
            my: 0.5,
          }}
        />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Giảm giá
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            -
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cartDiscount}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
        <Divider
          flexItem
          sx={{
            my: 0.5,
          }}
        />
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            Tổng
          </Typography>
          <Typography
            fontSize={14}
            fontWeight={600}
            lineHeight={"20px"}
            color={"primary"}
          >
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cart?.length !== 0 ? cartGrandTotal : 0}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
        <Divider
          flexItem
          sx={{
            mt: 0.5,
          }}
        />
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Button
            disabled={disableCheckout}
            onClick={redirectToCheckout}
            variant="contained"
            fullWidth
            color="primary"
            sx={{
              margin: "10px 0",
              textTransform: "none",
              flex: 1,
            }}
          >
            Tạo đơn
          </Button>
          <LoadingButton
            variant="contained"
            loading={isValidating}
            onClick={refreshData}
            fullWidth
            color="secondary"
            sx={{
              textTransform: "none",
              flex: 1,
            }}
          >
            Cập nhật
          </LoadingButton>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default CartContent;
