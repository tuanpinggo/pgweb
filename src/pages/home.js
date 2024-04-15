import { Stack } from "@mui/material";
import { NextSeo } from "next-seo";
import Home from "@/partials/page/home";

const HomePage = () => {
  return (
    <>
      <NextSeo
        title="Trang chủ"
        description="Trang chủ"
        canonical="https://pinggo.vn/home"
        openGraph={{
          url: "https://pinggo.vn/home",
          title: "Trang chủ",
          description: "Trang chủ",
          images: [
            {
              url: "/pinggo-og.jpg",
              width: 800,
              height: 800,
              alt: "Trang chủ",
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
      <Stack width="100%" minHeight="100vh" component={"main"}>
        <Home />
      </Stack>
    </>
  );
};

export default HomePage;
