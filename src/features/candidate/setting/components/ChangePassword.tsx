import { FormContainer } from "@components/form";
import { PostResponse } from "@data/interface";
import { IPassword } from "@data/interface/profile";
import { ActionIcon, Button, Container, Flex, Stack, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { resetPassword } from "@services/userService";
import { IconPencilCog } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { RiLockPasswordLine } from "react-icons/ri";



export default function ChangePassword({loading,reload}) {

    const [showPassword, setShowPassword] = useState(false);
    const [isEdit, setEdit] = useState(true);

    const {
        register,
        watch,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IPassword & {comfirmPass: string}>({ mode: "onChange", shouldFocusError: true });

      const updateMutation = useMutation<PostResponse, Error, IPassword>({
        mutationFn: resetPassword,
        onSuccess: () => {
          loading(false);
          setEdit(false);
          reset()
            reload();
          notifications.show({
            title: "Cập nhật thông tin",
            message: "Đổi mật khẩu thành công",
            color: "green",
          });
        },
        onError: (error) => {
          loading(false);
          notifications.show({
            title: "Đổi mật khẩu thất bại",
            message: error.message,
            color: "red",
          });
        },
      });

      const onSubmit: SubmitHandler<IPassword> = (data) => {
        loading(true);
        console.log(data);
        updateMutation.mutate(data);
      };

    return (<Container
        p={"10px"}
        m={"0"}
        mt={"1rem"}
        pb={"30px"}
        bg={"rgba(255,255,255,0.5"}
        style={{
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Stack w={"90%"}>
            {/* Avatar */}
            <Flex  mt={"20px"} direction={"row"} justify={"space-between"} align={"center"}>
                
            <Text size="1rem" fw={"700"} c={"#0581e6"}>
                Đổi mật khẩu
            </Text>
            {!isEdit && <ActionIcon variant="light" onClick={() => setEdit(true)}>
                    <IconPencilCog stroke={1.5} style={{width: "100%", height: "100%"}} />
                </ActionIcon>}
            </Flex>
            {/* Form Password */}

            <FormContainer onSubmit={handleSubmit(onSubmit)}>
            
                <TextInput mb={"sm"}
                    variant="filled"
                    label="Mật khẩu hiện tại"
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
                    {...register("old_password", {
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
                    error={errors.old_password && <span>{errors.old_password.message}</span>}
                />
                <TextInput mb={"sm"}
                    variant="filled"
                    label="Mật khẩu mới"
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
                    {...register("new_password", {
                        required: "Mật khẩu là bắt buộc",
                        minLength: {
                            value: 8,
                            message: "Mật khẩu phải có ít nhất 8 ký tự",
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)/, // At least one uppercase letter and one number
                            message: "Mật khẩu phải có ít nhất 1 chữ hoa và 1 chữ số",
                        },
                        validate: (value) => {
                            const password = watch("old_password"); // Use getValues to access form values
                            return value !== password || "Mật khẩu mới phải khác mật khẩu hiện tại"; // Custom error message
                          },
                    })}
                    error={errors.new_password && <span>{errors.new_password.message}</span>}
                />
                <TextInput
                    variant="filled"
                    label="Xác nhận mật khẩu mới"
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
                    {...register("confirm_new_password", {
                        required: "Mật khẩu là bắt buộc",
                        minLength: {
                            value: 8,
                            message: "Mật khẩu phải có ít nhất 8 ký tự",
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*\d)/, // At least one uppercase letter and one number
                            message: "Mật khẩu phải có ít nhất 1 chữ hoa và 1 chữ số",
                        },
                        validate: (value) => {
                            const password = watch("new_password"); // Use getValues to access form values
                            return value === password || "Mật khẩu không khớp với mật khẩu mới"; // Custom error message
                          },
                    })}
                    error={errors.confirm_new_password && <span>{errors.confirm_new_password.message}</span>}
                />
               {isEdit &&  <Flex direction={"row"} align={"center"} justify={"center"} gap={"md"} mt={"2rem"}>
                    <Button variant="outline" type="reset" onClick={() => {
                        setEdit(false);
                        reset();
                    }}>
                        Hủy
                    </Button>
                    <Button variant="filled" type="submit" onClick={() => {}}>
                        Thay đổi
                    </Button>
                </Flex>}
            </FormContainer>

        </Stack>
    </Container>);
}