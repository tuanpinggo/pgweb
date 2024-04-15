import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function FooterForgotForm({ ...props }) {
  if (props.step === 2)
    return (
      <Box mt={3} mb={4}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Button variant="text" onClick={() => props.setStep(1)}>
            <Typography variant="body2" fontWeight={600} color="primary.main">
              Quay lại
            </Typography>
          </Button>
        </Stack>
      </Box>
    );

  return (
    <Box mt={3} mb={4}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Typography variant="body2">Quay lại trang</Typography>

        <Link href="/auth/login">
          <Typography variant="body2" fontWeight={600} color="primary.main">
            Đăng nhập
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
}
