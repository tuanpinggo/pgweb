"useClient";
import {
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Collapse from "@mui/material/Collapse";

import React, { useMemo, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { useNotifications } from "@/hooks/useNotifications";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { NotificationType } from "@/constants/notifications";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import { useAuth } from "@/hooks/useAuth";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import DefaultFooter from "@/partials/footer/default";

const NavigationItem = ({ url, icon, title, closeDrawer }) => {
  const router = useRouter();

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
        onClick={() => {
          router.push(url);
          closeDrawer?.();
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          {icon}
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            {title}
          </Typography>
        </Stack>
        <ArrowForwardIosOutlinedIcon sx={{ color: "#999999" }} />
      </Stack>
      <Divider flexItem />
    </>
  );
};

const MobileNavigation = () => {
  const [open, setOpen] = useState();
  const { logout, isLogoutMutating } = useAuth();

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Stack spacing={0} onClick={openDrawer}>
        <IconButton>
          <PermIdentityOutlinedIcon sx={{ color: "#999999" }} />
        </IconButton>
        <Typography
          fontSize={12}
          fontWeight={400}
          lineHeight={"16px"}
          variant="body2"
          display={{ xs: "block", sm: "none" }}
          color={"#A9A9A9"}
        >
          Tài khoản
        </Typography>
      </Stack>
      <Drawer
        anchor="right"
        open={open}
        onClose={closeDrawer}
        disableScrollLock={true}
      >
        <Stack width={{ xs: "100vw", sm: "375px" }} position={"relative"}>
          <Stack
            direction={"row"}
            sx={{
              background:
                "linear-gradient(114deg, #F80759 -3.18%, #1D96D2 104.37%)",
            }}
            p={2}
            justifyContent={"center"}
            position={"relative"}
          >
            <IconButton
              aria-label="close-drawer"
              size="small"
              sx={{
                position: "absolute",
                left: "8px",
                top: "calc(50% - 14px)",
                color: "white.main",
              }}
              onClick={closeDrawer}
            >
              <ArrowBackOutlinedIcon fontSize="inherit" />
            </IconButton>
            <Typography
              variant="body2"
              fontSize={20}
              fontWeight={500}
              color={"white.main"}
              lineHeight={"28px"}
            >
              Tài khoản
            </Typography>
          </Stack>
          <Stack height={"calc(100vh - 60px)"}>
            <NavigationItem
              url={"/orders"}
              icon={<LocalMallOutlinedIcon color="primary" />}
              title={"Quản lý đơn hàng nhập"}
              closeDrawer={closeDrawer}
            />
            <NavigationItem
              url={"/sales"}
              icon={<StorefrontOutlinedIcon color="primary" />}
              title={"Quản lý đơn hàng bán"}
              closeDrawer={closeDrawer}
            />
            <NavigationItem
              url={"/account/addresses"}
              icon={<LocationOnOutlinedIcon color="warning" />}
              title={"Danh sách địa chỉ"}
              closeDrawer={closeDrawer}
            />
            <NavigationItem
              url={"/account/change-password"}
              icon={<CachedOutlinedIcon color="info" />}
              title={"Đổi mật khẩu"}
              closeDrawer={closeDrawer}
            />
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              p={2}
              onClick={async () => {
                await logout();
              }}
            >
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                {!isLogoutMutating ? (
                  <LogoutOutlinedIcon color="primary" />
                ) : (
                  <CircularProgress
                    sx={{
                      width: "24px !important",
                      height: "24px !important",
                    }}
                  />
                )}
                <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
                  Đăng xuất
                </Typography>
              </Stack>
              <ArrowForwardIosOutlinedIcon sx={{ color: "#999999" }} />
            </Stack>
            <DefaultFooter forceShow onClick={closeDrawer} showPolicy={false} />
          </Stack>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};

export default MobileNavigation;
