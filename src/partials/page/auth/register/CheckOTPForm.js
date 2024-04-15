import { useAuth } from "@/hooks/useAuth";
import { LoadingButton } from "@mui/lab";
import { Alert, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Countdown from "react-countdown";
import VerificationInput from "react-verification-input";

export default function CheckOTPForm({ ...props }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { triggerValidateOTP } = useAuth();

  const timecount = useMemo(
    () => (!!props?.timeEnd ? props?.timeEnd : Date.now() + 5 * 60 * 1000),
    [props?.timeEnd]
  );

  const handleCheckOtp = async (value) => {
    setLoading(true);
    setError("");
    await triggerValidateOTP(
      {
        otp: value,
        phone: props?.phone,
      },
      {
        onSuccess: (res) => {
          props?.handleNextStep();
        },
        onError: (res) => {
          setError(res?.response?.data?.message?.message);
        },
      }
    );
    setLoading(false);
  };
  return (
    <>
      <Stack spacing={"5px"}>
        <Typography
          variant="h1"
          component="h1"
          fontWeight={700}
          fontSize={18}
          lineHeight={"40px"}
          textAlign="left"
        >
          Xác minh số điện thoại
        </Typography>
        <Typography
          variant="body2"
          component="p"
          textAlign="left"
          fontSize={12}
          lineHeight={"18px"}
        >
          Vui lòng nhập 6 số bảo mật chúng tôi gửi đến tài khoản Zalo của bạn
        </Typography>
      </Stack>
      {!!error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Stack
        justifyContent="center"
        alignItems="center"
        position="relative"
        spacing={2}
      >
        <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
          Hiệu lực OTP
          <Typography ml={2} color={"primary"} component={"span"}>
            <Countdown
              date={timecount}
              renderer={({ minutes, seconds }) => {
                return (
                  <span>
                    {minutes}:{seconds}
                  </span>
                );
              }}
              onComplete={() => {
                props?.handleBack();
              }}
            />
          </Typography>
        </Typography>
        <VerificationInput
          onComplete={(value) => handleCheckOtp(value)}
          validChars="0-9"
          inputProps={{ inputMode: "numeric" }}
        />
      </Stack>
      <LoadingButton
        loading={loading}
        variant="contained"
        size="large"
        type="submit"
        fullWidth
        sx={{
          m: "25px 0 0 0",
        }}
      >
        TIẾP TỤC
      </LoadingButton>
    </>
  );
}
