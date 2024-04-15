import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "@/hooks/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <ListItem
      sx={{
        padding: 0,
        ":hover": {
          color: "rgb(29, 114, 177)",
        },
      }}
      onClick={handleLogout}
    >
      <ListItemButton
        sx={{
          padding: "8px 24px",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "32px",
          }}
        >
          <LogoutOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          <Typography
            variant="pSmall"
            sx={{
              textDecoration: "none",
              marginLeft: "16px",
              color: "inherit",
            }}
          >
            Đăng xuất
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default LogoutButton;
