import useCart from "@/hooks/useCart";
import {
  Divider,
  Paper,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { OrderSvg, NoteSvg } from "public/icons";
import { Controller } from "react-hook-form";
import { NumericFormat } from "react-number-format";

const CartDetail = ({ control, ordered }) => {
  const { cartAmount, cartGrandTotal, cartShippingAmount, cartDiscount } =
    useCart();
  return (
    <>
      <Stack
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #eee" }}
        p={2}
        borderRadius={2}
        className="boxHover"
        spacing={1}
      >
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Image
            src={OrderSvg}
            height={26}
            width={26}
            alt="Credit card icons"
          />
          <Typography variant="body2" fontWeight={600}>
            Chi tiết đơn nhập hàng
          </Typography>
        </Stack>
        <Divider sx={{ my: "16px !important" }} flexItem />

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Tổng tiền hàng
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cartAmount}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Phí giao hàng
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cartShippingAmount}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
        <Divider sx={{ my: "16px !important" }} flexItem />

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Tạm tính
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cartGrandTotal}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Giảm giá
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            -
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cartDiscount}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            Tổng tiền phải thanh toán
          </Typography>
          <Typography
            fontSize={14}
            fontWeight={500}
            lineHeight={"20px"}
            color={"primary"}
          >
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={cartGrandTotal}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
      </Stack>
      <Stack
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #eee" }}
        p={2}
        borderRadius={2}
        className="boxHover"
      >
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          <Image src={NoteSvg} height={26} width={26} alt="Credit card icons" />
          <Typography variant="body2" fontWeight={600}>
            Ghi chú dành cho đơn hàng
          </Typography>
        </Stack>
        <Divider sx={{ my: "16px" }} />
        <Controller
          render={({ field }) => (
            <TextareaAutosize
              {...field}
              minRows={3}
              placeholder="Ghi chú cho đơn hàng"
              style={{
                padding: "8px",
                width: "100%",
                resize: "vertical",
              }}
              disabled={ordered}
            />
          )}
          name="note"
          control={control}
        />
      </Stack>
    </>
  );
};

export default CartDetail;
