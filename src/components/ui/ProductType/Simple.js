import React from "react";
import { Typography, Stack, Divider, useTheme } from "@mui/material";
import sortBy from "lodash/sortBy";
import { NumericFormat } from "react-number-format";

const SimpleProduct = ({ product, quickView = false }) => {
  const theme = useTheme();
  if (product?.price_list?.length > 0) {
    const price_list = sortBy(product?.price_list, (item) =>
      Number(item?.qty || 0)
    );

    return (
      <Stack justifyContent={"center"} direction={"column"}>
        <Stack
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
          direction={"row"}
        >
          <Typography variant="body2" fontWeight={"600 !important"}>
            {quickView ? "Số lượng" : "Số lượng tối thiểu"}
          </Typography>
          <Typography variant="body2" fontWeight={"600  !important"}>
            {quickView ? "Đơn giá" : "Giá bán"}
          </Typography>
        </Stack>
        {price_list.map((item, index) => (
          <React.Fragment key={index}>
            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="body2" fontWeight={"500 !important"}>
                ≥ {item.qty}
              </Typography>
              <Typography variant="body2">
                <NumericFormat
                  thousandSeparator=","
                  decimalSeparator="."
                  value={item?.price}
                  displayType="text"
                  suffix={" đ"}
                  style={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  }}
                />
              </Typography>
            </Stack>
            {index !== product?.price_list?.length - 1 && (
              <Divider
                sx={{
                  my: "8px",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Stack>
    );
  }
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      mb={2}
    >
      <Typography variant="body2" fontWeight={"500 !important"}>
        Giá cơ bản
      </Typography>
      <Typography
        fontSize={14}
        lineHeight={"20px"}
        color={"primary"}
        fontWeight={600}
      >
        {product?.price > 0 ? (
          <NumericFormat
            thousandSeparator=","
            decimalSeparator="."
            value={product?.price}
            displayType="text"
            suffix={" đ"}
          />
        ) : (
          "Liên hệ"
        )}
      </Typography>
    </Stack>
  );
};

export default SimpleProduct;
