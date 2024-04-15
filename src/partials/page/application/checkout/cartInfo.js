import useCart from "@/hooks/useCart";
import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import LoadingSection from "@/components/loading/loadingSection";
import CartItem from "@/components/ui/Header/Cart/CartItem";
import Grid from "@mui/material/Unstable_Grid2";

const CartInfo = () => {
  const { cart, isLoading } = useCart();

  return (
    <Grid item xs={12} md={6}>
      <Typography
        fontWeight={500}
        fontSize={16}
        lineHeight={"32px"}
        color={"primary"}
        mb={1}
      >
        Giỏ hàng
      </Typography>
      <Stack spacing={1}>
        {isLoading ? (
          <LoadingSection />
        ) : (
          cart.map((item) => (
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
          ))
        )}
      </Stack>
    </Grid>
  );
};

export default CartInfo;
