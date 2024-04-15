import React from "react";
import { useSelector } from "react-redux";
import {
  Drawer,
  Tooltip,
  Typography,
  Badge,
  Stack,
  IconButton,
} from "@mui/material";
import useCart from "@/hooks/useCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import CartContent from "./CartContent";
import { useRouter } from "next/router";
import { useAddresses } from "@/hooks/useAddresses";
import { CartLogistic } from "@/constants/orders";

const CartDrawer = ({ containerProps }) => {
  const visible = useSelector((state) => state.cartDrawer.visible);
  const router = useRouter();

  const { badgeNum, setCartDrawerVisible, cart, updateShipping } = useCart();

  const { addresses } = useAddresses();

  const handleRefetchCart = async (deletedId) => {
    await updateShipping({
      district_id: addresses?.[0]?.district_id,
      ward_id: addresses?.[0]?.ward_id,
      shipping_type: CartLogistic.shippingUnit.id,
      weight: cart
        ?.filter((item) => item?.id !== deletedId)
        ?.reduce(
          (sum, current) =>
            sum +
            Number(current?.product?.weight2 || 0) * Number(current?.qty || 0),
          0
        ),
    });
  };

  return (
    <React.Fragment>
      <Tooltip title="Giỏ hàng">
        <IconButton
          onClick={async () => {
            if (!router.pathname?.startsWith("/checkout")) {
              setCartDrawerVisible(true);
              handleRefetchCart();
            }
          }}
          {...containerProps}
        >
          <Badge badgeContent={badgeNum} color={"primary"}>
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        open={visible}
        onClose={() => setCartDrawerVisible(false)}
        disableScrollLock={true}
      >
        <Stack
          width={{ xs: "100vw", sm: "375px" }}
          height={"100%"}
          position={"relative"}
        >
          <Stack
            direction={"row"}
            sx={{
              background:
                "linear-gradient(114deg, #F80759 -3.18%, #1D96D2 104.37%)",
            }}
            p={2}
            justifyContent={"center"}
            position={"relative"}
          >
            <IconButton
              aria-label="close-drawer"
              size="small"
              sx={{
                position: "absolute",
                left: "8px",
                top: "calc(50% - 14px)",
                color: "white.main",
              }}
              onClick={() => setCartDrawerVisible(false)}
            >
              <ArrowBackOutlinedIcon fontSize="inherit" />
            </IconButton>
            <Typography
              variant="body2"
              fontSize={20}
              fontWeight={500}
              color={"white.main"}
              lineHeight={"28px"}
            >
              Giỏ hàng
            </Typography>
          </Stack>
          <CartContent
            onClose={() => setCartDrawerVisible(false)}
            handleRefetchCart={handleRefetchCart}
          />
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};

export default CartDrawer;
