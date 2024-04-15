import { NextSeo } from "next-seo";

export default function RegisterSeo() {
  return (
    <NextSeo
      title="Đăng ký"
      description="Đăng ký tài khoản của bạn trên Pinggo"
      canonical="https://pinggo.vn"
      openGraph={{
        url: "https://pinggo.vn",
        title: "Đăng ký",
        description: "Đăng ký tài khoản của bạn trên Pinggo",
        images: [
          {
            url: "/pinggo-og.jpg",
            width: 800,
            height: 800,
            alt: "Đăng nhập",
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
}
