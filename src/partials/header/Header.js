import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";

import { globalConfig } from "@/ultils/config";
import CartDrawer from "@/components/ui/Header/Cart/CartDrawer";
import Favorite from "@/components/ui/Header/Favorite";
import { useRouter } from "next/router";
import Navigation from "@/components/ui/Header/Navigation";
import NofiticationDrawer from "@/components/ui/Header/Notifications/NotificationDrawer";
import { useAuth } from "@/hooks/useAuth";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const Header = () => {
  const router = useRouter();
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  const { userData, logout, isLogoutMutating, isLoading } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth={globalConfig.containerMaxWidth}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        py={"10px"}
      >
        <Navigation />

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={{ xs: "space-between", sm: "flex-end" }}
          spacing={2}
          width={"100%"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            order={{ xs: 2, sm: 1 }}
          >
            {!!userData && <CartDrawer />}
            <Favorite />
            {isOverSmScreen && !!userData && <NofiticationDrawer />}
          </Stack>
          <Stack
            order={{ xs: 1, sm: 2 }}
            ml={{ xs: "0 !important", sm: "16px !important" }}
          >
            {!!userData ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                spacing={"10px"}
                onClick={(event) => {
                  if (isOverSmScreen) {
                    handleClick(event);
                  }
                }}
              >
                <Avatar
                  sx={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                >
                  {userData?.name?.charAt(0)}
                </Avatar>
                <Stack
                  sx={{
                    display: {
                      xs: "flex",
                      sm: "none",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    fontSize={14}
                    lineHeight={"20px"}
                    color={"primary"}
                  >
                    {userData?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    fontSize={14}
                    lineHeight={"20px"}
                    color={"#999999"}
                  >
                    {userData?.phone}
                  </Typography>
                </Stack>
              </Stack>
            ) : !isLoading ? (
              <Button
                variant="contained"
                startIcon={<AccountCircleOutlinedIcon />}
                sx={{
                  textTransform: "none",
                }}
                onClick={() => {
                  router.push("/auth/login");
                }}
              >
                <Typography variant="p">Đăng nhập</Typography>
              </Button>
            ) : (
              <CircularProgress
                sx={{
                  width: "24px !important",
                  height: "24px !important",
                }}
              />
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              disableScrollLock
            >
              <MenuItem
                onClick={() => {
                  router.push("/account");
                }}
              >
                <ListItemIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="pSmall"
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    Quản lý tài khoản
                  </Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/orders");
                }}
              >
                <ListItemIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <LocalMallOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="pSmall"
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    Quản lý đơn hàng nhập
                  </Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  router.push("/sales");
                }}
              >
                <ListItemIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                >
                  <StorefrontOutlinedIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="pSmall"
                    sx={{
                      textDecoration: "none",
                    }}
                  >
                    Quản lý đơn hàng bán
                  </Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  await logout();
                }}
              >
                <ListItemIcon
                  sx={{
                    width: "20px",
                    height: "20px",
                  }}
                >
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
                </ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="pSmall"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Đăng xuất
                  </Typography>
                </ListItemText>
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Header;
