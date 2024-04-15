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

const Item = ({
  src,
  title,
  description,
  titleProps,
  iconProps,
  descriptionProps,
}) => {
  return (
    <Stack
      spacing={{ xs: 2, sm: 1 }}
      py="20px"
      direction={{ xs: "row", sm: "column" }}
    >
      <Stack direction={"row"} {...iconProps}>
        <Image src={src} alt="Box" width={40} height={40} />
      </Stack>
      <Stack spacing={1}>
        <Typography variant="h4" fontSize={16} fontWeight={600} {...titleProps}>
          {title}
        </Typography>
        <Typography
          variant="body1"
          fontSize={14}
          fontWeight={300}
          {...descriptionProps}
        >
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
};
const StaticPage = ({ testimonials }) => {
  const LeftItems = [
    {
      src: CartRedSvg,
      title: "Kinh doanh tự do không cần bỏ vốn",
      description:
        "Không cần phải tốn chi phí nhập hàng, thuê mặt bằng, thuê nhân viên, chi phí Marketing sản phẩm,... khi kinh doanh trên nền tảng PingGo.",
    },
    {
      src: BoxRedSvg,
      title: "Tận dụng thời gian rảnh gia tăng thu nhập",
      description:
        "PingGer có thể linh động thời gian khi làm việc, tranh thủ thời gian rảnh để tạo ra nguồn thu nhập mới.",
    },
    {
      src: CartRedSvg,
      title: "Hưởng mức hoa hồng cạnh tranh",
      description:
        "PingGo sở hữu nguồn hàng chính hãng lấy trực tiếp từ nhà cung cấp với giá tốt nên PingGer sẽ được hưởng mức hoa hồng cao nhất thị trường.",
    },
    {
      src: BoxRedSvg,
      title: "Sản phẩm đa dạng thuộc nhiều thương hiệu nổi tiếng",
      description:
        "Hàng ngàn sản phẩm trên PingGo đến từ các nhãn hàng nổi tiếng như Marvis, Banobagi, JMsolution, EtiaXil, Batiste,...",
    },
  ];

  const RightItems = [
    {
      src: GiftRedSvg,
      title: "Tạo dựng sự uy tín trong kinh doanh",
      description:
        "PingGo cung cấp nguồn sản phẩm chính hãng và chất lượng đến từ các thương hiệu nổi tiếng giúp PingGer tự tin khẳng định uy tín với khách hàng.",
    },

    {
      src: MoneyRedSvg,
      title: "Được đào tạo và hỗ trợ từ các chuyên gia",
      description:
        "Đội ngũ chuyên gia của PingGo sẽ đào tạo kiến thức chuyên môn và kỹ năng bán hàng giúp PingGer tăng tỉ lệ chốt đơn.",
    },
    {
      src: GiftRedSvg,
      title: "Có cơ hội trở thành KOC/KOL",
      description:
        "Nhận được sự tin tưởng từ đông đảo khách hàng thông qua hình thức kinh doanh Online trên PingGo, PingGer sẽ có cơ hội trở thành KOC/KOL trong tương lai.",
    },
    {
      src: MoneyRedSvg,
      title: "Định hướng sẵn nội dung thu hút khi Marketing sản phẩm",
      description:
        "Đội ngũ Content Marketing của PingGo sẽ xây dựng tuyến nội dung hấp dẫn giúp PingGer thu hút khách hàng.",
    },
  ];

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
                Lợi ích mà
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
                Lợi ích mà
              </Typography>
              <Stack
                direction={{ sm: "row" }}
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
                  PingGer
                </Typography>
                <Typography
                  component={"span"}
                  variant={"body1"}
                  fontSize={28}
                  fontWeight={400}
                  textTransform={{ sm: "uppercase" }}
                  color={"#FFFFFF"}
                >
                  nhận được từ
                </Typography>
                <Typography
                  component={"span"}
                  variant="h4"
                  fontSize={30}
                  fontWeight={{ xs: 600, sm: 900 }}
                  textTransform={"uppercase"}
                  color={"#FFFFFF"}
                >
                  Pinggo
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography
                maxWidth={"md"}
                textAlign={"center"}
                display={{ xs: "none", sm: "block" }}
                fontWeight={300}
                fontSize={16}
                color={"#FFFFFF"}
              >
                <Typography
                  component={"span"}
                  fontWeight={600}
                  fontSize={16}
                  color={"#FFFFFF"}
                >
                  PingGer
                </Typography>{" "}
                - Cộng đồng cộng tác viên bán hàng trên nền tảng PingGo
              </Typography>
              <Typography
                maxWidth={"md"}
                textAlign={"center"}
                display={{ xs: "none", sm: "block" }}
                fontWeight={300}
                fontSize={16}
                color={"#FFFFFF"}
              >
                Trở thành đối tác bán hàng của PingGo,{" "}
                <Typography
                  component={"span"}
                  fontWeight={600}
                  fontSize={16}
                  color={"#FFFFFF"}
                >
                  PingGer
                </Typography>{" "}
                mang trong mình sứ mệnh đặc biệt, ngoài việc gia tăng thu nhập
                cá nhân trong thời gian rảnh rỗi,{" "}
                <Typography
                  component={"span"}
                  fontWeight={600}
                  fontSize={16}
                  color={"#FFFFFF"}
                >
                  PingGer
                </Typography>{" "}
                còn giúp khách hàng có thể lựa chọn được những sản phẩm từ nhãn
                hàng uy tín, phù hợp với nhu cầu của khách hàng, giúp trải
                nghiệm mua sắm trở nên tuyệt vời nhất.
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "center", sm: "space-between" }}
              spacing={{ sm: 4 }}
            >
              <Stack
                order={{ xs: 2, sm: 1 }}
                justifyContent={"space-around"}
                flex={1}
              >
                {LeftItems?.map((item, index) => (
                  <React.Fragment key={item.title}>
                    <Item
                      {...item}
                      titleProps={{
                        color: "#FFFFFF",
                      }}
                      descriptionProps={{
                        color: "#FFFFFF",
                      }}
                    />
                  </React.Fragment>
                ))}
              </Stack>
              <Stack
                sx={{
                  objectFit: "cover",
                  my: 1,
                }}
                width={{ sx: "auto", sm: "400px" }}
                order={{ xs: 1, sm: 2 }}
                flexShrink={0}
                justifyContent={"center"}
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
                {RightItems.map((item) => (
                  <React.Fragment key={item.title}>
                    <Item
                      {...item}
                      titleProps={{
                        textAlign: { xs: "left", sm: "right" },
                        color: "#FFFFFF",
                      }}
                      descriptionProps={{
                        textAlign: { xs: "left", sm: "right" },
                        color: "#FFFFFF",
                      }}
                      iconProps={{
                        justifyContent: { xs: "flex-start", sm: "flex-end" },
                      }}
                    />
                  </React.Fragment>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
      <Blog testimonials={testimonials} from="Pingger" />
      <InstallApp
        appstoreLink="https://apps.apple.com/us/app/pinggo/id1524577625"
        googleplayLink="https://play.google.com/store/apps/details?id=vn.pinggo"
        appName="Pinggo"
      />
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
          (item) => item?.source === "seller"
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
