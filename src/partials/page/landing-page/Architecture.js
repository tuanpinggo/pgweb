import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import PinggoModelImage from "public/pinggo-models.svg";

import Image from "next/image";
import { globalConfig } from "@/ultils/config";
import BrandList from "./brands";

const Architecture = ({ brands = [] }) => {
  return (
    <Container
      maxWidth={globalConfig.containerMaxWidth}
      sx={{
        my: "30px",
        py: "30px",
      }}
    >
      <Stack spacing={1} py={{ xs: 3, md: 5 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={{ xs: 0, md: 1 }}
        >
          <Typography
            component={"span"}
            variant="body1"
            fontSize={28}
            fontWeight={{ xs: 400, sm: 500 }}
            textTransform={"uppercase"}
            lineHeight={1}
          >
            Hợp tác cùng
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
          >
            <Typography
              component={"span"}
              variant="h4"
              fontSize={40}
              fontWeight={900}
              textTransform={"uppercase"}
            >
              100+
            </Typography>
            <Typography
              component={"span"}
              variant="body1"
              fontSize={30}
              fontWeight={600}
              textTransform={"uppercase"}
            >
              Nhãn hàng
            </Typography>
          </Stack>
        </Stack>

        <BrandList datas={brands} />
      </Stack>
      <Stack spacing={1} mt={5}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={{ xs: 0, md: 1 }}
        >
          <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
          >
            <Typography
              component={"span"}
              variant="body1"
              fontSize={{ xs: 24, sm: 30 }}
              fontWeight={{ xs: 400, sm: 500 }}
              textTransform={"uppercase"}
              lineHeight={1}
            >
              MÔ HÌNH
            </Typography>
          </Stack>

          <Typography
            component={"span"}
            variant="body1"
            fontSize={{ xs: 24, sm: 30 }}
            fontWeight={{ xs: 400, sm: 500 }}
            textTransform={"uppercase"}
          >
            SOCIAL DISTRIBUTION PLATFORM
          </Typography>
        </Stack>

        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            "& img": {
              width: "100%",
              height: "auto",
            },
          }}
        >
          <Image
            src={PinggoModelImage}
            alt="Pinggo Models"
            width={1440}
            height={560}
          />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Architecture;
