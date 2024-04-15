import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

const SubRoute = ({ url, isActive, icon, title, handleDrawerToggle }) => {
  return (
    <>
      <Link href={url} onClick={handleDrawerToggle}>
        <ListItem
          sx={{
            padding: 0,
            ":hover": {
              color: "rgb(29, 114, 177)",
            },
            borderRadius: "8px",
            mt: "5px",
          }}
        >
          <ListItemButton
            sx={{
              color: isActive && "rgb(218, 26, 93)",
              padding: "8px 24px",
              borderRadius: "8px",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: "32px",
                color: isActive && "rgb(218, 26, 93)",
              }}
            >
              {icon}
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
                {title}
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    </>
  );
};
export default SubRoute;
