import PinggoImage from "@/components/ui/PinggoImage";
import { globalConfig } from "@/ultils/config";
import {
  Box,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { NumericFormat } from "react-number-format";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Link from "next/link";
import first from "lodash/first";

const DesktopLayout = ({ products }) => {
  return (
    <Grid container spacing={2}>
      {products?.map((product) => (
        <Grid md={3} lg={2.4} key={product?.id}>
          <Link href={`/products/${product?.slug}-i.${product?.id}`}>
            <Stack
              justifyContent="center"
              alignItems="center"
              height="100%"
              border="1px solid #eee"
              borderRadius={1.5}
              mb={1}
              className="boxHover"
            >
              <Stack
                bgcolor={"#FFFFFF"}
                width="100%"
                height={"100%"}
                borderRadius="5px"
              >
                <Stack
                  objectFit="cover"
                  width={"100%"}
                  maxHeight={"215px"}
                  minHeight={"215px"}
                  borderRadius="8px 8px 0 0"
                  sx={{
                    "& img": {
                      borderRadius: "5px 5px 0 0",
                    },
                  }}
                >
                  <PinggoImage
                    src={first(product?.images)?.original_image_url}
                    cover
                    alt={"Product Image"}
                  />
                </Stack>
                <Box px={1.5} py={2}>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    alignItems={{ xs: "flex-start", md: "center" }}
                    spacing={{ xs: 0, md: 1 }}
                  >
                    {product?.price === 0 ? (
                      <>
                        <Typography
                          component={"span"}
                          fontSize={14}
                          fontWeight={400}
                        >
                          Giá
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
                          fontSize={20}
                          lineHeight={"24px"}
                          fontWeight={600}
                          variant={"h6"}
                        >
                          <NumericFormat
                            thousandSeparator=","
                            decimalSeparator="."
                            value={product?.price}
                            displayType="text"
                            suffix={"đ"}
                          />
                        </Typography>
                      </>
                    )}
                  </Stack>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      " -webkit-line-clamp": 3,
                      " -webkit-box-orient": "vertical",
                      overflow: "hidden",
                    }}
                    fontWeight={400}
                    fontSize={14}
                    mt={1.5}
                  >
                    {product?.name}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

const MobileLayout = ({ products }) => {
  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={false}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="custom-swiper-home-blog"
        initialSlide={3}
      >
        {products?.map((product, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <Link
                href={`/products/${product?.slug}-i.${product?.id}`}
                style={{ height: "100%", width: "100%" }}
              >
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  height={"100%"}
                  border="1px solid #eee"
                  borderRadius={1.5}
                  className="boxHover"
                  sx={{
                    opacity: isActive ? 1 : 0.4,
                  }}
                  textAlign={"left"}
                >
                  <Stack
                    bgcolor={"#FFFFFF"}
                    width="100%"
                    height={"100%"}
                    borderRadius="5px"
                  >
                    <Stack
                      objectFit="cover"
                      width={"100%"}
                      maxHeight={"215px"}
                      minHeight={"215px"}
                      borderRadius="8px 8px 0 0"
                      sx={{
                        "& img": {
                          borderRadius: "5px 5px 0 0",
                        },
                      }}
                    >
                      <PinggoImage
                        src={product?.images?.[0]?.original_image_url}
                        cover
                        alt={"Product Image"}
                      />
                    </Stack>
                    <Box px={1.5} py={2}>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        alignItems={{ xs: "flex-start", md: "center" }}
                        spacing={{ xs: 0, md: 1 }}
                      >
                        <Typography
                          component={"span"}
                          fontSize={14}
                          fontWeight={400}
                        >
                          Giá chỉ từ
                        </Typography>
                        <Typography
                          component={"span"}
                          fontSize={20}
                          lineHeight={"24px"}
                          fontWeight={600}
                          variant={"h6"}
                        >
                          <NumericFormat
                            thousandSeparator=","
                            decimalSeparator="."
                            value={product?.price}
                            displayType="text"
                            suffix={"đ"}
                          />
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          display: "-webkit-box",
                          " -webkit-line-clamp": 3,
                          " -webkit-box-orient": "vertical",
                          overflow: "hidden",
                        }}
                        fontWeight={400}
                        fontSize={14}
                        mt={1.5}
                      >
                        {product?.name}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

const OutstandingProducts = ({ products = [] }) => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  return (
    <Stack bgcolor={"#F8F8F8"} py={{ xs: "30px", sm: "60px" }}>
      <Container maxWidth={globalConfig.containerMaxWidth}>
        <Stack spacing={"30px"}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
          >
            <Typography
              component={"span"}
              variant="body1"
              fontSize={{ xs: 20, sm: 30 }}
              fontWeight={400}
              textTransform={"uppercase"}
            >
              Sản phẩm nổi bật
            </Typography>

            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={1}
            >
              <Typography
                component={"span"}
                variant="h4"
                fontSize={{ xs: 30, sm: 30 }}
                fontWeight={{ xs: 600, sm: 900 }}
                textTransform={"uppercase"}
              >
                Pinggo
              </Typography>
              <Typography
                component={"span"}
                variant="h4"
                fontSize={{ xs: 30, sm: 30 }}
                fontWeight={{ xs: 600, sm: 900 }}
                textTransform={"uppercase"}
                display={{ xs: "block", sm: "none" }}
              >
                Phân phối
              </Typography>
            </Stack>
          </Stack>
          {isOverSmScreen ? (
            <DesktopLayout products={products} />
          ) : (
            <MobileLayout products={products} />
          )}
        </Stack>
      </Container>
    </Stack>
  );
};

export default OutstandingProducts;
