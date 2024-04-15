import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { forwardRef, useImperativeHandle, useState } from "react";
import styled from "@emotion/styled";
import AddressForm from "@/components/ui/Form/AddressForm";
import { useAddresses } from "@/hooks/useAddresses";
import Radios from "@/components/ui/Controlled/Radios";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ChangeAddressDialog = forwardRef(
  ({ addresses, selectedAddress, control }, ref) => {
    const [openModal, setOpenModal] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { mutate, addNewAddress, isAddNewAddressMutating } = useAddresses();

    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    useImperativeHandle(ref, () => ({
      handleOpen,
      handleClose,
    }));

    const onSubmit = async (data) => {
      await addNewAddress(data, {
        onSuccess: async () => {
          await mutate();
          setExpanded(false);
        },
      });
    };
    return (
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock
      >
        <DialogTitle id="alert-dialog-title">
          Thay đổi địa chỉ nhận hàng
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Radios
              name="address_id"
              control={control}
              options={addresses}
              getChecked={(item) => item?.id === selectedAddress.id}
              renderLabel={(item) => (
                <Stack spacing={0.5}>
                  <Typography
                    fontSize={14}
                    fontWeight={500}
                    lineHeight={"20px"}
                  >
                    {item.name}: {item.phone}
                  </Typography>
                  <Typography
                    fontSize={14}
                    fontWeight={400}
                    lineHeight={"20px"}
                    color={"#999999"}
                  >
                    {item.full_address}
                  </Typography>
                </Stack>
              )}
            />
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mb={1}
          >
            <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
              Thêm mới địa chỉ
            </Typography>
            <ExpandMore
              expand={expanded}
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Stack>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <AddressForm
              onSubmit={onSubmit}
              isLoading={isAddNewAddressMutating}
              submitText="Thêm mới"
            />
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="info"
            autoFocus
            onClick={handleClose}
            sx={{
              textTransform: "none",
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
);

ChangeAddressDialog.displayName = "ChangeAddressDialog";

export default ChangeAddressDialog;
