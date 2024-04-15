import EmptyLayout from "@/layouts/empty";
import { Box, CircularProgress, Stack } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

export default function LoadingScreen() {
  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Image src="/logo.svg" width={180} height={34} alt="" />
          <CircularProgress size={24} />
        </Stack>
      </Box>
    </>
  );
}

LoadingScreen.Layout = EmptyLayout;
