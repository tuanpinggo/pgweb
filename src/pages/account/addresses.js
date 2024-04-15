import AccountLayout from "@/layouts/account";
import Addresseses from "@/partials/page/application/addresses";
import AddressesSeo from "@/partials/page/application/addresses/seo";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const AddressesPage = () => {
  return (
    <Stack p={{ xs: 0, sm: "20px" }}>
      <AddressesSeo />
      <Addresseses />
    </Stack>
  );
};

AddressesPage.Layout = AccountLayout;

export default AddressesPage;
