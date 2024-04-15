import { NextSeo } from "next-seo";

const ProductsSeo = () => {
  return (
    <NextSeo
      title="Danh sách sản phẩm"
      description="Danh sách sản phẩm trên Pinggo"
      canonical="https://retailer.pinggo.vn"
      openGraph={{
        url: "https://retailer.pinggo.vn",
        title: "Danh sách sản phẩm",
        description: "Danh sách sản phẩm trên Pinggo",
        images: [
          {
            url: "/pinggo-og.jpg",
            width: 800,
            height: 800,
            alt: "Danh sách sản phẩm",
            type: "image/jpeg",
          },
        ],
        siteName: "PingGo Retailer",
      }}
      twitter={{
        handle: "@pinggo",
        site: "@pinggo",
        cardType: "summary_large_image",
      }}
    />
  );
};
export default ProductsSeo;
