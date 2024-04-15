"useClient";
import {
  Badge,
  Box,
  Button,
  Chip,
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
import NotificationItem from "./NotificationItem";
import { LoadingButton } from "@mui/lab";
import LoadingSection from "@/components/loading/loadingSection";
import { useRouter } from "next/router";

const NofiticationDrawer = () => {
  const [open, setOpen] = useState();

  const router = useRouter();

  const openDrawer = () => {
    setOpen(true);
  };
  const closeDrawer = () => {
    setOpen(false);
  };

  const {
    overview,
    notificationsInDrawer,
    topicInDrawer,
    setTopicInDrawer,
    mutateOverview,
    mutateNotificationsInDrawer,
    readAllNotifications,
    isReadAllMutating,
    isNotiInDrawerLoading,
    mutate,
    readNotification,
    isReadNotificationMutating,
  } = useNotifications();

  const unread = useMemo(
    () => overview?.import_order?.unread + overview?.export_order?.unread || 0,
    [overview?.import_order?.unread, overview?.export_order?.unread]
  );

  const title = useMemo(() => {
    switch (topicInDrawer) {
      case NotificationType.Import.value:
        return NotificationType.Import.label;
      case NotificationType.Export.value:
        return NotificationType.Export.label;
      default:
        return NotificationType.All.label;
    }
  }, [topicInDrawer]);

  const handleRedirect = () => {
    router.push({
      pathname: "/account/notifications",
      query: {
        ...(!!topicInDrawer ? { topic: topicInDrawer } : {}),
      },
    });
    closeDrawer();
  };

  const handleClickItem = async (notification) => {
    if (!notification?.read_at) {
      await readNotification(
        {
          notificationId: notification?.id,
          topicId: notification?.topic,
        },
        {
          onSuccess: async () => {
            await mutateNotificationsInDrawer();
            await mutate();
            await mutateOverview();
          },
        }
      );
    }

    if (notification?.topic === NotificationType.Import.value) {
      router.push({
        pathname: "/orders",
        query: {
          orderId: notification?.data?.data?.id,
        },
      });
    } else if (notification?.topic === NotificationType.Export.value) {
      router.push({
        pathname: "/sales/receive",
      });
    }
    closeDrawer();
  };

  return (
    <React.Fragment>
      <Tooltip title="Danh sách thông báo">
        <Stack
          spacing={0}
          onClick={() => {
            if (!router.pathname?.startsWith("/account/notifications")) {
              openDrawer();
            }
          }}
        >
          <IconButton>
            <Badge badgeContent={unread} color="primary">
              <NotificationsOutlinedIcon sx={{ color: "#999999" }} />
            </Badge>
          </IconButton>
          <Typography
            fontSize={12}
            fontWeight={400}
            lineHeight={"16px"}
            variant="body2"
            color={
              router.pathname?.startsWith("/account/notifications")
                ? "primary.main"
                : "#A9A9A9"
            }
            display={{ xs: "block", sm: "none" }}
          >
            Thông báo
          </Typography>
        </Stack>
      </Tooltip>
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
              onClick={() => {
                if (!!topicInDrawer) {
                  setTopicInDrawer(NotificationType.All.value);
                } else {
                  closeDrawer();
                }
              }}
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
              {title}
            </Typography>
          </Stack>
          <Stack
            height={"calc(100vh - 60px)"}
            bgcolor={"#F5F5F5"}
            component={"div"}
            overflow={"auto"}
          >
            {/* {!topic && ( */}
            <Collapse
              in={!topicInDrawer}
              sx={{ minHeight: "unset !important" }}
            >
              <Stack
                p={2}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#FFFFFF"}
                onClick={() => setTopicInDrawer(NotificationType.Import.value)}
                sx={{ cursor: "pointer" }}
              >
                <Stack direction={"row"} spacing={2}>
                  <Stack
                    width={40}
                    height={40}
                    sx={{
                      border: "1px solid #F0F0F0",
                      borderRadius: "100%",
                    }}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <LocalMallOutlinedIcon
                      style={{
                        color: "red",
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Typography
                      variant="body2"
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={"20px"}
                    >
                      {NotificationType.Import.label}
                    </Typography>
                    <Typography
                      color={"#717171"}
                      variant="body2"
                      fontSize={13}
                      fontWeight={400}
                      lineHeight={"20px"}
                    >
                      {NotificationType.Import.description}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={"4px"}
                  flexShrink={0}
                >
                  {Number(overview?.import_order?.unread) > 0 && (
                    <Chip
                      label={overview?.import_order?.unread}
                      color="primary"
                    />
                  )}
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Stack>
              <Divider flexItem />
              <Stack
                p={2}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bgcolor={"#FFFFFF"}
                onClick={() => setTopicInDrawer(NotificationType.Export.value)}
                sx={{ cursor: "pointer" }}
              >
                <Stack direction={"row"} spacing={2}>
                  <Stack
                    width={40}
                    height={40}
                    sx={{
                      border: "1px solid #F0F0F0",
                      borderRadius: "100%",
                    }}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <StorefrontOutlinedIcon
                      style={{
                        color: "red",
                      }}
                    />
                  </Stack>
                  <Stack>
                    <Typography
                      variant="body2"
                      fontSize={14}
                      fontWeight={500}
                      lineHeight={"20px"}
                    >
                      {NotificationType.Export.label}
                    </Typography>
                    <Typography
                      color={"#717171"}
                      variant="body2"
                      fontSize={13}
                      fontWeight={400}
                      lineHeight={"20px"}
                    >
                      {NotificationType.Export.description}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  spacing={"4px"}
                  flexShrink={0}
                >
                  {Number(overview?.export_order?.unread) > 0 && (
                    <Chip
                      label={Number(overview?.export_order?.unread)}
                      color="primary"
                    />
                  )}
                  <ArrowForwardIosOutlinedIcon />
                </Stack>
              </Stack>
              <Divider flexItem />
            </Collapse>
            {/* )} */}
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={2}
              py={1}
            >
              <Typography
                variant="body2"
                fontSize={13}
                fontWeight={400}
                lineHeight={"20px"}
              >
                Tất cả thông báo
              </Typography>
              <LoadingButton
                sx={{ textTransform: "none", fontWeight: 400, fontSize: 13 }}
                onClick={async () => {
                  await readAllNotifications({ topicId: topicInDrawer });
                  await mutateNotificationsInDrawer();
                  await mutateOverview();
                }}
                loading={isReadAllMutating}
              >
                Đánh dấu đã đọc tất cả
              </LoadingButton>
            </Stack>
            {isNotiInDrawerLoading ? (
              <LoadingSection />
            ) : (
              <React.Fragment>
                <Stack spacing={1}>
                  {notificationsInDrawer?.map((notification) => (
                    <React.Fragment key={notification?.id}>
                      <NotificationItem
                        notification={notification}
                        handleClickItem={() => handleClickItem(notification)}
                      />
                    </React.Fragment>
                  ))}
                </Stack>
                <Stack
                  direction={"row"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  px={2}
                  py={1}
                >
                  <Button
                    sx={{
                      textTransform: "none",
                      fontWeight: 400,
                      fontSize: 13,
                    }}
                    onClick={handleRedirect}
                  >
                    Xem thêm
                  </Button>
                </Stack>
              </React.Fragment>
            )}
          </Stack>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};

export default NofiticationDrawer;
