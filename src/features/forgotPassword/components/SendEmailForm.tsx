import ForgotPasswordFormContainer from "./ForgotPaswordFormContainer";
import { FormHeader } from "@components/form";
import { useState } from "react";
import api from "@utils/axios";
import { toastTifyOptions } from "@utils/toastifyUtils";
import { AxiosError } from "axios";
import { ErrorReponseData } from "@data/interface";
import { Stack, TextInput, ActionIcon, Loader } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

type SendEmailFormProps = {
  onSwitchForm: () => void;
  onEmailChange: (email: string) => void;
};
export default function SendEmailForm(props: SendEmailFormProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onEmailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    props.onEmailChange(event.target.value);
  };

  const hanldeSubmitEmailButtonClick = async () => {
    setIsLoading(true);
    try {
      const res = await api.post("/auth/forget-password/send-code", { email });
      props.onSwitchForm();
    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordFormContainer>
      <div className="flex justify-center">{isLoading && <Loader />}</div>
      {!isLoading && (
        <Stack>
          <FormHeader
            title="Lấy lại tài khoản"
            subtitle="Bạn cần thực hiện một số bước theo yêu cầu để đặt lại mật khẩu"
          />

          <TextInput
            label="Nhập email"
            type="email"
            value={email}
            onChange={onEmailChangeHandler}
            leftSection={<MdAlternateEmail color="#0581e6"></MdAlternateEmail>}
            rightSection={
              <ActionIcon
                variant="gradient"
                aria-label="Gradient action icon"
                gradient={{ from: "cyan", to: "#0581e6", deg: 70 }}
              >
                <FaArrowRight></FaArrowRight>
              </ActionIcon>
            }
          />
        </Stack>
      )}
    </ForgotPasswordFormContainer>
  );
}
