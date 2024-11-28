import Container from "@mui/material/Container";
import { FormHeader } from "@components/form";
import { Link, useNavigate } from "react-router-dom";
import { ICandidateRegister } from "..";
import { TextInput, Button, Stack, Loader } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegUserCircle } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { candidateRegisterAccount } from "@/api/auth";
import { notifications } from "@mantine/notifications";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICandidateRegister>({ mode: "onChange", shouldFocusError: true });

  const registerMutation = useMutation<PostResponse, Error, ICandidateRegister>(
    {
      mutationFn: candidateRegisterAccount,
      onSuccess: (data) => {
        navigate("/confirm-account");
        notifications.show({
          title: "Đăng ký thành công",
          message: data.message,
          color: "teal",
        });
      },
      onError: (error) => {
        notifications.show({
          title: "Đăng ký thất bại",
          message: error.message,
          color: "red",
        });
      },
    }
  );

  const onSubmit: SubmitHandler<ICandidateRegister> = (data) => {
    registerMutation.mutate(data);
  };

  return (
    <Container maxWidth="sm" sx={{ marginBottom: "2.4rem" }} fixed>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="m-auto w-full md:w-3/4 p-6 mt-10 bg-white shadow-md rounded-md"
      >
        <FormHeader
          title="Chào mừng bạn đến với Jobhunt"
          subtitle="Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng"
        />
        <Stack mt="sm" gap="xs">
          <TextInput
            variant="filled"
            required
            label="Nhập tên"
            leftSection={<FaRegUserCircle color="#0572cc" />}
            type="text"
            size="sm"
            {...register("fullName", {
              required: {
                value: true,
                message: "Tên là bắt buộc", // Message when the field is required but empty
              },
              maxLength: {
                value: 50,
                message: "Tên không được quá 50 ký tự", // Message when the length exceeds 50 characters
              },
            })}
            error={errors.fullName && <p>{errors.fullName.message}</p>}
          />
          <TextInput
            variant="filled"
            leftSection={<MdAlternateEmail color="#0572cc" />}
            label="Email"
            type="email"
            required
            {...register("email", {
              required: "Email là bắt buộc",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email không hợp lệ",
              },
            })}
            error={errors.email && <p>{errors.email.message || "Error"}</p>}
          />
          <TextInput
            variant="filled"
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            leftSection={<RiLockPasswordLine color="#0572cc" />}
            rightSection={
              !showPassword ? (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              )
            }
            required
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
            variant="filled"
            leftSection={<RiLockPasswordLine color="#0572cc" />}
            label="Nhập lại mật khẩu"
            type="password"
            required
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
            type="submit"
            mt="sm"
            size="sm"
            variant="gradient"
            gradient={{ from: "#0581e6", to: "cyan", deg: 90 }}
          >
            {registerMutation.isPending ? (
              <Loader size="xs" color="white" />
            ) : (
              "Đăng ký"
            )}
          </Button>
          <Link to="/tuyen-dung-dang-ky">
            <p className="mt-2 font-medium text-xs text-[#0572cc] text-center hover:underline cursor-pointer">
              Đăng ký tài khoản nhà tuyển dụng
            </p>
          </Link>
        </Stack>
      </form>
    </Container>
  );
}
