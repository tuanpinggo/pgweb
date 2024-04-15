import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const CancelDialog = forwardRef(({ handleConfirm, confirmLoading }, ref) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Bạn có muốn huỷ đơn hàng này không ?
      </DialogTitle>

      <DialogActions>
        <LoadingButton
          variant="contained"
          sx={{
            textTransform: "none",
            m: "4px",
          }}
          loading={confirmLoading}
          onClick={() => {
            handleConfirm?.();
            handleClose();
          }}
        >
          Đồng ý
        </LoadingButton>
        <Button
          variant="contained"
          color="info"
          autoFocus
          onClick={handleClose}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
});

CancelDialog.displayName = "CancelDialog";

export default CancelDialog;
