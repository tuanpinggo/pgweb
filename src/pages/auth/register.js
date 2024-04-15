import AuthLayout from "@/layouts/auth";
import { useState } from "react";

// components
import RegisterForm from "@/partials/page/auth/register/RegisterForm";
import FooterRegisterForm from "@/partials/page/auth/register/footer";
import { Container, Stack } from "@mui/material";
import CheckPhoneForm from "@/partials/page/auth/register/CheckPhoneForm";
import CheckOTPForm from "@/partials/page/auth/register/CheckOTPForm";
import RegisterSeo from "@/partials/page/auth/register/seo";

export const Steps = {
  TypingPhone: "typing-phone",
  TypingOTP: "typing-otp",
  Register: "register",
};

const RegisterPage = () => {
  const [step, setStep] = useState(Steps.TypingPhone);

  const [phone, setPhone] = useState("");

  const [timeEnd, setTimeEnd] = useState(null);

  return (
    <>
      <RegisterSeo />
      <Container maxWidth="xs">
        <Stack spacing={2} minHeight={500} justifyContent="center">
          {step === Steps.TypingPhone && (
            <CheckPhoneForm
              setPhone={setPhone}
              step={step}
              setStep={setStep}
              setTimeEnd={setTimeEnd}
            />
          )}
          {step === Steps.TypingOTP && (
            <CheckOTPForm
              phone={phone}
              handleNextStep={() => setStep(Steps.Register)}
              handleBack={() => setStep(Steps.TypingPhone)}
              timeEnd={timeEnd}
            />
          )}
          {step === Steps.Register && (
            <RegisterForm phone={phone} step={step} setStep={setStep} />
          )}
          <FooterRegisterForm step={step} setStep={setStep} />
        </Stack>
      </Container>
    </>
  );
};

RegisterPage.Layout = AuthLayout;

export default RegisterPage;
