import { globalConfig } from "@/ultils/config";
import {
  Box,
  Container,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import FacebookPng from "public/facebook.svg";
import ZaloPng from "public/zalo.svg";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhonePausedOutlinedIcon from "@mui/icons-material/PhonePausedOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { StaticPages } from "@/constants/static-pages";

const ItemLink = ({ slug, title, containerProps, onClick, isLast }) => {
  return (
    <Link href={`/static/${slug}` || "/"}>
      <Box
        sx={{ display: "flex", alignItems: "center", ...containerProps }}
        onClick={() => onClick?.()}
      >
        <Typography
          variant="pSmall"
          fontSize={15}
          fontWeight={500}
          sx={{
            ":hover": {
              color: "#1d72b1",
            },
          }}
        >
          {title}
        </Typography>
      </Box>
      {!isLast && (
        <Divider
          flexItem
          sx={{
            my: "8px",
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        />
      )}
    </Link>
  );
};

export default function DefaultFooter({
  forceShow = false,
  onClick,
  showPolicy = true,
}) {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");
  if (!isOverSmScreen && !forceShow) return null;
  return (
    <Stack
      width="100vw"
      bgcolor="white.main"
      component="footer"
      borderTop="1px solid #DDDDDD"
    >
      <Container maxWidth={globalConfig.containerMaxWidth}>
        <Grid
          container
          spacing={{ sm: 0, md: 10 }}
          sx={{
            py: forceShow ? "16px" : "30px",
          }}
        >
          <Grid xs={12} sm={8} spacing={5}>
            <Stack>
              <Typography
                variant="h4"
                fontSize={{ xs: 20, sm: 26 }}
                fontWeight={600}
                textTransform={"uppercase"}
              >
                Pinggo
              </Typography>
            </Stack>

            <Stack
              mt={3}
              spacing={2}
              borderTop={{ xs: "1px solid #888", sm: "none" }}
              py={{ xs: 2, sm: 0 }}
            >
              <Typography
                variant="body1"
                fontWeight={600}
                textTransform={"uppercase"}
                fontSize={{ xs: 14, sm: 16 }}
              >
                CÔNG TY CỔ PHẦN PINGGO
              </Typography>
              <Stack direction={"row"} spacing={"20px"}>
                <LocationOnOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                <Typography
                  variant="body2"
                  fontSize={{ xs: 12, sm: 14 }}
                  fontWeight={300}
                >
                  Tầng 2, A1-A3 Tòa nhà Ecolife Capitol, Số 58 Tố Hữu, Nam Từ
                  Liêm, Hà Nội
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={"20px"} alignItems={"center"}>
                <PhonePausedOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                <Typography
                  variant="body2"
                  fontSize={{ xs: 12, sm: 14 }}
                  fontWeight={300}
                >
                  0369137866
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={"20px"} alignItems={"center"}>
                <EmailOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                <Typography
                  variant="body2"
                  fontSize={{ xs: 12, sm: 14 }}
                  fontWeight={300}
                >
                  cskh@pinggo.vn
                </Typography>
              </Stack>
              <Stack direction={"row"} spacing={"20px"}>
                <ArrowCircleRightOutlinedIcon
                  sx={{ fontSize: 18, color: "#555" }}
                />
                <Typography
                  variant="body2"
                  fontSize={{ xs: 12, sm: 14 }}
                  fontWeight={300}
                >
                  Giấy chứng nhận ĐKDN số: 0109813099 do Phòng đăng ký kinh
                  doanh – Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 18
                  tháng 01 năm 2022.
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={"row"}
              spacing={1.5}
              mt={5}
              display={{ xs: "none", sm: "block" }}
            >
              <Link
                href={"https://www.facebook.com/pinggo.vietnam"}
                passHref
                target="_blank"
              >
                <Image
                  src={FacebookPng}
                  alt="Facebook"
                  width={56}
                  height={56}
                />
              </Link>
              <Link
                href={"https://zalo.me/3827070183364884408"}
                passHref
                target="_blank"
              >
                <Image src={ZaloPng} alt="Zalo" width={56} height={56} />
              </Link>
            </Stack>
          </Grid>
          {showPolicy && (
            <Grid xs={12} sm={4}>
              <Stack spacing={{ sm: "20px" }} mt={2}>
                {StaticPages.map((link, index) => (
                  <React.Fragment key={link.title}>
                    <ItemLink
                      {...link}
                      onClick={onClick}
                      isLast={index === StaticPages?.length - 1}
                    />
                  </React.Fragment>
                ))}
              </Stack>
            </Grid>
          )}
        </Grid>
        <Divider />
      </Container>
      <Stack py={"25px"} bgcolor={"#FFF"}>
        <Container maxWidth={globalConfig.containerMaxWidth}>
          <Typography
            fontSize={13}
            fontWeight={500}
            textAlign={{
              xs: "center",
              sm: "left",
            }}
          >
            Copyright © 2023 by PINGGO. All rights reserved.
          </Typography>
        </Container>
      </Stack>
    </Stack>
  );
}
