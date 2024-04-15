import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useImperativeHandle, useState } from "react";
import useSWR from "swr";
import LoadingSection from "@/components/loading/loadingSection";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Thumbs, Autoplay } from "swiper/modules";
import PinggoImage from "../PinggoImage";
import SimpleProduct from "../ProductType/Simple";
import { ProductType } from "@/constants/products";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import ControlledQuantityInput from "./ControlledQuantityInput";

const QuickViewDrawer = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [viewingProduct, setViewingProduct] = useState(null);

  const { data, mutate, isLoading, isValidating } = useSWR(
    !!viewingProduct ? `/products/${viewingProduct}` : null,
    {
      dedupingInterval: 1000 * 60 * 60 * 24,
      throwOnError: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      onSuccess: (res) => {},
      onError: (res) => {},
    }
  );

  const product = data?.data;

  const {
    data: variantsData,
    isLoading: isVariantsLoading,
    isValidating: isVariantsValidating,
  } = useSWR(
    () =>
      product.type === ProductType.Configurable
        ? `products/${viewingProduct}/variants`
        : null,
    {
      dedupingInterval: 1000 * 60 * 60 * 24,
      throwOnError: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      onSuccess: (res) => {},
      onError: (res) => {},
    }
  );

  const variants = variantsData?.data?.variants;

  const handleCloseDrawer = async () => {
    setViewingProduct(null);
    setVisible(false);
  };

  useImperativeHandle(ref, () => ({
    setVisible: setVisible,
    mutate: mutate,
    setViewingProduct: setViewingProduct,
    onViewProduct: (productId) => {
      setViewingProduct(productId);
      setVisible(true);
    },
    onClose: handleCloseDrawer,
  }));

  return (
    <Drawer
      anchor="right"
      open={visible}
      onClose={handleCloseDrawer}
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
            onClick={handleCloseDrawer}
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
            Xem nhanh sản phẩm
          </Typography>
        </Stack>
        <Box
          sx={{
            flexGrow: "1",
            WebkitFlexGrow: "1",
            overflow: "auto",
            height: "100%",
          }}
        >
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            modules={[FreeMode, Pagination, Thumbs, Autoplay]}
            className="custom-swiper2"
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
          >
            {product?.images?.map((image) => (
              <SwiperSlide key={image?.large_image_url}>
                <PinggoImage
                  src={image?.large_image_url}
                  alt="Image"
                  width={250}
                  height={250}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Box sx={{ padding: "16px" }}>
            <Stack spacing={1}>
              <Typography variant="body1" fontWeight={"500"}>
                {product?.name}
              </Typography>
              <Typography variant="body2" component={"span"} my={"4px"}>
                Thương hiệu:
                <Typography
                  variant="body2"
                  component={"span"}
                  ml={"4px"}
                  color={"primary"}
                  fontWeight={"500"}
                >
                  {product?.brand?.name}
                </Typography>
              </Typography>
              {product?.type === ProductType.Simple && (
                <React.Fragment>
                  <SimpleProduct product={product} quickView />
                  <Divider
                    flexItem
                    sx={{
                      my: "16px",
                    }}
                  />
                  <ControlledQuantityInput product={product} />
                </React.Fragment>
              )}
              {product?.type === ProductType.Configurable &&
                variants?.map((variant) => (
                  <React.Fragment key={variant.variant_id}>
                    <Typography variant="body2" fontWeight={"500"}>
                      {variant?.product?.name}
                    </Typography>
                    <SimpleProduct product={variant?.product} quickView />
                    <Divider
                      flexItem
                      sx={{
                        my: "16px",
                      }}
                    />
                    <ControlledQuantityInput product={variant?.product} />
                  </React.Fragment>
                ))}
            </Stack>
          </Box>
          {(isValidating ||
            isLoading ||
            isVariantsLoading ||
            isVariantsValidating) && <LoadingSection />}
        </Box>
      </Stack>
    </Drawer>
  );
});
QuickViewDrawer.displayName = "QuickViewDrawer";
export default QuickViewDrawer;
