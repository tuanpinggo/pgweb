import {
  Badge,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useWishList } from "@/hooks/useWishList";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FavoriteItem from "./FavoriteItem";
import LoadingSection from "@/components/loading/loadingSection";

const Favorite = () => {
  const [open, setOpen] = useState();

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const { wishLists, isLoading } = useWishList();

  return (
    <React.Fragment>
      <Tooltip title="Danh sách sản phẩm yêu thích">
        <IconButton onClick={openDrawer}>
          <Badge badgeContent={wishLists?.length} color="primary">
            <FavoriteBorderIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Drawer
        anchor="right"
        open={open}
        onClose={closeDrawer}
        disableScrollLock={true}
      >
        <Stack
          width={{ xs: "100vw", sm: "375px" }}
          height={"100%"}
          position={"relative"}
        >
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
              Danh sách yêu thích
            </Typography>
          </Stack>
          <Stack
            flexGrow={1}
            minWidth={0}
            height={"100%"}
            overflow={"auto"}
            bgcolor={wishLists?.length === 0 ? "#FFF" : "#EEEEEE"}
            spacing={1}
            py={1}
          >
            {(wishLists?.length === 0 || !wishLists) && (
              <Stack mt={"20px"} alignItems={"center"}>
                <FavoriteBorderIcon
                  style={{ color: "red", cursor: "pointer" }}
                  fontSize={"large"}
                />
                <Typography variant="body2">
                  Danh sách yêu thích trống
                </Typography>
              </Stack>
            )}
            {wishLists?.length > 0 &&
              wishLists?.map((item) => (
                <React.Fragment key={item?.id}>
                  <FavoriteItem item={item} />
                </React.Fragment>
              ))}
            {isLoading && <LoadingSection />}
          </Stack>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};

export default Favorite;
