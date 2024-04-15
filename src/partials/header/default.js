import { AppBar, Box, Stack, Toolbar, useMediaQuery } from "@mui/material";
import React from "react";
import Header from "./Header";
import BottomHeader from "./Mobile/BottomHeader";

export default function DefaultHeader() {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  return (
    <Stack width="100vw" bgcolor="white.main" id="#back-to-top-anchor">
      <AppBar
        component="nav"
        color="white"
        {...(!isOverSmScreen ? { position: "static" } : {})}
        sx={{ boxShadow: "none", borderBottom: "1px solid #DDDDDD" }}
      >
        <Toolbar
          sx={{
            padding: "0 !important",
            flexDirection: "column",
          }}
        >
          <Box className="bgPinggo" height={15} width={"100%"} />
          <Header />
        </Toolbar>
      </AppBar>
      <AppBar
        position="fixed"
        color="white"
        sx={{
          top: "auto",
          bottom: 0,
          boxShadow: "none",
          borderTop: "1px solid #DDDDDD",
          display: {
            xs: "flex",
            sm: "none",
          },
        }}
      >
        <Toolbar
          sx={{
            px: 0,
            py: 1,
          }}
        >
          <BottomHeader />
        </Toolbar>
      </AppBar>
    </Stack>
  );
}
