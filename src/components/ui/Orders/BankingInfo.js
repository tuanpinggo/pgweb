import { Divider, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { CreditCardSvg } from "public/icons";

const BankingInfo = ({ bankAccount, code, containerProps }) => {
  return (
    <Stack
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid #eee" }}
      p={{ xs: 1, sm: 2 }}
      borderRadius={2}
    >
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        direction={"row"}
      >
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Image src={CreditCardSvg} width={26} height={26} alt="logo" />
          <Typography fontSize={14} fontWeight={600}>
            Thông tin thanh toán
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Stack
        direction={{ sm: "row" }}
        spacing={1}
        justifyContent={"space-between"}
        {...containerProps}
      >
        <Stack spacing={1}>
          <Typography fontWeight={400} fontSize={13} variant="body2">
            Tên ngân hàng :
            <Typography
              component={"span"}
              variant="body2"
              fontWeight={500}
              fontSize={13}
              ml={1}
            >
              {bankAccount?.name}
            </Typography>
          </Typography>
          <Typography fontWeight={400} fontSize={13} variant="body2">
            Số tài khoản :
            <Typography
              component={"span"}
              variant="body2"
              fontWeight={500}
              fontSize={13}
              color={"primary"}
              ml={1}
            >
              {bankAccount?.bankNumber}
            </Typography>
          </Typography>
          <Typography fontWeight={400} fontSize={13} variant="body2">
            Chủ tài khoản :
            <Typography
              component={"span"}
              variant="body2"
              fontWeight={500}
              fontSize={13}
              ml={1}
            >
              {bankAccount?.accountHolder}
            </Typography>
          </Typography>
          <Typography fontWeight={400} fontSize={13} variant="body2">
            Nội dung chuyển khoản :
          </Typography>
          <Typography
            component={"span"}
            variant="body2"
            fontWeight={500}
            fontSize={13}
          >
            Thanh toán đơn hàng {code}
          </Typography>
        </Stack>
        <Stack flexShrink={1}>
          <Image
            src={bankAccount?.linkQR}
            width={200}
            height={200}
            alt={"QR chuyển khoản"}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BankingInfo;
