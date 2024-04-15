import { StorageKeys } from "@/constants/storage-keys";
import { PER_PAGE, ProductsSort } from "@/constants/products";
import Products from "@/partials/page/products";
import { Stack, Typography } from "@mui/material";
import axios from "axios";
import get from "lodash/get";
import ProductsSeo from "@/partials/page/application/products/seo";
import { API_URL } from "@/constants";

const ProductsPage = (props) => {
  return (
    <>
      <ProductsSeo />
      <Stack spacing={1} minHeight={700}>
        <Products {...props} />
      </Stack>
    </>
  );
};
export async function getServerSideProps({ req, query }) {
  const Client_key = get(req?.cookies, StorageKeys.ClientKey, "robot");
  const token = get(req?.cookies, StorageKeys.Token, "");

  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/products`,
      data: {
        client_key: Client_key,
      },
      params: {
        limit: PER_PAGE,
        page: 1,
        sort: ProductsSort.SoldDesc.value,
        keyword: query?.keyword,
      },
    });

    return {
      props: {
        defaultData: response?.data,
        isLogined: !!token,
      },
    };
  } catch (e) {
    return {
      props: {
        notFound: true,
      },
    };
  }
}

export default ProductsPage;
