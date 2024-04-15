import EmptyLayout from "@/layouts/empty";
import axios from "axios";
import get from "lodash/get";
import { StorageKeys } from "@/constants/storage-keys";
import { ProductsSort } from "@/constants/products";
import { API_URL } from "@/constants";
import Landing from "@/partials/page/landing-page";
import LandingPageSeo from "@/partials/page/landing-page/seo";

const LandingPage = (props) => {
  return (
    <>
      <LandingPageSeo />
      <Landing {...props} />
    </>
  );
};

export async function getStaticProps({ req, query }) {
  const Client_key = get(req?.cookies, StorageKeys.ClientKey, "robot");

  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/products`,
      data: {
        client_key: Client_key,
      },
      params: {
        limit: 10,
        page: 1,
        sort: ProductsSort.SoldDesc.value,
      },
    });

    const brandsRes = await axios({
      method: "get",
      url: `${API_URL}/brands?limit=100`,
      data: {
        client_key: Client_key,
      },
    });

    const testimonialsRes = await axios({
      method: "get",
      url: `https://cms-retailer.pinggo.vn/wp-json/api/testimonials`,
    });

    return {
      props: {
        products: response?.data?.data,
        brands: brandsRes?.data?.data,
        testimonials: testimonialsRes?.data?.data,
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

LandingPage.Layout = EmptyLayout;

export default LandingPage;
