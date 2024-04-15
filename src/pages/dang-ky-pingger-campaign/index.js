import { Stack } from "@mui/material";
import { NextSeo } from "next-seo";
import EmptyLayout from "@/layouts/empty";
// import DefaultFooter from "@/partials/footer/default";
import BackToTop from "@/components/ui/BackToTop";
import React from "react";
import CustomAppbar from "@/partials/page/landing-page/CustomAppbar";
import CampaignForm from "@/partials/page/campaign/form";

const PinggerCampaign = () => {
  return (
    <>
      <NextSeo
        title="Chiến dịch đăng ký Pingger"
        description="Chiến dịch đăng ký Pingger"
        canonical="https://pinggo.vn/dang-ky-pingger-campaign"
        openGraph={{
          url: "https://pinggo.vn/dang-ky-pingger-campaign",
          title: "Chiến dịch đăng ký Pingger",
          description: "Chiến dịch đăng ký Pingger",
          images: [
            {
              url: "/pinggo-og.jpg",
              width: 800,
              height: 800,
              alt: "Chiến dịch đăng ký Pingger",
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
          minHeight={"100vh"}
          id="#back-to-top-anchor"
          sx={{
            background:
              "linear-gradient(116.65deg, #1D96D2 0.24%, #DA1A5D 99.27%)",
            position: "relative",
          }}
        >
          <CustomAppbar />
          <CampaignForm />
        </Stack>

        <BackToTop />
    </>
  );
};

PinggerCampaign.Layout = EmptyLayout;

export default PinggerCampaign;
