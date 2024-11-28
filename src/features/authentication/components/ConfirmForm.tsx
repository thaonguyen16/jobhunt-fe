import {FormContainer } from "@components/form";
import { useEffect, useState } from "react";
import { CiBarcode } from "react-icons/ci";
import { Button, TextInput, Stack, ActionIcon,Text, Overlay, Center, Loader,Container } from "@mantine/core";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IRecruiterRegister, IVerifyOTP } from "@data/interface/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { verifyOTP } from "../../../api/auth";
import { notifications } from "@mantine/notifications";

export default function ConfirmForm() {

  const {
    handleSubmit
  } = useForm<IVerifyOTP>({ mode: "onChange", shouldFocusError: true });

  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(5*60);
  const location = useLocation();
  const dataRe: IRecruiterRegister = location.state;
  const navigate = useNavigate();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  useEffect(() => {
    if (time <= 0) return;

    const intervalId = setInterval(() => {
      setTime(prevTime => prevTime - 1); 
    }, 1000); 

    return () => clearInterval(intervalId);
  }, [time]);

  const verifyMutation = useMutation<PostResponse, Error, IVerifyOTP>({
    mutationFn: verifyOTP,
    onSuccess: () => {
    
      setLoading(false);
      navigate("/tuyen-dung/quan-ly")
      
      notifications.show({
        title: "Xác thực tài khoản",
        message: "Xác thực tài khoản thành công",
        color: "green",
      });
    },
    onError: (error) => {
      setLoading(false);
      notifications.show({
        title: "Xác thực tài khoản thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const onSubmit: SubmitHandler<IVerifyOTP> = (data) => {

    setLoading(true);
    if(dataRe !== null) {
      data.email = dataRe.email;
    data.otp = otp;
    verifyMutation.mutate(data);
    }
  };

  return (
    <Container maw={2000} w={"100%"} mt={"3rem"}>
      {loading && <Overlay w="100%" h="100%" pos="fixed" blur={2}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>}
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Stack justify="center" align="center">
          <Text fw={700} size="2rem" variant="gradient" gradient={{from: "blue", to: "cyan", deg: 90}}>Xác thực tài khoản của bạn</Text>
          <Text>Một email đã được gửi đến email {dataRe && dataRe.email} của bạn. Vui lòng nhập mã xác nhận để hoàn tất đăng ký</Text>
         
          <TextInput w={"30%"}
          mt={"3rem"}
           defaultValue={otp}
           onChange={(value) => setOTP(value.currentTarget.value)}
            leftSection={<CiBarcode color="#0572cc"></CiBarcode>}
            type="number"
            rightSection={
              <ActionIcon
                variant="gradient"
                aria-label="Xác nhận"
                gradient={{ from: "#0581e6", to: "cyan", deg: 90 }}
              >
                <FaLongArrowAltRight />
              </ActionIcon>
            }
          />

          <Button variant="light" size="xs" disabled={time < 5*60}>
           {formatTime(time)} Gửi lại mã
          </Button>
        </Stack>
      </FormContainer>
    </Container>
  );
}
