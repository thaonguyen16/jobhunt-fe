import Container from "@mui/material/Container";
import { FormHeader, FormContainer } from "@components/form";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { PostResponse } from "@data/interface";
import { useForm, SubmitHandler } from "react-hook-form";
import { Text, Button, TextInput, Stack, Loader } from "@mantine/core";
import { ILogin } from "..";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "@/api/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login } from "@store/auth";
import { notifications } from "@mantine/notifications";

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location.state?.from || "/";
  // form handler hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  // call api
  const loginMutation = useMutation<PostResponse, Error, ILogin>({
    mutationFn: loginAccount,
    onSuccess: () => {
      dispatch(login());
      navigate(from, { replace: true });
      notifications.show({
        title: "Xin chào!",
        message: "Đăng nhập thành công",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Đăng nhập thất bại",
        message: error.message,
        color: "red",
      });
    },
  });
  const onSubmit: SubmitHandler<ILogin> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <Container
      fixed
      sx={{
        marginBottom: "2.4rem",
        backgroundColor: "white",
        marginTop: "2rem",
        width: "25rem",
        paddingTop: "20px",
        paddingBottom: "20px",
        borderRadius: "20px",
      }}
    >
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <FormHeader
            title="Chào mừng bạn đã quay trở lại"
            subtitle="Cùng xây dựng một hồ sơ nổi bật và nhận được các cơ hội sự nghiệp lý tưởng"
          />
          <Stack>
            <TextInput
              type="text"
              {...register("email", { required: true })}
              size="md"
              placeholder="Email đăng nhập"
              variant="filled"
              error={
                errors.email ? (
                  <p className="text-[12px]">Mật khẩu không được để trống</p>
                ) : null
              }
              leftSection={<MdOutlineAlternateEmail color="#0572cc" />}
            />
            <TextInput
              type={showPassword ? "text" : "password"}
              size="md"
              {...register("password", { required: true })}
              error={
                errors.password ? (
                  <p className="text-[12px]">Mật khẩu không được để trống</p>
                ) : null
              }
              placeholder="Mật khẩu"
              variant="filled"
              leftSection={<RiLockPasswordFill color="#0572cc" />}
              rightSection={
                !showPassword ? (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                )
              }
            />
            <Link to="/quen-mat-khau">
              <Text
                px="xs"
                size="xs"
                style={{
                  color: "#e03131",
                }}
              >
                Quên mật khẩu?
              </Text>
            </Link>

            <Button
              type="submit"
              size="sm"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              {loginMutation.isPending ? (
                <Loader size="12" color="orange"></Loader>
              ) : (
                "Đăng nhập"
              )}
            </Button>
            <div className="m-auto text-gray-300">
              <Text size="sm">
                Chưa có tài khoản?{" "}
                <Link to="/dang-ky">
                  <span className="text-primary-500 font-semibold">
                    Đăng ký
                  </span>
                </Link>
              </Text>
            </div>
          </Stack>
        </Stack>
      </FormContainer>
    </Container>
  );
}
