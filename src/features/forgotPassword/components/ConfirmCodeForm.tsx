import ForgotPasswordFormContainer from "./ForgotPaswordFormContainer";
import { FormHeader } from "@components/form";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ActionIcon, Button, Text } from "@mantine/core";
import api from "@utils/axios";

import { AxiosError } from "axios";
import { ErrorReponseData } from "@data/interface";
import { Stack, TextInput } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa";

type ConfirmCodeFormProps = {
  email: string;
};

export default function ConfirmCodeForm(props: ConfirmCodeFormProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSumitVerificationCode = async () => {
    try {
      setIsLoading(true);
      const res = await api.post("/auth/forget-password/verify-code", {
        email: props.email,
        otp: code,
      });
      navigate("/reset-password", {
        state: { from: "/forgot-password", email: props.email },
      });

      console.log(res);

    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
      console.log(data);
    } finally {
      setIsLoading(false);
    }
  };

  const [resendTime, setResendTime] = useState(0);

  useEffect(() => {
    setResendTime(60);
    const interval = setInterval(() => {
      setResendTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <ForgotPasswordFormContainer>
      <Stack gap="xs">
        <FormHeader
          title="Xác thực tài khoản của bạn"
          subtitle="Một email đã được gửi đến email của bạn. Vui lòng nhập mã xác nhận để cài đặt mật khẩu mới."
        />
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <TextInput
            label="Nhập mã xác nhận"
            name="verificationCode"
            type="text"
            onChange={(e) => setCode(e.target.value)}
            rightSection={
              <ActionIcon
                variant="gradient"
                aria-label="Gradient action icon"
                gradient={{ from: "cyan", to: "#0581e6", deg: 70 }}
                onClick={() =>  handleSumitVerificationCode()}
              >
                <FaArrowRight></FaArrowRight>
              </ActionIcon>
            }
          />
        )}

        <div className="w-full flex gap-4 items-center">
          {resendTime === 0 ? (
            <Button variant="outline" size="xs">
              Gửi lại mã
            </Button>
          ) : (
            <div className="p-2">
              <Text size="xs" style={{ color: "#0572cc" }} fw={500}>
                Gửi lại mã sau {resendTime}s
              </Text>
            </div>
          )}
        </div>
      </Stack>
    </ForgotPasswordFormContainer>
  );
}
