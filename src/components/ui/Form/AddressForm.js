import Input from "@/components/ui/Controlled/Input";
import { addressesSchema } from "@/models/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { InputAdornment, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AddressSelections from "../Controlled/AddressSelections";

const AddressForm = ({
  data,
  onSubmit,
  submitText = "Thêm địa chỉ mới ",
  isLoading,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      phone: "",
      name: "",
      region_id: "",
      district_id: "",
      ward_id: "",
      address: "",
    },
    resolver: yupResolver(addressesSchema),
  });

  useEffect(() => {
    reset({
      phone: data?.phone,
      name: data?.name,
      address: data?.address,
      region_id: data?.region?.id,
      district_id: data?.district?.id,
      ward_id: data?.ward?.id,
    });
  }, [reset, data]);

  const standardizeData = async (values) => {
    onSubmit?.(values);
    reset({
      phone: "",
      name: "",
      region_id: "",
      district_id: "",
      ward_id: "",
      address: "",
    });
  };

  return (
    <form onSubmit={handleSubmit(standardizeData)}>
      <Stack spacing={"16px"}>
        <Input
          control={control}
          label={"Họ tên"}
          placeholder={"Nhập họ tên"}
          id="name"
          name="name"
          fullWidth
          size="small"
        />
        <Input
          control={control}
          label={"Số điện thoại"}
          placeholder={"Số điện thoại"}
          id="phone"
          name="phone"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="body2">+84</Typography>
                </Stack>
              </InputAdornment>
            ),
          }}
          fullWidth
          size="small"
        />
        <AddressSelections
          control={control}
          selectContainerProps={{ sm: 12, p: 0 }}
          selectProps={{
            size: "small",
            inputLabelProps: {
              size: "small",
            },
          }}
          defaultData={data}
        />
        <Input
          control={control}
          label={"Địa chỉ cụ thể"}
          placeholder={"VD: Số nhà / ngõ / đường"}
          id="address"
          name="address"
          fullWidth
          size="small"
        />
        <LoadingButton
          variant="contained"
          sx={{
            color: "white",
          }}
          type="submit"
          disabled={!isDirty}
          loading={isLoading}
        >
          <Typography
            textTransform={"initial"}
            variant="body1"
            color={"white !important"}
          >
            {submitText}
          </Typography>
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default AddressForm;
