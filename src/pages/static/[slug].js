import { StaticPages } from "@/constants/static-pages";
import { Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import { NextSeo } from "next-seo";

const StaticPage = ({ data, seo }) => {
  return (
    <>
      <NextSeo
        title={seo?.title}
        description={seo?.description}
        canonical="https://pinggo.vn"
        openGraph={{
          url: "https://pinggo.vn",
          title: seo?.title,
          description: seo?.description,
          images: [
            {
              url: "/pinggo-og.jpg",
              width: 800,
              height: 800,
              alt: seo?.title,
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
      <Stack spacing={1} minHeight={700}>
        <Paper
          sx={{
            padding: {
              xs: "16px",
              sm: "32px",
            },
          }}
          className="pageContent"
        >
          <Typography
            component={"div"}
            dangerouslySetInnerHTML={{ __html: data?.post_content }}
          />
        </Paper>
      </Stack>
    </>
  );
};

export async function getStaticPaths() {
  const paths = StaticPages.map((page) => ({
    params: { slug: page.slug },
  }));
  return {
    paths,
    fallback: true, // false or "blocking"
  };
}

export async function getStaticProps({ params }) {
  const req = await axios({
    method: "get",
    url: `https://cms-retailer.pinggo.vn/wp-json/api/static-page/${params?.slug}`,
  });
  const seo = StaticPages.find((page) => page.slug === params?.slug);
  return { props: { data: req?.data?.data, seo } };
}

export default StaticPage;
