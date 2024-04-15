import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Input from "../Controlled/Input";
import values from "lodash/values";
import { OrderLogistic } from "@/constants/orders";

const ShippingDialog = forwardRef((props, ref) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  const { handleSubmit, control } = useForm({
    defaultValues: {
      ship_code: "",
      logistic_id: 1,
    },
  });
  const [showShipCode, setShowShipCode] = useState(false);

  const onSubmit = async (values) => {
    props?.handleSubmit(values);
    handleClose();
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Lựa chọn phương thức vận chuyển
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Controller
            render={({ field }) => (
              <RadioGroup
                aria-label="address"
                {...field}
                onChange={(event) => {
                  field.onChange(event?.target?.value);

                  if (
                    Number(event?.target?.value) ===
                    Number(OrderLogistic.shippingUnit.value)
                  ) {
                    setShowShipCode(true);
                  }
                }}
              >
                {values(OrderLogistic).map(({ label, value }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="pSmall">{label}</Typography>
                      </Box>
                    }
                    sx={{
                      my: "8px",
                    }}
                  />
                ))}
              </RadioGroup>
            )}
            name="logistic_id"
            control={control}
          />
          {showShipCode && (
            <Input
              control={control}
              name={"ship_code"}
              label={"Link kiểm tra vận đơn"}
              placeholder={"Vui lòng nhập link kiểm tra vận đơn"}
              id="ship_code"
              size="small"
              fullWidth
            />
          )}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="contained"
            sx={{
              textTransform: "none",
              m: "4px",
            }}
            loading={props?.loading}
            type="submit"
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
      </form>
    </Dialog>
  );
});

ShippingDialog.displayName = "ShippingDialog";

export default ShippingDialog;
