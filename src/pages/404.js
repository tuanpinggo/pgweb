import { Stack, Typography } from "@mui/material";
import { NextSeo } from "next-seo";

export default function Custom404() {
  return (
    <>
      <NextSeo
        title="Nội dung không tồn tại"
        description="Nội dung không tồn tại"
        // canonical="https://pinggo.vn/home"
        // openGraph={{
        //   url: "https://pinggo.vn/home",
        //   title: "Trang chủ",
        //   description: "Trang chủ",
        //   images: [
        //     {
        //       url: "/pinggo-og.jpg",
        //       width: 800,
        //       height: 800,
        //       alt: "Trang chủ",
        //       type: "image/jpeg",
        //     },
        //   ],
        //   siteName: "PingGo",
        // }}
        // twitter={{
        //   handle: "@pinggo",
        //   site: "@pinggo",
        //   cardType: "summary_large_image",
        // }}
      />
      <Stack
        width="100%"
        minHeight={{ sm: "80vh" }}
        component={"main"}
        py={10}
        alignItems={"center"}
      >
        <Typography
          color={"primary"}
          fontSize={100}
          lineHeight={"100px"}
          fontWeight={800}
        >
          404
        </Typography>
        <Typography
          fontSize={{ xs: 30, sm: 40 }}
          lineHeight={"44px"}
          fontWeight={700}
          mt={4}
          textAlign={"center"}
        >
          Nội dung không tồn tại
        </Typography>
        <Typography
          fontSize={16}
          lineHeight={"26px"}
          fontWeight={400}
          maxWidth={"sm"}
          color={"#797979"}
          textAlign={"center"}
          mt={4}
        >
          Xin lỗi, Nội dung bạn đang tìm kiếm không tồn tại hoặc đã bị xóa bởi
          Admin.
        </Typography>
        <Typography
          fontSize={16}
          lineHeight={"26px"}
          fontWeight={400}
          maxWidth={"sm"}
          color={"#797979"}
          textAlign={"center"}
        >
          Vui lòng quay lại trang chủ hoặc liên hệ hỗ trợ để được trợ giúp
        </Typography>
      </Stack>
    </>
  );
}
