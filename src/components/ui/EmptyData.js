import { Paper, Stack, Typography } from "@mui/material";

const EmptyData = ({ title, icon }) => {
  return (
    <Stack
      component={Paper}
      elevation={0}
      justifyContent={"center"}
      alignItems={"center"}
      p={4}
    >
      {icon}
      <Typography variant="body1" mt={2}>
        {title}
      </Typography>
    </Stack>
  );
};

export default EmptyData;
