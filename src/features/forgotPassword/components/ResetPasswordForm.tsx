import Container from "@mui/material/Container";
import { FormHeader, FormContainer } from "@components/form";
import { useLocation } from "react-router-dom";
import { Stack, TextInput, Button } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { IResetPassword } from "../interface";

export default function ResetPasswordForm() {
  const location = useLocation();
  const { email } = location.state || {};

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IResetPassword>({
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<IResetPassword> = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm" sx={{ marginBottom: "2.4rem" }} fixed>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="xs">
          <FormHeader
            title="Thiết lập mật khẩu mới"
            subtitle="Bước cuối cùng để lấy lại tài khoản của bạn. Vui lòng nhập mật khẩu mới."
          />

          <TextInput
            type="password"
            label="Mật khẩu mới"
            {...register("password", {
              required: "Mật khẩu là bắt buộc",
              minLength: {
                value: 8,
                message: "Mật khẩu phải có ít nhất 8 ký tự",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)/, // At least one uppercase letter and one number
                message: "Mật khẩu phải có ít nhất 1 chữ hoa và 1 chữ số",
              },
            })}
            error={errors.password && <p>{errors.password.message}</p>}
          />

          <TextInput
            type="password"
            label="Nhập lại mật khẩu"
            {...register("confirmPassword", {
              validate: (value) => {
                const password = watch("password"); // Use getValues to access form values
                return value === password || "Mật khẩu không khớp"; // Custom error message
              },
            })}
            error={
              errors.confirmPassword && <p>{errors.confirmPassword.message}</p>
            }
          />

          <Button
            variant="gradient"
            type="submit"
            size="sm"
            gradient={{ from: "cyan", to: "#0581e6", deg: 70 }}
          >
            Xong
          </Button>
        </Stack>
      </FormContainer>
    </Container>
  );
}
