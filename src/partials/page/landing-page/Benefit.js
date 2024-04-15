import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import BenefitImage from "public/benefit.svg";
import Image from "next/image";
import { CartRedSvg, BoxRedSvg, MoneyRedSvg, GiftRedSvg } from "public/icons";
import { globalConfig } from "@/ultils/config";

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

const Benefit = () => {
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
    <Stack
      bgcolor={{ xs: "#FFFFFF", sm: "#F8F8F8" }}
      py={{ xs: "30px", sm: "60px" }}
    >
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
              fontSize={30}
              fontWeight={400}
              textTransform={"uppercase"}
              display={{ xs: "none", sm: "block" }}
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
                fontSize={{ xs: 30, sm: 30 }}
                fontWeight={{ xs: 600, sm: 900 }}
                textTransform={"uppercase"}
              >
                Retailer
              </Typography>
              <Typography
                component={"span"}
                variant={"body1"}
                fontSize={{ xs: 30, sm: 30 }}
                fontWeight={{ xs: 600, sm: 400 }}
                textTransform={"uppercase"}
                color={{ xs: "primary.main", sm: "#363636" }}
              >
                Của
              </Typography>
              <Typography
                component={"span"}
                variant="h4"
                fontSize={{ xs: 30, sm: 30 }}
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
              maxWidth={"sm"}
              textAlign={"center"}
              display={{ xs: "none", sm: "block" }}
              fontWeight={300}
              fontSize={16}
            >
              Đăng ký trở thành Retailer của PingGo ngay hôm nay để tận hưởng vô
              vàn các lợi ích từ cộng đồng nguồn hàng hàng đầu Việt Nam
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
                  <Typography variant="h4" fontSize={16} fontWeight={600}>
                    Nguồn hàng đa dạng - 100% Chính hãng
                  </Typography>
                  <Typography variant="body1" fontSize={14} fontWeight={300}>
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
                  <Typography variant="h4" fontSize={16} fontWeight={600}>
                    Mô hình đầu tiên và duy nhất ở Việt Nam giúp người nhập hàng
                    nhận đơn hàng và khách hàng mới
                  </Typography>
                  <Typography variant="body1" fontSize={14} fontWeight={300}>
                    PingGo đẩy đơn hàng cho các retailer nhận đơn và giải quyết
                    1 phần đầu ra hàng hóa cho retailer
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
                  <Image src={MoneyRedSvg} alt="Cart" width={40} height={40} />
                </Stack>
                <Stack spacing={1}>
                  <Typography
                    variant="h4"
                    fontSize={16}
                    fontWeight={600}
                    textAlign={{ xs: "left", sm: "right" }}
                  >
                    Chính sách giá cạnh tranh hấp dẫn
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={14}
                    fontWeight={300}
                    textAlign={{ xs: "left", sm: "right" }}
                  >
                    PingGo dành cho bạn mức giá tốt nhất, cạnh tranh so với thị
                    trường với nguồn hàng trực tiếp từ nhà cung cấp
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
                  >
                    Các chương trình khuyến mại, ưu đãi hấp dẫn cho người bán
                  </Typography>
                  <Typography
                    variant="body1"
                    fontSize={14}
                    fontWeight={300}
                    textAlign={{ xs: "left", sm: "right" }}
                  >
                    PingGo liên tục tung ra các chương trình khuyến mại nhập
                    hàng - bán hàng, ưu đãi từ nhãn hàng, chính sách loyalty cho
                    người bán thỏa sức tận hưởng
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Container>

      <Container maxWidth={globalConfig.containerMaxWidth} sx={{ mt: 4 }}>
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
              fontSize={30}
              fontWeight={400}
              textTransform={"uppercase"}
              display={{ xs: "none", sm: "block" }}
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
                fontSize={{ xs: 30, sm: 30 }}
                fontWeight={{ xs: 600, sm: 900 }}
                textTransform={"uppercase"}
              >
                PingGer
              </Typography>
              <Typography
                component={"span"}
                variant={"body1"}
                fontSize={{ xs: 30, sm: 30 }}
                fontWeight={{ xs: 600, sm: 400 }}
                textTransform={{ sm: "uppercase" }}
                color={"#363636"}
              >
                nhận được từ
              </Typography>
              <Typography
                component={"span"}
                variant="h4"
                fontSize={{ xs: 30, sm: 30 }}
                fontWeight={{ xs: 600, sm: 900 }}
                textTransform={"uppercase"}
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
            >
              <Typography
                component={"span"}
                fontWeight={500}
                fontSize={16}
                color={"primary"}
              >
                PingGer
              </Typography>{" "}
              - Cộng đồng cộng tác viên bán hàng trên nền tảng PingGo.
            </Typography>
            <Typography
              maxWidth={"md"}
              textAlign={"center"}
              display={{ xs: "none", sm: "block" }}
              fontWeight={300}
              fontSize={16}
            >
              Trở thành đối tác bán hàng của PingGo,{" "}
              <Typography
                component={"span"}
                fontWeight={500}
                fontSize={16}
                color={"primary"}
              >
                PingGer
              </Typography>{" "}
              mang trong mình sứ mệnh đặc biệt, ngoài việc gia tăng thu nhập cá
              nhân trong thời gian rảnh rỗi,{" "}
              <Typography
                component={"span"}
                fontWeight={500}
                fontSize={16}
                color={"primary"}
              >
                PingGer
              </Typography>{" "}
              còn giúp khách hàng có thể lựa chọn được những sản phẩm từ nhãn
              hàng uy tín, phù hợp với nhu cầu của khách hàng, giúp trải nghiệm
              mua sắm trở nên tuyệt vời nhất.
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
                  <Item {...item} />
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
                    titleProps={{ textAlign: { xs: "left", sm: "right" } }}
                    descriptionProps={{
                      textAlign: { xs: "left", sm: "right" },
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
  );
};

export default Benefit;
