import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination, Thumbs, Autoplay } from "swiper/modules";
import Link from "next/link";
import { ProductType } from "@/constants/products";
import { useForm } from "react-hook-form";
import NumericInput from "@/components/ui/Controlled/NumericInput";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LoadingButton } from "@mui/lab";
import PinggoImage from "@/components/ui/PinggoImage";
import useCart from "@/hooks/useCart";
import SimpleProduct from "@/components/ui/ProductType/Simple";
import ConfigurableProduct from "@/components/ui/ProductType/Configurable";
import { useWishList } from "@/hooks/useWishList";
import { useAuth } from "@/hooks/useAuth";
import { first, sortBy } from "lodash";

const ProductDetail = ({ product, isLogined, variants }) => {
  const {
    addToWishList,
    isFavorited,
    deleteWishlist,
    isAddToWishListMutating,
    isDeleteWishListsMutating,
  } = useWishList();
  const { userData } = useAuth();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const selectedVariantRef = useRef(null);
  const { addProduct, isAddProductMutating } = useCart();

  const { control, handleSubmit } = useForm({
    defaultValues: {
      qty:
        product?.price_list?.length > 0
          ? first(sortBy(product?.price_list, (item) => Number(item?.qty || 0)))
              ?.qty
          : 1,
    },
  });
  const onSubmit = async (values) => {
    const id =
      product?.type === ProductType.Simple
        ? product?.id
        : selectedVariantRef?.current?.getSelectedVariant()?.variant_id;
    await addProduct({ id, qty: values?.qty });
  };

  return (
    <React.Fragment>
      <Paper
        elevation={0}
        sx={{
          padding: {
            xs: 2,
            md: 4,
          },
          width: "100%",
        }}
      >
        <Grid container spacing={3}>
          <Grid xs={12} md={4}>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              spaceBetween={10}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
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
                    width={350}
                    height={350}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Pagination, Thumbs]}
              className="custom-swiper"
            >
              {product?.images?.map((image) => (
                <SwiperSlide
                  key={image?.large_image_url}
                  className="swiper-thumb-item"
                >
                  <PinggoImage
                    src={image?.large_image_url}
                    alt="Image"
                    width={80}
                    height={80}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
          <Grid xs={12} md={8}>
            <Stack
              px={{
                xs: 2,
                md: 4,
              }}
            >
              <Typography variant="h4" color={"#363636"}>
                {product?.name}
              </Typography>
              <Divider
                flexItem
                sx={{
                  my: 2,
                }}
              />
              {!!product?.short_description && (
                <>
                  <Typography
                    className="pageContent"
                    component={"div"}
                    dangerouslySetInnerHTML={{
                      __html: product?.short_description,
                    }}
                  />
                  <Divider
                    flexItem
                    sx={{
                      my: 2,
                    }}
                  />
                </>
              )}

              {!isLogined ? (
                <Link href={"/auth/login"}>
                  <Typography variant="h5" color={"#1d96d2"}>
                    Vui lòng đăng nhập để xem giá
                  </Typography>
                </Link>
              ) : (
                <Grid container spacing={3}>
                  <Grid xs={12} md={8}>
                    {product?.price !== 0 ? (
                      <>
                        {product?.type === ProductType.Simple && (
                          <SimpleProduct product={product} />
                        )}
                        {product?.type === ProductType.Configurable && (
                          <ConfigurableProduct
                            product={product}
                            variants={variants}
                            ref={selectedVariantRef}
                          />
                        )}
                        {!!product?.in_stock ? (
                          <>
                            <Typography
                              variant="body2"
                              fontWeight={"600 !important"}
                              mt={"16px"}
                            >
                              Số lượng
                            </Typography>
                            <Stack
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexDirection: "row",
                                flexWrap: "wrap",
                              }}
                            >
                              <NumericInput
                                name={"qty"}
                                type="number"
                                control={control}
                                containerProps={{
                                  p: "16px 0",
                                }}
                                min={
                                  product?.price_list?.length > 0
                                    ? first(
                                        sortBy(product?.price_list, (item) =>
                                          Number(item?.qty || 0)
                                        )
                                      )?.qty
                                    : 1
                                }
                              />
                              <LoadingButton
                                variant="contained"
                                color="primary"
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  minHeight: "40px",
                                  textTransform: "none",
                                }}
                                loading={isAddProductMutating}
                                onClick={handleSubmit(onSubmit)}
                              >
                                Thêm vào giỏ hàng
                              </LoadingButton>
                            </Stack>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              minHeight: "40px",
                              mt: "16px",
                              textTransform: "none",
                            }}
                            disabled
                          >
                            {product?.stock_label}
                          </Button>
                        )}
                      </>
                    ) : (
                      <Stack>
                        <Stack
                          direction={"row"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          mb={2}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={"500 !important"}
                          >
                            Liên hệ
                          </Typography>
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color={"primary"}
                          >
                            {!!userData?.admin?.name
                              ? userData?.admin?.name
                              : "Pinggo"}
                          </Typography>
                        </Stack>
                        <Link
                          href={
                            !!userData?.admin?.phone
                              ? `https://zalo.me/${userData?.admin?.phone}`
                              : "https://zalo.me/3827070183364884408"
                          }
                          passHref
                          target="_blank"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              minHeight: "40px",
                              textTransform: "none",
                            }}
                          >
                            Liên hệ nhận báo giá
                          </Button>
                        </Link>
                      </Stack>
                    )}
                  </Grid>
                  <Grid
                    xs={12}
                    md={4}
                    display={"flex"}
                    flexDirection={"column"}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"500  !important"}
                      mb={"16px"}
                    >
                      Thương hiệu
                    </Typography>
                    {!!product?.brand?.image ? (
                      <PinggoImage
                        src={product?.brand?.image}
                        alt="Brand Image"
                        width={150}
                        height={70}
                      />
                    ) : (
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        mb={"16px"}
                        color={"primary"}
                      >
                        {product?.brand?.name}
                      </Typography>
                    )}
                    <Typography
                      variant="body2"
                      fontWeight={"500 !important"}
                      mb={"16px"}
                    >
                      Danh mục sản phẩm
                    </Typography>
                    <Stack
                      display={"flex"}
                      flexDirection={"row"}
                      flexWrap={"wrap"}
                      gap={"10px"}
                    >
                      {product?.categories?.map((category, index) => (
                        <Typography
                          key={category?.name}
                          variant="pSmall"
                          color={"primary"}
                          fontWeight={"600"}
                        >
                          {category?.name}
                        </Typography>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              )}

              <Divider
                flexItem
                sx={{
                  my: "16px",
                }}
              />
              {isFavorited(product?.id) ? (
                <LoadingButton
                  sx={{
                    color: "#555555",
                    width: "fit-content",
                  }}
                  onClick={async () => {
                    await deleteWishlist(product.id);
                  }}
                  loading={isDeleteWishListsMutating}
                  startIcon={<FavoriteIcon sx={{ color: "#da1a5d" }} />}
                  loadingPosition="start"
                >
                  <Typography
                    variant="body1"
                    textTransform="initial"
                    color="#da1a5d"
                    fontWeight={"600 !important"}
                  >
                    Xóa khỏi danh sách yêu thích
                  </Typography>
                </LoadingButton>
              ) : (
                <LoadingButton
                  sx={{
                    color: "#555555",
                    width: "fit-content",
                  }}
                  onClick={async () => {
                    await addToWishList(product.id);
                  }}
                  loading={isAddToWishListMutating}
                  startIcon={<FavoriteBorderOutlined />}
                  loadingPosition="start"
                >
                  <Typography
                    variant="body1"
                    textTransform="initial"
                    fontWeight={"600 !important"}
                  >
                    Thêm vào sản phẩm yêu thích
                  </Typography>
                </LoadingButton>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          padding: {
            xs: "32px",
          },
          width: "100%",
        }}
        className="pageContent"
      >
        <Typography variant="h2" color={"#363636"}>
          Chi tiết sản phẩm
        </Typography>
        <Typography
          variant="h4"
          color={"#363636"}
          mt={2}
          textTransform={"uppercase"}
        >
          Công dụng:
        </Typography>
        <Typography
          component={"div"}
          className="product-content"
          dangerouslySetInnerHTML={{ __html: product?.description }}
        />
        {!!product?.user_guide && (
          <>
            <Typography
              variant="h4"
              color={"#363636"}
              mt={2}
              textTransform={"uppercase"}
            >
              Hướng dẫn sử dụng
            </Typography>
            <Typography
              component={"div"}
              className="product-content"
              dangerouslySetInnerHTML={{ __html: product?.user_guide }}
            />
          </>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default ProductDetail;
