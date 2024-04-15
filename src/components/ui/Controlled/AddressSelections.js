import Grid from "@mui/material/Unstable_Grid2";
import Select from "./Select";
import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useAddresses } from "@/hooks/useAddresses";

const AddressSelections = forwardRef(
  (
    { defaultData, control, disabled, selectContainerProps, selectProps },
    ref
  ) => {
    const {
      regions,
      isRegionLoading,
      setSelectedRegion,
      districts,
      isDistrictLoading,
      setSelectedDistrict,
      wards,
      isWardLoading,
      setSelectedWard,
      currentAddressDetails,
    } = useAddresses();

    useEffect(() => {
      if (!!defaultData?.region?.id) {
        setSelectedRegion(defaultData?.region?.id);
      }
      if (!!defaultData?.district?.id) {
        setSelectedDistrict(defaultData?.district?.id);
      }
    }, [
      defaultData?.region?.id,
      defaultData?.district?.id,
      setSelectedDistrict,
      setSelectedRegion,
    ]);

    useImperativeHandle(ref, () => ({
      getAddressDetail: () => currentAddressDetails,
    }));

    return (
      <React.Fragment>
        <Grid xs={12} sm={4} {...selectContainerProps}>
          <Select
            control={control}
            label="Tỉnh / thành phố"
            id="region"
            name="region_id"
            onChange={(value) => {
              setSelectedRegion(value);
              setSelectedDistrict("");
            }}
            formControlProps={{
              sx: {
                width: "100%",
              },
            }}
            options={regions?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            loading={isRegionLoading}
            disabled={disabled}
            defaultValue={defaultData?.region?.id}
            {...selectProps}
          />
        </Grid>
        <Grid xs={12} sm={4} {...selectContainerProps}>
          <Select
            control={control}
            label="Quận / huyện"
            id="district"
            name="district_id"
            options={districts?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            onChange={(value) => {
              setSelectedDistrict(value);
              setSelectedWard("");
            }}
            formControlProps={{
              sx: {
                width: "100%",
              },
            }}
            loading={isDistrictLoading}
            disabled={disabled}
            defaultValue={defaultData?.district?.id}
            {...selectProps}
          />
        </Grid>
        <Grid xs={12} sm={4} {...selectContainerProps}>
          <Select
            options={wards?.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
            control={control}
            label="Phường / xã"
            id="ward"
            name="ward_id"
            formControlProps={{
              sx: {
                width: "100%",
              },
            }}
            disabled={disabled}
            defaultValue={defaultData?.ward?.id}
            loading={isWardLoading}
            onChange={(value) => {
              setSelectedWard(value);
            }}
            {...selectProps}
          />
        </Grid>
      </React.Fragment>
    );
  }
);

AddressSelections.displayName = "AddressSelections";

export default AddressSelections;
