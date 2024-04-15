import { globalConfig } from "@/ultils/config";
import { Container, Stack, Typography, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { QuotationMarksSvg } from "public/icons";

const Blog = ({ testimonials, from = "Retailer" }) => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");
  return (
    <>
      <Stack bgcolor={"#FFFFFF"} py={{ xs: "30px", sm: "60px" }}>
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
                {from}
              </Typography>
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
              >
                <Typography
                  component={"span"}
                  variant={"body1"}
                  fontSize={{ xs: 30, sm: 30 }}
                  fontWeight={{ xs: 600, sm: 400 }}
                  textTransform={"uppercase"}
                  color={{ xs: "primary.main", sm: "#363636" }}
                >
                  Nói về
                </Typography>
                <Typography
                  component={"span"}
                  variant="h4"
                  fontSize={{ xs: 30, sm: 36 }}
                  fontWeight={{ xs: 600, sm: 900 }}
                  textTransform={"uppercase"}
                >
                  Pinggo
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                maxWidth={"md"}
                textAlign={"center"}
                display={{ xs: "none", sm: "block" }}
                fontWeight={300}
                fontSize={16}
              >
                Chia sẻ góp ý từ các {from} đã và đang sử dụng nền tảng PingGo
                như một kênh nguồn hàng uy tín
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Swiper
                slidesPerView={"auto"}
                centeredSlides={isOverSmScreen}
                spaceBetween={isOverSmScreen ? 50 : 30}
                pagination={{
                  clickable: true,
                }}
                loop={true}
                modules={[Pagination, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                className="custom-swiper-home-blog"
                initialSlide={3}
              >
                {testimonials?.map((testimonial) => (
                  <SwiperSlide key={testimonial?.id}>
                    {({ isActive }) => (
                      <Stack
                        bgcolor={
                          isActive ? "rgba(248, 7, 89, 0.10)" : "#F5F2ED"
                        }
                        width={"100%"}
                        height={"100%"}
                        sx={{
                          opacity: isActive ? 1 : 0.4,
                        }}
                        px={"28px"}
                        py={"25px"}
                        textAlign={"left"}
                        borderRadius={"10px"}
                      >
                        <Stack width={68} height={72}>
                          <Image src={QuotationMarksSvg} alt="QuotationMarks" />
                        </Stack>
                        <Typography
                          paragraph
                          fontWeight={500}
                          fontSize={16}
                          sx={{
                            display: "-webkit-box",
                            " -webkit-line-clamp": 6,
                            " -webkit-box-orient": "vertical",
                            overflow: "hidden",
                          }}
                          mb={3}
                        >
                          {testimonial?.content}
                        </Typography>
                        <Typography fontWeight={500} fontSize={12} mb={1}>
                          {testimonial.title}
                        </Typography>
                        <Typography fontWeight={500} fontSize={10}>
                          {testimonial.retailer}
                        </Typography>
                      </Stack>
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

export default Blog;
