import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function FooterRegisterForm({ ...props }) {
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
        <Typography variant="body2">Bạn đã có tài khoản ?</Typography>

        <Link href="/auth/login">
          <Typography variant="body2" fontWeight={600} color="primary.main">
            Đăng nhập ngay
          </Typography>
        </Link>
      </Stack>
    </Box>
  );
}
