import React, { useImperativeHandle, useState } from "react";
import SimpleProduct from "./Simple";
import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import first from "lodash/first";
import PinggoImage from "../PinggoImage";

const ConfigurableProduct = React.forwardRef(({ variants }, ref) => {
  const [selectedVariant, setSelectedVariant] = useState(
    variants?.length > 0 ? first(variants) : null
  );

  useImperativeHandle(ref, () => ({
    getSelectedVariant: () => {
      return selectedVariant;
    },
  }));

  return (
    <React.Fragment>
      <Typography component={"span"} variant="pSmall" color={"#363636"}>
        Loại:
      </Typography>
      <Typography
        component={"span"}
        variant="body2"
        color={"primary"}
        fontWeight={"600"}
        ml={"4px"}
      >
        {selectedVariant?.product?.name}
      </Typography>
      <Stack direction={"row"} gap={2} flexWrap={"wrap"} my={"16px"}>
        {variants?.map((item) => (
          <Tooltip
            title={item?.product?.name}
            key={item?.variant_id}
            placement="top"
          >
            <Stack
              objectFit="cover"
              width={"50px"}
              height={"50px"}
              borderRadius="8px"
              sx={{
                "& img": {
                  borderRadius: "6px",
                },
              }}
              onClick={() => setSelectedVariant?.(item)}
              className="boxHover"
              {...(selectedVariant?.variant_id === item?.variant_id
                ? { border: "1px solid #F80759" }
                : {})}
            >
              <PinggoImage
                src={first(item?.product?.images)?.large_image_url}
                cover
                alt={"Product Image"}
              />
            </Stack>
          </Tooltip>
        ))}
      </Stack>
      <SimpleProduct product={selectedVariant?.product} />
    </React.Fragment>
  );
});

ConfigurableProduct.displayName = "ConfigurableProduct";

export default ConfigurableProduct;
