import { Stack, Tooltip, Typography } from "@mui/material";
import React from "react";
import NumericInput from "../Controlled/NumericInput";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import useCart from "@/hooks/useCart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useWishList } from "@/hooks/useWishList";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { first, sortBy } from "lodash";

const ControlledQuantityInput = ({ product }) => {
  const { addProduct, isAddProductMutating } = useCart();
  const {
    addToWishList,
    isFavorited,
    deleteWishlist,
    isAddToWishListMutating,
    isDeleteWishListsMutating,
  } = useWishList();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      qty: !!product?.price_list
        ? first(sortBy(product?.price_list, (item) => Number(item?.qty || 0)))
            ?.qty
        : 1,
    },
  });
  const onSubmit = async (values) => {
    await addProduct({ id: product?.id, qty: values?.qty });
  };
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        mb: "24px",
      }}
    >
      <NumericInput
        name={"qty"}
        type="number"
        control={control}
        size={"small"}
        min={
          !!product?.price_list
            ? first(
                sortBy(product?.price_list, (item) => Number(item?.qty || 0))
              )?.qty
            : 1
        }
      />

      <Tooltip title="Thêm vào giỏ hàng">
        <LoadingButton
          variant="text"
          color="primary"
          onClick={handleSubmit(onSubmit)}
          loading={isAddProductMutating}
          startIcon={
            <AddShoppingCartOutlinedIcon
              color="secondary"
              sx={{
                width: "20px",
                height: "20px",
                color: "primary",
              }}
            />
          }
          loadingPosition="start"
          sx={{
            width: "36px",
            height: "36px",
            minWidth: "36px",
            maxWidth: "36px",
            borderRadius: "100%",
            ".MuiButton-startIcon": {
              margin: 0,
            },
            ".MuiLoadingButton-loadingIndicator": {
              left: "9px",
            },
          }}
        />
      </Tooltip>

      <Tooltip
        title={
          isFavorited(product?.id) ? "Xoá khỏi yêu thích" : "Thêm vào yêu thích"
        }
      >
        <LoadingButton
          variant="text"
          onClick={async (event) => {
            event.preventDefault();
            if (isFavorited(product?.id)) {
              await deleteWishlist(product?.id);
            } else {
              await addToWishList(product?.id);
            }
          }}
          loading={isAddToWishListMutating || isDeleteWishListsMutating}
          startIcon={
            isFavorited(product?.id) ? (
              <FavoriteIcon sx={{ color: "#da1a5d" }} />
            ) : (
              <FavoriteBorderOutlinedIcon
                sx={{ cursor: "pointer", fill: "black" }}
              />
            )
          }
          loadingPosition="start"
          sx={{
            width: "36px",
            height: "36px",
            minWidth: "36px",
            maxWidth: "36px",
            borderRadius: "100%",
            ".MuiButton-startIcon": {
              margin: 0,
            },
            ".MuiLoadingButton-loadingIndicator": {
              left: "9px",
            },
          }}
        />
      </Tooltip>
    </Stack>
  );
};
export default ControlledQuantityInput;
