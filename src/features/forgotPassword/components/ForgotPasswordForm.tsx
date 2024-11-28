import { Container } from "@mui/material";
import { SendEmailForm, ConfirmCodeForm } from "..";
import { useState } from "react";

export default function ForgotPasswordForm() {
  const [isChangeForm, setIsChangeForm] = useState(false);
  const [email, setEmail] = useState("");

  const onChangeFormHandler = () => {
    setIsChangeForm(true);
  };

  const handleOnEmailChange = (email: string) => {
    setEmail(email);
  };

  return (
    <Container maxWidth="md" sx={{ marginBottom: "2.4rem" }} fixed>
      {isChangeForm && (
        <SendEmailForm
          onSwitchForm={onChangeFormHandler}
          onEmailChange={handleOnEmailChange}
        />
      )}
      {!isChangeForm && <ConfirmCodeForm email={email} />}
    </Container>
  );
}
