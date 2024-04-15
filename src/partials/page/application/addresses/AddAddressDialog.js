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
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { toast } from "@/components/toast";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const AddAddressDialog = () => {
  const { mutate, addNewAddress, isAddNewAddressMutating } = useAddresses();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = async (data) => {
    await addNewAddress(data, {
      onSuccess: async () => {
        await mutate();
        toast({
          type: "success",
          message: <Box>Địa chỉ đã được thêm mới thành công</Box>,
        });
        handleClose();
      },
    });
  };

  return (
    <React.Fragment>
      <LoadingButton
        variant="contained"
        onClick={handleOpen}
        loading={isAddNewAddressMutating}
        startIcon={<AddOutlinedIcon sx={{ cursor: "pointer" }} />}
        loadingPosition="start"
        sx={{
          textTransform: "none",
          width: "fit-content",
        }}
      >
        Thêm mới
      </LoadingButton>
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
              Thêm địa chỉ
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
            isLoading={isAddNewAddressMutating}
            submitText="Thêm mới"
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
export default AddAddressDialog;
