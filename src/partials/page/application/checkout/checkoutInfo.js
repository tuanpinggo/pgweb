import { Stack } from "@mui/material";
import React, { useMemo, useState } from "react";
import useCart from "@/hooks/useCart";
import { useAddresses } from "@/hooks/useAddresses";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { PaymentMethod } from "@/constants/payment-methods";
import Grid from "@mui/material/Unstable_Grid2";
import useCheckout from "@/hooks/useCheckout";
import BankingInfo from "@/components/ui/Orders/BankingInfo";
import ShippingAddress from "./ShippingAddress";
import Payment from "./Payment";
import CartDetail from "./CartDetail";
import { CartLogistic } from "@/constants/orders";

const CheckoutInfo = () => {
  const router = useRouter();

  const {
    cart,
    refetchCart,
    isLoading: isCartLoading,
    isValidating: isCartValidating,
  } = useCart();

  const { checkout, isCheckoutMutating, bankAccount, code, setCode } =
    useCheckout();

  const { control, handleSubmit, watch, resetField } = useForm({
    defaultValues: {
      address_id: "",
      note: "",
      payment_method: PaymentMethod.COD,
      shipping_type: CartLogistic.shippingUnit.id,
    },
  });

  const { addresses } = useAddresses();

  const [ordered, setOrdered] = useState(false);

  const onSubmitCheckout = async (values) => {
    await checkout(
      {
        ...values,
        address_id: !!values?.address_id
          ? values?.address_id
          : addresses?.[0]?.id,
        note: !!values?.note ? values?.note : "Không có note",
      },
      {
        onSuccess: async (res) => {
          setOrdered(true);
          if (values.payment_method === PaymentMethod.BankTransfer) {
            setCode(res?.data?.code);
          }
        },
      }
    );
  };

  const watchAddress = watch("address_id");
  const watchPaymentMethod = watch("payment_method");
  const watchShippingType = watch("shipping_type");

  const selectedAddress = useMemo(() => {
    if (watchAddress) {
      return addresses?.find((item) => item.id === Number(watchAddress));
    }
    return addresses?.[0];
  }, [addresses, watchAddress]);

  const handleRedirect = async () => {
    await refetchCart();
    if (PaymentMethod.BankTransfer === watchPaymentMethod) {
      setCode(null);
    }
    router.push("/orders");
  };

  return (
    <Grid item xs={12} md={6}>
      <Stack spacing={2}>
        <ShippingAddress
          {...{
            ordered,
            selectedAddress,
            control,
            resetField,
            watchShippingType,
            weight: cart?.reduce(
              (sum, current) =>
                sum +
                Number(current?.product?.weight2 || 0) *
                  Number(current?.qty || 0),
              0
            ),
          }}
        />

        {ordered && PaymentMethod.BankTransfer === watchPaymentMethod ? (
          <BankingInfo
            bankAccount={bankAccount}
            code={code}
            containerProps={{
              direction: "column",
            }}
          />
        ) : (
          <Payment {...{ control, watchPaymentMethod }} />
        )}

        <CartDetail {...{ control, ordered }} />
        {ordered ? (
          <LoadingButton
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "none",
            }}
            fullWidth
            loading={isCartLoading || isCartValidating}
            onClick={handleRedirect}
          >
            Quản lý đơn nhập hàng
          </LoadingButton>
        ) : (
          <LoadingButton
            variant="contained"
            sx={{
              mt: 2,
              textTransform: "none",
            }}
            type="submit"
            loading={isCheckoutMutating}
            fullWidth
            onClick={handleSubmit(onSubmitCheckout)}
          >
            Tạo đơn nhập hàng
          </LoadingButton>
        )}
      </Stack>
    </Grid>
  );
};

export default CheckoutInfo;
