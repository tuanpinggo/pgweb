import React, { useEffect } from "react";
import Input from "@/components/ui/Controlled/Input";
import { useForm } from "react-hook-form";
import { InputAdornment, Stack, Typography } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateAccountInfoSchema } from "@/models/schema";
import AddressSelections from "@/components/ui/Controlled/AddressSelections";

const AccountInfoForm = () => {
  const { userData, updateAccountInfo, isUpdateInfoMutating } = useAuth();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      phone: "",
      name: "",
      region: "",
      district: "",
      ward: "",
    },
    resolver: yupResolver(updateAccountInfoSchema),
  });

  useEffect(() => {
    reset({
      ...userData,
    });
  }, [reset, userData]);

  const onSubmit = async (values) => {
    const req = {
      name: values?.name,
      region_id: values?.region_id,
      district_id: values?.district_id,
      ward_id: values?.ward_id,
    };
    await updateAccountInfo(req);
  };

  return (
    <Stack component={"form"} mt={3} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} mt={2}>
        <Input
          control={control}
          label={"Số điện thoại"}
          placeholder={"Số điện thoại"}
          id="phone"
          name="phone"
          disabled
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

        <Input
          control={control}
          label={"Họ tên"}
          placeholder={"Nhập họ tên"}
          id="name"
          name="name"
          fullWidth
          size="small"
        />

        <AddressSelections
          control={control}
          selectContainerProps={{ sm: 12, p: 0 }}
          defaultData={{
            region: {
              id: userData?.region_id,
            },
            district: {
              id: userData?.district_id,
            },
            ward: {
              id: userData?.ward_id,
            },
          }}
          selectProps={{
            size: "small",
            inputLabelProps: {
              size: "small",
            },
          }}
        />

        <LoadingButton
          variant="contained"
          sx={{
            color: "white",
          }}
          type="submit"
          loading={isUpdateInfoMutating}
          disabled={!isDirty}
        >
          <Typography
            textTransform={"initial"}
            variant="body1"
            color={"white !important"}
          >
            Cập nhật thông tin
          </Typography>
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default AccountInfoForm;
