import { Stack, Typography } from "@mui/material";
import EditAddressDialog from "./EditAddressDialog";
import RemoveAddressDialog from "./RemoveAddressDialog";

const AddressItem = ({ address }) => {
  return (
    <Stack
      p={{ xs: 1, sm: 2 }}
      borderRadius={1.5}
      spacing={1.5}
      className="boxHover"
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontWeight={500} fontSize={14} lineHeight={"20px"}>
          {address?.name} - {address?.phone}
        </Typography>
        <Stack direction={"row"} spacing={1}>
          <EditAddressDialog address={address} />
          <RemoveAddressDialog address={address} />
        </Stack>
      </Stack>
      <Typography
        fontWeight={400}
        fontSize={14}
        lineHeight={"20px"}
        maxWidth={"lg"}
      >
        {address?.full_address}
      </Typography>
    </Stack>
  );
};

export default AddressItem;
