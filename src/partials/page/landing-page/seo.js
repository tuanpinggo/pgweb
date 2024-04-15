import { NextSeo } from "next-seo";

const LandingPageSeo = () => {
  return (
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
  );
};
export default LandingPageSeo;
