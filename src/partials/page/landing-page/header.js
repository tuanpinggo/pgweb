import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { globalConfig } from "@/ultils/config";
import LandingPageAppImage from "public/landing-page.png";
import GooglePlayAvailableImage from "public/GooglePlay-Available.svg";
import AppStoreAvailableImage from "public/AppStore-Available.svg";

import Image from "next/image";
import Wave from "./Wave";
import { useRouter } from "next/router";
import CustomAppbar from "./CustomAppbar";

const DesktopLayout = () => {
  const router = useRouter();

  return (
    <Container
      maxWidth={globalConfig.containerMaxWidth}
      sx={{
        mt: "125px",
        position: "relative",
      }}
    >
      <Stack
        sx={{
          position: "absolute",
          zIndex: 8,
          width: "100%",
          left: 0,
          top: 0,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          position={"absolute"}
          spacing={5}
          p={{
            xs: 2,
            sm: 3,
          }}
        >
          <Stack spacing={2} pt={10}>
            <Typography
              variant="h1"
              color={"#FFFFFF"}
              fontSize={42}
              fontWeight={500}
              textTransform={"uppercase"}
              lineHeight={1}
            >
              Pinggo
            </Typography>
            <Typography
              variant="h3"
              color={"#FFFFFF"}
              fontSize={22}
              fontWeight={300}
              lineHeight={1}
            >
              The first social distribution platform
            </Typography>
            <Typography
              variant="body1"
              color={"#FFFFFF"}
              fontSize={16}
              fontWeight={300}
              lineHeight={1.5}
              pr={5}
              py={2}
              textAlign={"justify"}
            >
              With the mission of speeding up the flows of goods in the economy
              through the use of cutting-edge technology and big data, PingGo
              aims to become the first social distribution platform in Vietnam,
              pioneering to help brands, manufacturers and distributors
              distribute their goods in a faster, more convenient and
              cost-effective way, through our Pingger community and Retailer
              network.
            </Typography>
            <Stack direction={"row"} spacing={"30px"}>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #FFFFFF",
                  width: "153px",
                  height: "47px",
                }}
                onClick={() =>
                  router.push(
                    `https://apps.apple.com/us/app/pinggo-retailer/id6446276126`
                  )
                }
              >
                <Image
                  src={AppStoreAvailableImage}
                  width={121}
                  height={35}
                  alt="AppStore"
                />
              </Button>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #FFFFFF",
                  width: "172px",
                  height: "47px",
                }}
                onClick={() =>
                  router.push(
                    `https://play.google.com/store/apps/details?id=vn.pinggo.retailer&hl=en_US`
                  )
                }
              >
                <Image
                  src={GooglePlayAvailableImage}
                  width={140}
                  height={35}
                  alt="GooglePlay"
                />
              </Button>
            </Stack>
          </Stack>
          <Box
            sx={{
              width: "350px",
              flexShrink: 0,
              "& img": {
                width: "100%",
                height: "auto",
              },
            }}
          >
            <Image
              src={LandingPageAppImage}
              width={1000}
              height={1420}
              alt="Landing Page App"
            />
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

const MobileLayout = () => {
  const router = useRouter();

  return (
    <>
      <Container
        maxWidth={globalConfig.containerMaxWidth}
        sx={{
          position: "absolute",
          top: 75,
          zIndex: 4,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"center"}
          sx={{
            maxWidth: 200,
            m: "auto",
            "& img": {
              width: "100%",
              height: "auto",
            },
          }}
        >
          <Image
            src={LandingPageAppImage}
            width={500}
            height={710}
            alt="Landing Page App"
          />
        </Stack>
      </Container>
      <Container
        maxWidth={globalConfig.containerMaxWidth}
        sx={{
          mt: "100px",
          position: "relative",
        }}
      >
        <Stack spacing={2} justifyContent={"center"}>
          <Typography
            variant="h1"
            fontSize={30}
            fontWeight={500}
            textTransform={"uppercase"}
            lineHeight={1}
          >
            Pinggo
          </Typography>
          <Typography
            variant="body1"
            fontSize={16}
            fontWeight={300}
            textTransform={"uppercase"}
            lineHeight={1}
          >
            The first social distribution platform
          </Typography>
          <Typography
            variant="body1"
            fontSize={14}
            fontWeight={300}
            textAlign={"justify"}
          >
            With the mission of speeding up the flows of goods in the economy
            through the use of cutting-edge technology and big data, PingGo aims
            to become the first social distribution platform in Vietnam,
            pioneering to help brands, manufacturers and distributors distribute
            their goods in a faster, more convenient and cost-effective way,
            through our Pingger community and Retailer network.
          </Typography>
          <Stack direction={"row"} spacing={2} mt={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#363636",
                width: "135px",
                height: "42px",
              }}
              onClick={() =>
                router.push(
                  `https://apps.apple.com/us/app/pinggo-retailer/id6446276126`
                )
              }
            >
              <Image
                src={AppStoreAvailableImage}
                width={103}
                height={30}
                alt="AppStore"
                onClick={() =>
                  router.push(
                    `https://apps.apple.com/us/app/pinggo-retailer/id6446276126`
                  )
                }
              />
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#363636",
                width: "137px",
                height: "42px",
              }}
              onClick={() =>
                router.push(
                  `https://play.google.com/store/apps/details?id=vn.pinggo.retailer&hl=en_US`
                )
              }
            >
              <Image
                src={GooglePlayAvailableImage}
                width={105}
                height={30}
                alt="GooglePlay"
              />
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

const Header = () => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  return (
    <React.Fragment>
      <Stack
        width="100vw"
        id="#back-to-top-anchor"
        sx={{
          aspectRatio: { xs: "12/9", lg: "unset" },
          background:
            "linear-gradient(116deg, #F80759 -0.47%, #1D96D2 108.15%)",
          position: "relative",
          height: {
            lg: "100vh",
          },
        }}
      >
        <CustomAppbar />

        {isOverSmScreen && <DesktopLayout />}
        <Wave />
      </Stack>
      {!isOverSmScreen && <MobileLayout />}
    </React.Fragment>
  );
};

export default Header;
