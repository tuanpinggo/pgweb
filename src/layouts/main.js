import { Container, Stack } from "@mui/material";
import { globalConfig } from "@/ultils/config";
import DefaultHeader from "@/partials/header/default";
import DefaultFooter from "@/partials/footer/default";
import { useClientKey } from "@/hooks/useClientKey";
import BackToTop from "@/components/ui/BackToTop";

export default function MainLayout({ children }) {
  useClientKey();
  return (
    <Stack
      width="100%"
      minHeight="100vh"
      sx={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <DefaultHeader />
      <Container
        maxWidth={globalConfig.containerMaxWidth}
        sx={{
          flexGrow: 1,
          pt: { xs: "20px", md: "120px" },
          pb: "80px",
        }}
        component={"main"}
      >
        {children}
        <BackToTop />
      </Container>
      <DefaultFooter />
    </Stack>
  );
}
