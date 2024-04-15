import { Container, Stack } from "@mui/material";
import { globalConfig } from "@/ultils/config";
import DefaultHeader from "@/partials/header/default";
import DefaultFooter from "@/partials/footer/default";
import { useClientKey } from "@/hooks/useClientKey";

export default function AuthLayout({ children }) {
  useClientKey();
  return (
    <>
      <Stack width="100%" minHeight="100vh">
        <DefaultHeader />
        <Container
          maxWidth={globalConfig.containerMaxWidth}
          sx={{
            flexGrow: 1,
            pt: { xs: "100px", md: "140px" },
            pb: "80px",
          }}
          component={"main"}
        >
          {children}
        </Container>
        <DefaultFooter />
      </Stack>
    </>
  );
}
