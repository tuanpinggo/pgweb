import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import first from "lodash/first";
import Link from "next/link";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";

import PinggoImage from "@/components/ui/PinggoImage";
import useCart from "@/hooks/useCart";
import { LoadingButton } from "@mui/lab";
import { ProductType } from "@/constants/products";
import { useWishList } from "@/hooks/useWishList";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { NumericFormat } from "react-number-format";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Product = (props) => {
  const { addProduct, isAddProductMutating } = useCart();

  const {
    addToWishList,
    isFavorited,
    deleteWishlist,
    isAddToWishListMutating,
    isDeleteWishListsMutating,
  } = useWishList();

  return (
    <Grid xs={6} sm={4} md={3} lg={2.4}>
      <Link
        href={{
          pathname: "/products/[slug]",
          query: { slug: `${props?.slug}-i.${props?.id}` },
        }}
      >
        <Stack
          height="100%"
          border="1px solid #eee"
          borderRadius={1.5}
          className="boxHover"
          bgcolor={"#FFFFFF"}
          spacing={0}
        >
          <Stack height="100%">
            <Stack
              objectFit="cover"
              width={"100%"}
              height={{ xs: "150px", sm: "215px" }}
              maxHeight={{ xs: "150px", sm: "215px" }}
              minHeight={{ xs: "150px", sm: "215px" }}
              borderRadius="8px 8px 0 0"
              sx={{
                "& img": {
                  borderRadius: "6px 6px 0 0",
                },
              }}
            >
              <PinggoImage
                src={first(props?.images)?.large_image_url}
                cover
                alt={"Product Image"}
              />
            </Stack>
            <Stack
              width={"100%"}
              minHeight={0}
              px={{ xs: 1, sm: 1.5 }}
              pt={{ xs: 1, sm: 1.5 }}
              flexGrow={1}
              justifyContent={"space-between"}
            >
              <Typography
                sx={{
                  display: "-webkit-box",
                  " -webkit-line-clamp": 2,
                  " -webkit-box-orient": "vertical",
                  overflow: "hidden",
                }}
                fontWeight={400}
                fontSize={14}
                lineHeight={"20px"}
              >
                {props?.name}
              </Typography>
              {!!props?.in_stock ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  mt={1}
                >
                  {props?.price === 0 ? (
                    <>
                      <Typography
                        component={"span"}
                        fontSize={14}
                        fontWeight={400}
                      >
                        Giá:
                      </Typography>
                      <Typography
                        component={"span"}
                        fontSize={{ xs: 14, sm: 18 }}
                        lineHeight={{ xs: "20px", sm: "24px" }}
                        fontWeight={600}
                        variant={"h6"}
                      >
                        Liên hệ
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        component={"span"}
                        fontSize={14}
                        fontWeight={400}
                      >
                        Giá chỉ từ
                      </Typography>
                      <Typography
                        component={"span"}
                        fontSize={{ xs: 14, sm: 20 }}
                        lineHeight={{ xs: "20px", sm: "24px" }}
                        fontWeight={600}
                        variant={"h6"}
                      >
                        <NumericFormat
                          thousandSeparator=","
                          decimalSeparator="."
                          value={props?.price}
                          displayType="text"
                          suffix={"đ"}
                        />
                      </Typography>
                    </>
                  )}
                </Stack>
              ) : (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  mt={1}
                >
                  <Typography
                    component={"span"}
                    fontSize={{ xs: 12, sm: 14 }}
                    lineHeight={{ xs: "20px", sm: "24px" }}
                    fontWeight={400}
                    variant={"h6"}
                  >
                    {props?.stock_label}
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Stack
            mt={props?.isLogined && "8px"}
            alignItems={"center"}
            justifyContent={"space-around"}
            direction={"row"}
            px={{ xs: 1, sm: 1.5 }}
            mb={{ xs: 1, sm: 1.5 }}
          >
            {props?.isLogined && (
              <Tooltip title="Thêm vào giỏ hàng">
                <LoadingButton
                  variant="text"
                  color="primary"
                  onClick={async (event) => {
                    event.preventDefault();
                    if (props?.type === ProductType.Simple) {
                      await addProduct({ id: props?.id, qty: 1 });
                    } else {
                      props?.onQuickView?.(props?.id);
                    }
                  }}
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
                    ...(props?.price === 0 ? { display: "none" } : {}),
                  }}
                />
              </Tooltip>
            )}
            <Tooltip
              title={
                isFavorited(props?.id)
                  ? "Xoá khỏi yêu thích"
                  : "Thêm vào yêu thích"
              }
            >
              <LoadingButton
                variant="text"
                onClick={async (event) => {
                  event.preventDefault();
                  if (isFavorited(props?.id)) {
                    await deleteWishlist(props?.id);
                  } else {
                    await addToWishList(props?.id);
                  }
                }}
                loading={isAddToWishListMutating || isDeleteWishListsMutating}
                startIcon={
                  isFavorited(props?.id) ? (
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

            {props?.isLogined && (
              <Tooltip title="Xem nhanh sản phẩm">
                <IconButton
                  onClick={async (event) => {
                    event.preventDefault();
                    props?.onQuickView?.(props?.id);
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
      </Link>
    </Grid>
  );
};

export default Product;
