import EmptyLayout from "@/layouts/empty";
import { globalConfig } from "@/ultils/config";
import { Container, Stack, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Image from "next/image";
import React from "react";

import DefaultFooter from "@/partials/footer/default";
import { CartRedSvg, BoxRedSvg, MoneyRedSvg, GiftRedSvg } from "public/icons";
import BenefitImage from "public/benefit.svg";
import CustomAppbar from "@/partials/page/landing-page/CustomAppbar";
import InstallApp from "@/partials/page/landing-page/InstallApp";
import axios from "axios";
import Blog from "@/partials/page/landing-page/Blog";

const StaticPage = ({ testimonials }) => {
  return (
    <React.Fragment>
      <NextSeo
        title="PingGo | The first social distribution platform"
        description="Pinggo | #1 SOCIAL DISTRIBUTION PLATFORM"
        canonical="https://pinggo.vn"
        openGraph={{
          url: "https://pinggo.vn",
          title: "PingGo | The first social distribution platform",
          description: "Pinggo | #1 SOCIAL DISTRIBUTION PLATFORM",
          images: [
            {
              url: "/pinggo-og.jpg",
              width: 800,
              height: 800,
              alt: "Pinggo",
              type: "image/jpeg",
            },
          ],
          siteName: "PingGo",
        }}
        twitter={{
          handle: "@pinggo",
          site: "@pinggo",
          cardType: "summary_large_image",
        }}
      />
      <Stack
        width="100vw"
        id="#back-to-top-anchor"
        sx={{
          aspectRatio: { xs: "12/9", lg: "unset" },
          background:
            "linear-gradient(116deg, #F80759 -0.47%, #1D96D2 108.15%)",
          position: "relative",
          minHeight: {
            lg: "100vh",
          },
          py: "120px",
        }}
      >
        <CustomAppbar />
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
                fontSize={28}
                fontWeight={400}
                textTransform={"uppercase"}
                display={{ xs: "none", sm: "block" }}
                color={"#FFFFFF"}
              >
                Lợi ích khi trở thành
              </Typography>
              <Typography
                component={"span"}
                variant="body1"
                fontSize={20}
                fontWeight={400}
                textTransform={"uppercase"}
                display={{ xs: "block", sm: "none" }}
                color={"#FFFFFF"}
              >
                Lợi ích khi trở thành
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
                  fontSize={30}
                  fontWeight={{ xs: 600, sm: 900 }}
                  textTransform={"uppercase"}
                  color={"#FFFFFF"}
                >
                  Retailer
                </Typography>
                <Typography
                  component={"span"}
                  variant={"body1"}
                  fontSize={{ xs: 30, sm: 28 }}
                  fontWeight={{ xs: 600, sm: 400 }}
                  textTransform={"uppercase"}
                  color={"#FFFFFF"}
                >
                  Của
                </Typography>
                <Typography
                  component={"span"}
                  variant="h4"
                  fontSize={{ xs: 30, sm: 30 }}
                  fontWeight={{ xs: 600, sm: 900 }}
                  textTransform={"uppercase"}
                  color={"#FFFFFF"}
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
                maxWidth={"sm"}
                textAlign={"center"}
                display={{ xs: "none", sm: "block" }}
                fontWeight={300}
                fontSize={16}
                color={"#FFFFFF"}
              >
                Đăng ký trở thành Retailer của PingGo ngay hôm nay để tận hưởng
                vô vàn các lợi ích từ cộng đồng nguồn hàng hàng đầu Việt Nam
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", sm: "space-between" }}
              spacing={{ sm: 2 }}
            >
              <Stack
                order={{ xs: 2, sm: 1 }}
                justifyContent={"space-around"}
                flex={1}
              >
                <Stack
                  spacing={{ xs: 2, sm: 1 }}
                  py="20px"
                  direction={{ xs: "row", sm: "column" }}
                >
                  <Image src={CartRedSvg} alt="Cart" width={40} height={40} />
                  <Stack spacing={1}>
                    <Typography
                      variant="h4"
                      fontSize={16}
                      fontWeight={600}
                      color={"#FFFFFF"}
                    >
                      Nguồn hàng đa dạng - 100% Chính hãng
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      fontWeight={300}
                      color={"#FFFFFF"}
                    >
                      PingGo cung cấp nguồn hàng đa dạng, 100% chính hãng từ Âu,
                      Mỹ, Hàn, Nhật, Úc,...
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  spacing={{ xs: 2, sm: 1 }}
                  py="20px"
                  direction={{ xs: "row", sm: "column" }}
                >
                  <Image src={BoxRedSvg} alt="Box" width={40} height={40} />
                  <Stack spacing={1}>
                    <Typography
                      variant="h4"
                      fontSize={16}
                      fontWeight={600}
                      color={"#FFFFFF"}
                    >
                      Mô hình đầu tiên và duy nhất ở Việt Nam giúp người nhập
                      hàng nhận đơn hàng và khách hàng mới
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      fontWeight={300}
                      color={"#FFFFFF"}
                    >
                      PingGo đẩy đơn hàng cho các retailer nhận đơn và giải
                      quyết 1 phần đầu ra hàng hóa cho retailer
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                sx={{
                  objectFit: "cover",
                  my: 1,
                }}
                width={{ sx: "auto", sm: "400px" }}
                order={{ xs: 1, sm: 2 }}
                flexShrink={0}
              >
                <Image
                  src={BenefitImage}
                  width={800}
                  height={1100}
                  alt="Pinggo Models"
                  style={{ width: "100%", height: "auto" }}
                />
              </Stack>
              <Stack order={3} justifyContent={"space-around"} flex={1}>
                <Stack
                  spacing={{ xs: 2, sm: 1 }}
                  py="20px"
                  direction={{ xs: "row", sm: "column" }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Image
                      src={MoneyRedSvg}
                      alt="Cart"
                      width={40}
                      height={40}
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography
                      variant="h4"
                      fontSize={16}
                      fontWeight={600}
                      textAlign={{ xs: "left", sm: "right" }}
                      color={"#FFFFFF"}
                    >
                      Chính sách giá cạnh tranh hấp dẫn
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      fontWeight={300}
                      textAlign={{ xs: "left", sm: "right" }}
                      color={"#FFFFFF"}
                    >
                      PingGo dành cho bạn mức giá tốt nhất, cạnh tranh so với
                      thị trường với nguồn hàng trực tiếp từ nhà cung cấp
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  spacing={{ xs: 2, sm: 1 }}
                  py="20px"
                  direction={{ xs: "row", sm: "column" }}
                >
                  <Stack
                    direction={"row"}
                    justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                  >
                    <Image src={GiftRedSvg} alt="Box" width={40} height={40} />
                  </Stack>
                  <Stack spacing={1}>
                    <Typography
                      variant="h4"
                      fontSize={16}
                      fontWeight={600}
                      textAlign={{ xs: "left", sm: "right" }}
                      color={"#FFFFFF"}
                    >
                      Các chương trình khuyến mại, ưu đãi hấp dẫn cho người bán
                    </Typography>
                    <Typography
                      variant="body1"
                      fontSize={14}
                      fontWeight={300}
                      textAlign={{ xs: "left", sm: "right" }}
                      color={"#FFFFFF"}
                    >
                      PingGo liên tục tung ra các chương trình khuyến mại nhập
                      hàng - bán hàng, ưu đãi từ nhãn hàng, chính sách loyalty
                      cho người bán thỏa sức tận hưởng
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Blog testimonials={testimonials} />
      <InstallApp />
      <DefaultFooter forceShow={true} />
    </React.Fragment>
  );
};

export async function getStaticProps({ req, query }) {
  try {
    const testimonialsRes = await axios({
      method: "get",
      url: `https://cms-retailer.pinggo.vn/wp-json/api/testimonials`,
    });

    return {
      props: {
        testimonials: testimonialsRes?.data?.data?.filter(
          (item) => item?.source === "retailer"
        ),
      },
      revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
}

StaticPage.Layout = EmptyLayout;

export default StaticPage;
