import axiosClient from "@/api-client/axiosClient";
import { toast } from "@/components/toast";
import { Box } from "@mui/material";
import { useMemo, useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useAddresses() {
  const {
    data: addresses,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(`/addresses`, {
    dedupingInterval: 1000 * 60 * 60 * 24,
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateIfStale: false,
  });

  const { trigger: addNewAddress, isMutating: isAddNewAddressMutating } =
    useSWRMutation(
      "/addresses",
      (url, { arg: body }) => {
        return axiosClient.post(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          toast({
            type: "success",
            message: <Box>Địa chỉ mới dã được thêm vào danh sách</Box>,
          });
          await mutate();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );
  const { trigger: updateAddress, isMutating: isUpdateAddressMutating } =
    useSWRMutation(
      "/addresses",
      (url, { arg: body }) => {
        return axiosClient.put(url, body);
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          await mutate();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );
  const { trigger: deleteAddress, isMutating: isDeleteAddressMutating } =
    useSWRMutation(
      "/addresses",
      (url, { arg: body }) => {
        return axiosClient.delete(url, { data: body });
      },
      {
        throwOnError: false,
        onSuccess: async () => {
          await mutate();
        },
        onError: async (error) => {
          toast({
            type: "error",
            message: <Box>{error?.response?.data?.message}</Box>,
          });
        },
      }
    );
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const {
    data: regions,
    isLoading: isRegionsLoading,
    isValidating: isRegionsValidating,
  } = useSWR("/public/region?limit=100", {
    dedupingInterval: 1000 * 60 * 60,
    throwOnError: false,
  });

  const {
    data: districts,
    isLoading: isDistrictLoading,
    isValidating: isDistrictValidating,
  } = useSWR(
    !!selectedRegion ? ["/public/district", selectedRegion] : null,
    async ([url, selectedRegion]) => {
      return await axiosClient.get(
        `${url}?limit=100&region_id=${selectedRegion}`
      );
    },
    {
      dedupingInterval: 1000 * 60 * 60,
      throwOnError: false,
    }
  );

  const {
    data: wards,
    isLoading: isWardLoading,
    isValidating: isWardValidating,
  } = useSWR(
    !!selectedDistrict ? ["/public/ward", selectedDistrict] : null,
    async ([url, selectedDistrict]) => {
      return await axiosClient.get(
        `${url}?limit=100&district_id=${selectedDistrict}`
      );
    },
    {
      dedupingInterval: 1000 * 60 * 60,
      throwOnError: false,
    }
  );
  const currentAddressDetails = useMemo(() => {
    const currentRegion = regions?.data?.find(
      (item) => item?.id === selectedRegion
    );
    const currentDistrict = districts?.data?.find(
      (item) => item?.id === selectedDistrict
    );
    const currentWard = wards?.data?.find((item) => item?.id === selectedWard);

    return {
      currentRegion,
      currentDistrict,
      currentWard,
    };
  }, [
    regions?.data,
    districts?.data,
    wards?.data,
    selectedRegion,
    selectedDistrict,
    selectedWard,
  ]);
  return {
    addresses: addresses?.data,
    isLoading: isLoading || isValidating,
    mutate,
    addNewAddress,
    isAddNewAddressMutating,
    deleteAddress,
    isDeleteAddressMutating,
    updateAddress,
    isUpdateAddressMutating,
    regions: regions?.data,
    districts: districts?.data,
    wards: wards?.data,
    isRegionLoading: isRegionsLoading || isRegionsValidating,
    isDistrictLoading: isDistrictLoading || isDistrictValidating,
    isWardLoading: isWardLoading || isWardValidating,
    selectedRegion,
    setSelectedRegion,
    selectedDistrict,
    setSelectedDistrict,
    selectedWard,
    setSelectedWard,
    currentAddressDetails,
  };
}
