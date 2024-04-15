import AuthLayout from "@/layouts/auth";
import { useState } from "react";

// components
import { Container, Stack } from "@mui/material";
import CheckOTPForm from "@/partials/page/auth/register/CheckOTPForm";
import CheckPhoneForm from "@/partials/page/auth/forgot/CheckPhoneForm";
import ForgotSeo from "@/partials/page/auth/forgot/seo";
import FooterForgotForm from "@/partials/page/auth/forgot/footer";
import ForgotForm from "@/partials/page/auth/forgot/ForgotForm";

export const Steps = {
  TypingPhone: "typing-phone",
  TypingOTP: "typing-otp",
  ChangePassword: "change-password",
};

const ForgotPage = () => {
  const [step, setStep] = useState(Steps.TypingPhone);

  const [phone, setPhone] = useState("");

  return (
    <>
      <ForgotSeo />
      <Container maxWidth="xs">
        <Stack spacing={2} minHeight={500} justifyContent="center">
          {step === Steps.TypingPhone && (
            <CheckPhoneForm setPhone={setPhone} step={step} setStep={setStep} />
          )}
          {step === Steps.TypingOTP && (
            <CheckOTPForm
              phone={phone}
              handleNextStep={() => setStep(Steps.ChangePassword)}
            />
          )}
          {step === Steps.ChangePassword && <ForgotForm phone={phone} />}
          <FooterForgotForm step={step} setStep={setStep} />
        </Stack>
      </Container>
    </>
  );
};

ForgotPage.Layout = AuthLayout;

export default ForgotPage;
