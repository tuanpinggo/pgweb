import {
  Button,
  Collapse,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { LocationSvg } from "public/icons";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LoadingSection from "@/components/loading/loadingSection";
import { useAddresses } from "@/hooks/useAddresses";
import ChangeAddressDialog from "./ChangeAddressDialog";
import { useEffect, useMemo, useRef } from "react";
import useCart from "@/hooks/useCart";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { CartLogistic, UrbanShippingCode } from "@/constants/orders";
import Radios from "@/components/ui/Controlled/Radios";
import { values } from "lodash";

const ShippingAddress = ({
  selectedAddress,
  ordered,
  control,
  resetField,
  watchShippingType,
  weight = 0,
}) => {
  const { addresses, isAddNewAddressMutating, addNewAddress, isLoading } =
    useAddresses();

  const { updateShipping } = useCart();

  const ChangeAddressDialogRef = useRef();

  useEffect(() => {
    const handleUpdateShipping = async () => {
      await updateShipping({
        district_id: selectedAddress?.district_id,
        ward_id: selectedAddress?.ward_id,
        shipping_type: CartLogistic.shippingUnit.id,
        weight: weight,
      });
    };
    if (!!selectedAddress && weight > 0) {
      handleUpdateShipping();
    }
  }, [selectedAddress, updateShipping, weight]);

  const showShippingType = useMemo(
    () => !UrbanShippingCode.includes(selectedAddress?.district_id),
    [selectedAddress?.district_id]
  );

  const handleChangeType = async (value) => {
    await updateShipping({
      district_id: selectedAddress?.district_id,
      ward_id: selectedAddress?.ward_id,
      shipping_type: Number(value),
      weight: weight,
    });
  };

  return (
    <>
      <Stack
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #eee" }}
        p={2}
        borderRadius={2}
        className="boxHover"
      >
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          direction={"row"}
        >
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Image src={LocationSvg} width={26} height={26} alt="logo" />
            <Typography variant="body2" fontSize={14} fontWeight={600}>
              Địa chỉ nhận hàng
            </Typography>
          </Stack>
          <Button
            variant="outlined"
            startIcon={<EditOutlinedIcon sx={{ cursor: "pointer" }} />}
            loadingPosition="start"
            sx={{
              textTransform: "none",
              width: "fit-content",
            }}
            size="small"
            color="info"
            onClick={() => ChangeAddressDialogRef.current?.handleOpen()}
            disabled={ordered}
          >
            Thay đổi
          </Button>
        </Stack>
        <Divider sx={{ my: 2 }} />
        {isLoading ? (
          <LoadingSection />
        ) : (
          <Stack spacing={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
                {selectedAddress?.name}
              </Typography>
              <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
                {selectedAddress?.phone}
              </Typography>
            </Stack>
            <Typography
              fontSize={14}
              fontWeight={400}
              lineHeight={"20px"}
              color={"#999999"}
            >
              {selectedAddress?.full_address}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Collapse in={showShippingType}>
        <Stack
          component={Paper}
          elevation={0}
          sx={{ border: "1px solid #eee" }}
          p={2}
          borderRadius={2}
          className="boxHover"
        >
          <Stack alignItems={"center"} direction={"row"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <LocalShippingOutlinedIcon sx={{ color: "primary.main" }} />
              <Typography variant="body2" fontSize={14} fontWeight={600}>
                Phương thức giao hàng
              </Typography>
            </Stack>
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Radios
            name="shipping_type"
            control={control}
            options={values(CartLogistic)}
            getChecked={(item) => item.id === Number(watchShippingType)}
            renderLabel={(item) => (
              <Stack spacing={0.5} m={0} p={0.5}>
                <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
                  {item.label}
                </Typography>
                <Typography fontSize={12} fontWeight={300} lineHeight={"20px"}>
                  {item.description}
                </Typography>
              </Stack>
            )}
            sx={{
              my: 0,
            }}
            onChange={handleChangeType}
          />
        </Stack>
      </Collapse>
      <ChangeAddressDialog
        ref={ChangeAddressDialogRef}
        {...{
          addresses,
          isAddNewAddressMutating,
          addNewAddress,
          isLoading,
          selectedAddress,
          control,
          resetField,
        }}
        // onClose={handleUpdateShipping}
      />
    </>
  );
};

export default ShippingAddress;
