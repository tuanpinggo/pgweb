import { Container, Stack, Typography } from "@mui/material";
import { globalConfig } from "@/ultils/config";
import DefaultHeader from "@/partials/header/default";
import DefaultFooter from "@/partials/footer/default";
import { useClientKey } from "@/hooks/useClientKey";

export default function CheckoutLayout({ children }) {
  useClientKey();

  return (
    <Stack width="100%" minHeight="100vh" sx={{ backgroundColor: "#F5F5F5" }}>
      <DefaultHeader />
      <Container
        maxWidth={globalConfig.containerMaxWidth}
        sx={{
          flexGrow: 1,
          pt: { xs: "50px", md: "120px" },
          pb: "80px",
        }}
        component={"main"}
      >
        <Stack width="100%" spacing={2}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography
              fontWeight={600}
              fontSize={20}
              lineHeight={"28px"}
              color={"primary"}
            >
              Thanh toán đơn hàng
            </Typography>
          </Stack>
          {children}
        </Stack>
      </Container>
      <DefaultFooter />
    </Stack>
  );
}
