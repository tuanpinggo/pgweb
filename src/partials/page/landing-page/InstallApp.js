import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import GooglePlayAvailableImage from "public/GooglePlay-Available.svg";
import AppStoreAvailableImage from "public/AppStore-Available.svg";
import { globalConfig } from "@/ultils/config";
import { useRouter } from "next/router";

const InstallApp = ({
  containerProps,
  appstoreLink = "https://apps.apple.com/us/app/pinggo-retailer/id6446276126",
  googleplayLink = "https://play.google.com/store/apps/details?id=vn.pinggo.retailer&hl=en_US",
  appName = "PingGo Retailer",
  ...otherProps
}) => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");
  const router = useRouter();
  return (
    <Container maxWidth={globalConfig.containerMaxWidth}>
      <Stack
        my={5}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent={{ xs: "center", sm: "space-between" }}
        px={{ xs: "12px", sm: 10 }}
        direction={{ sm: "row" }}
        spacing={{ xs: 2, sm: 15 }}
        sx={{
          background:
            "linear-gradient(116deg, #F80759 -0.47%, #1D96D2 108.15%)",
          position: "relative",
          height: { sm: "300px", xs: "180px" },
          borderRadius: {
            xs: "10px",
            sm: "20px",
          },
        }}
        {...containerProps}
      >
        <Stack spacing={1} maxWidth={"sm"}>
          <Stack spacing={1}>
            <Typography
              variant="h4"
              fontSize={{ xs: 20, sm: 24 }}
              fontWeight={500}
              color={"#FFF"}
              lineHeight={1.5}
            >
              CÒN CHẦN CHỜ GÌ NỮA,
            </Typography>
            <Typography
              variant="h4"
              fontSize={{ xs: 20, sm: 28 }}
              color={"#FFF"}
              fontWeight={700}
              lineHeight={1.2}
              textTransform={"uppercase"}
            >
              TẢI APP {appName} NGAY
            </Typography>
            <Typography
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
              fontSize={16}
              fontWeight={300}
              color={"#FFF"}
              mt={1}
            >
              Tải ứng dụng {appName} và đăng ký ngay hôm nay để nhận vô vàn ưu
              đãi hấp dẫn cho người mới.
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            spacing={{ xs: "20px", sm: "30px" }}
            zIndex={2}
            position="relative"
          >
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #FFFFFF",
              }}
              onClick={() => router.push(appstoreLink)}
            >
              <Image
                src={AppStoreAvailableImage}
                width={isOverSmScreen ? 121 : 100}
                height={isOverSmScreen ? 35 : 29}
                alt="AppStore"
              />
            </Button>
            <Button
              variant="outlined"
              sx={{
                border: "1px solid #FFFFFF",
              }}
              onClick={() => router.push(googleplayLink)}
            >
              <Image
                src={GooglePlayAvailableImage}
                width={isOverSmScreen ? 140 : 100}
                height={isOverSmScreen ? 35 : 25}
                alt="GooglePlay"
              />
            </Button>
          </Stack>
        </Stack>

        <Box
          sx={{
            position: "absolute",
            top: "-40px",
            right: "-80px",
            zIndex: 0,
          }}
        >
          <Image
            src="/call-to-action.svg"
            width={430}
            height={418}
            alt="PingGO Logo"
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default InstallApp;
