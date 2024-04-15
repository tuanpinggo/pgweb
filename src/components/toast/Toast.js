import { Box, Stack } from "@mui/material";
import React from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
const getIcon = (type) => {
  if (type === "success") {
    return <CheckCircleOutlinedIcon color="success" />;
  }
  if (type === "error") {
    return <ErrorOutlineOutlinedIcon color="error" />;
  }
};

const Toast = ({ type, message }) => {
  const icon = getIcon(type);

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {icon}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginLeft: "10px",
        }}
      >
        {message}
      </Box>
    </Stack>
  );
};

export default Toast;
