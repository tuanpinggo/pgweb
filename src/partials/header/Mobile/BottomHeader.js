import NofiticationDrawer from "@/components/ui/Header/Notifications/NotificationDrawer";
import { globalConfig } from "@/ultils/config";
import { Container, Stack } from "@mui/material";
import HomeButton from "./HomeButton";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import MobileNavigation from "@/components/ui/Header/Navigation/MobileNavigation";
import { useAuth } from "@/hooks/useAuth";
import { LogoSvg } from "public/icons";

const BottomHeader = () => {
  const { userData } = useAuth();
  if (!userData) return null;
  return (
    <Container maxWidth={globalConfig.containerMaxWidth}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <HomeButton src={LogoSvg} url="/home" title={"Trang chủ"} />
        <HomeButton
          icon={<LocalMallOutlinedIcon sx={{ color: "#999999" }} />}
          url="/products"
          title={"Nhập hàng"}
        />
        <HomeButton
          icon={<StorefrontOutlinedIcon sx={{ color: "#999999" }} />}
          url="/sales/receive"
          title={"Nhận đơn"}
        />
        <NofiticationDrawer />
        <MobileNavigation />
      </Stack>
    </Container>
  );
};

export default BottomHeader;
