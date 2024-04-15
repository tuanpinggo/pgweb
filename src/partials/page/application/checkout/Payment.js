import Radios from "@/components/ui/Controlled/Radios";
import {
  PaymentMethod,
  PaymentMethodTranslation,
} from "@/constants/payment-methods";
import { Divider, Paper, Stack, Typography } from "@mui/material";
import values from "lodash/values";
import Image from "next/image";
import { CreditCardSvg } from "public/icons";

const Payment = ({ control, watchPaymentMethod }) => {
  return (
    <Stack
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid #eee" }}
      p={2}
      borderRadius={2}
      className="boxHover"
    >
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Image
          src={CreditCardSvg}
          height={26}
          width={26}
          alt="Credit card icons"
        />
        <Typography variant="body2" fontWeight={600}>
          Phương thức thanh toán
        </Typography>
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Radios
        name="payment_method"
        control={control}
        options={values(PaymentMethod).map((item) => ({
          label: PaymentMethodTranslation[item],
          id: item,
        }))}
        getChecked={(item) => item.id === watchPaymentMethod}
        renderLabel={(item) => (
          <Stack spacing={0.5} m={0}>
            <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
              {item.label}
            </Typography>
          </Stack>
        )}
        sx={{
          my: 0,
        }}
      />
    </Stack>
  );
};

export default Payment;
