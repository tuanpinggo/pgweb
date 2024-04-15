import { NextSeo } from "next-seo";

export default function ForgotSeo() {
  return (
    <NextSeo
      title="Quên mật khẩu"
      description="Lấy lại mật khẩu tài khoản của bạn trên Pinggo"
      canonical="https://pinggo.vn"
      openGraph={{
        url: "https://pinggo.vn",
        title: "Quên mật khẩu",
        description: "Lấy lại mật khẩu tài khoản của bạn trên Pinggo",
        images: [
          {
            url: "/pinggo-og.jpg",
            width: 800,
            height: 800,
            alt: "Quên mật khẩu",
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
