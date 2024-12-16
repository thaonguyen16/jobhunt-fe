import { setPassword } from "../../../../api/auth";
import { FormContainer } from "@components/form";
import { PostResponse } from "@data/interface";
import { ISetPassword } from "@data/interface/auth";
import { ActionIcon, Button, Container, Flex, PasswordInput, Stack, Text} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconPencilCog } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiLockPasswordLine } from "react-icons/ri";



export default function SetPassword({loading, reload}) {

    const [isEdit, setEdit] = useState(false);
    const [comfirmPass, setComfirmPass] = useState("");

    const {
        register,
       getValues,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ISetPassword>({ mode: "onChange", shouldFocusError: true });

      const updateMutation = useMutation<PostResponse, Error, ISetPassword>({
        mutationFn: setPassword,
        onSuccess: () => {
          loading(false);
          setEdit(false);
          reset()
         reload();
        
          notifications.show({
            title: "Đặt mật khẩu",
            message: "Đặt mật khẩu thành công",
            color: "green",
          });
        },
        onError: (error) => {
          loading(false);
          notifications.show({
            title: "Đặt mật khẩu thất bại",
            message: error.message,
            color: "red",
          });
        },
      });

      const onSubmit: SubmitHandler<ISetPassword> = (data) => {
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
                Đặt mật khẩu
            </Text>
            {!isEdit && <ActionIcon variant="light" onClick={() => setEdit(true)}>
                    <IconPencilCog stroke={1.5} style={{width: "100%", height: "100%"}} />
                </ActionIcon>}
            </Flex>
            {/* Form Password */}

            <FormContainer onSubmit={handleSubmit(onSubmit)}>
            
            
                <PasswordInput mb={"sm"}
                    variant="filled"
                    label="Mật khẩu mới"
                    leftSection={<RiLockPasswordLine color="#0572cc" />}
                    required
                    {...register("newPass", {
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
                    error={errors.newPass && <span>{errors.newPass.message}</span>}
                />
                <PasswordInput
                    variant="filled"
                    label="Xác nhận mật khẩu mới"
                    defaultValue={comfirmPass}
                    leftSection={<RiLockPasswordLine color="#0572cc" />}
                    onChange={(value) => setComfirmPass(value.currentTarget.value)}
                    error={comfirmPass !== getValues("newPass") && <span>Mật khẩu không khớp</span>}
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