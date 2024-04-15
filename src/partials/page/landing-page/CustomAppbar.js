import { PageRoutes } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { globalConfig } from "@/ultils/config";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoWhite from "public/logo/logo-white.svg";
import Link from "next/link";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const CustomAppbar = () => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  const router = useRouter();

  const { userData, logout, isLogoutMutating, isLoading } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    router.push(newValue);
  };
  return (
    <AppBar
      component="nav"
      position="absolute"
      sx={{
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ padding: "0 !important", flexDirection: "column" }}>
        <Container
          maxWidth={globalConfig.containerMaxWidth}
          sx={{
            py: isOverSmScreen ? "30px" : "10px",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Image
              src={LogoWhite}
              width={isOverSmScreen ? 160 : 100}
              height={isOverSmScreen ? 28 : 16}
              alt="Pinggo logo"
              onClick={() => router.push("/")}
              style={{
                cursor: "pointer",
              }}
            />
            <Stack
              direction={"row"}
              alignItems={"center"}
              spacing={"30px"}
              py={isOverSmScreen ? "6px" : "0px"}
            >
              {isLoading ? (
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <CircularProgress color="inherit" size={24} />
                </IconButton>
              ) : (
                <>
                  <Box
                    sx={{
                      borderColor: "divider",
                      display: {
                        xs: "none",
                        md: "flex",
                      },
                    }}
                  >
                    <Tabs
                      value={router.asPath}
                      onChange={handleChange}
                      sx={{
                        ".MuiTabs-indicator": {
                          backgroundColor: "#FFFFFF",
                        },
                        ".Mui-selected": {
                          color: "#FFFFFF !important",
                          fontWeight: 700,
                        },
                      }}
                    >
                      <Tab
                        value={PageRoutes.Home}
                        label="Trang chủ"
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: 500,
                        }}
                        {...a11yProps(0)}
                      />
                      <Tab
                        value={PageRoutes.Pingger}
                        label="Pingger"
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: 500,
                        }}
                        {...a11yProps(1)}
                      />
                      <Tab
                        value={PageRoutes.Retailer}
                        label="Retailer"
                        sx={{
                          color: "#FFFFFF",
                          fontWeight: 500,
                        }}
                        {...a11yProps(2)}
                      />
                    </Tabs>
                  </Box>
                  {!!userData ? (
                    <>
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleClick}
                        color="inherit"
                      >
                        <Avatar>{userData?.name?.charAt(0)}</Avatar>
                      </IconButton>
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
                            router.push("/home");
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              width: "20px",
                              height: "20px",
                            }}
                          >
                            <HomeOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText>
                            <Typography
                              variant="pSmall"
                              sx={{
                                textDecoration: "none",
                              }}
                            >
                              Trang chủ
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
                    </>
                  ) : (
                    <Link href={"/auth/login"}>
                      <Button variant={"contained"}>
                        <Typography color={"#FFFFFF"}>Đăng nhập</Typography>
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppbar;
