import CheckoutLayout from "@/layouts/checkout";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CheckoutInfo from "@/partials/page/application/checkout/checkoutInfo";
import CartInfo from "@/partials/page/application/checkout/cartInfo";
import axios from "axios";
import { StorageKeys } from "@/constants/storage-keys";
import { API_URL } from "@/constants";
import { get } from "lodash";

const CheckoutPage = () => {
  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 5 },
        flexShrink: 0,
        borderRadius: 2,
        boxShadow: "none",
      }}
    >
      <Grid container spacing={3}>
        <CheckoutInfo />
        <CartInfo />
      </Grid>
    </Paper>
  );
};
CheckoutPage.Layout = CheckoutLayout;

export async function getServerSideProps({ req }) {
  const Client_key = get(req?.cookies, StorageKeys.ClientKey, "robot");
  const token = get(req?.cookies, StorageKeys.Token, "");

  try {
    const response = await axios({
      method: "get",
      url: `${API_URL}/cart`,
      data: {
        client_key: Client_key,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.data?.data?.total_item === 0) {
      return {
        redirect: {
          destination: "/products",
          permanent: false,
        },
      };
    }
    return {
      props: {
        notFound: true,
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

export default CheckoutPage;
