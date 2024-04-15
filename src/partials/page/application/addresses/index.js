import React from "react";
import { useAddresses } from "@/hooks/useAddresses";
import AddAddressDialog from "./AddAddressDialog";
import { Stack } from "@mui/system";
import { Divider, Typography } from "@mui/material";
import LoadingSection from "@/components/loading/loadingSection";
import AddressItem from "./AddressItem";
import EmptyData from "@/components/ui/EmptyData";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";

const Addresseses = () => {
  const { addresses, isLoading } = useAddresses();

  return (
    <React.Fragment>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Typography variant="h4">Danh sách địa chỉ</Typography>
        <AddAddressDialog />
      </Stack>
      {isLoading && <LoadingSection />}
      {!isLoading && addresses?.length === 0 && (
        <EmptyData
          title={"Danh sách địa chỉ trống"}
          icon={<ImportContactsOutlinedIcon color="primary" fontSize="large" />}
        />
      )}
      {addresses?.length > 0 &&
        !isLoading &&
        addresses?.map((address, index) => (
          <React.Fragment key={address?.id}>
            <AddressItem address={address} />
            {index !== addresses?.length - 1 && (
              <Divider
                flexItem
                sx={{
                  my: 1,
                }}
              />
            )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Addresseses;
