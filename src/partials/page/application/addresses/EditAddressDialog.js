import { useAddresses } from "@/hooks/useAddresses";
import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  Typography,
  DialogTitle,
  Stack,
  DialogContent,
  Box,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import AddressForm from "@/components/ui/Form/AddressForm";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "@/components/toast";

const EditAddressDialog = ({ address }) => {
  const { mutate, updateAddress, isUpdateAddressMutating } = useAddresses();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    await updateAddress(
      { id: address?.id, ...data },
      {
        onSuccess: async () => {
          await mutate();
          toast({
            type: "success",
            message: <Box>Địa chỉ đã được cập nhật thành công</Box>,
          });
          handleClose();
        },
      }
    );
  };

  return (
    <React.Fragment>
      <LoadingButton
        variant="text"
        onClick={handleOpen}
        loading={isUpdateAddressMutating}
        startIcon={<EditOutlinedIcon sx={{ cursor: "pointer" }} />}
        loadingPosition="start"
        color="info"
        sx={{
          width: "36px",
          height: "36px",
          minWidth: "36px",
          maxWidth: "36px",
          borderRadius: "100%",
          ".MuiButton-startIcon": {
            margin: 0,
          },
          ".MuiLoadingButton-loadingIndicator": {
            left: 0,
          },
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableScrollLock
        maxWidth={"sm"}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{ pb: "0px !important" }}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Sửa địa chỉ
            </Typography>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClose}
              color="inherit"
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ pt: "20px !important" }}>
          <AddressForm
            onSubmit={onSubmit}
            isLoading={isUpdateAddressMutating}
            submitText="Cập nhật"
            data={{
              phone: address?.phone,
              name: address?.name,
              address: address?.address,
              region: {
                id: address?.region_id,
              },
              district: {
                id: address?.district_id,
              },
              ward: {
                id: address?.ward_id,
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default EditAddressDialog;
