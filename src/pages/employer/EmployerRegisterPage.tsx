import { fetchUserInfor, googleLoginRequest } from "../../api/auth";
import { MediumContainer } from "@components/ui";
import { IUserInforGoogle } from "@data/interface/auth";
import { RecruiterRegisterForm } from "@features/recruiter/authentication";
import { Button, Container, em, Flex, Stack, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMediaQuery } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "@store/auth";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function EmployerRegisterPage() {
  const isMobile = useMediaQuery(`(max-width: ${em(900)})`);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleLogin = useGoogleLogin({

      onSuccess: (tokenResponse) => {
        
        console.log(tokenResponse);
        handleLogin(tokenResponse.access_token);
      },

      onError: (error) => {
        notifications.show({
          title: "Đăng nhập thất bại",
          message: error.error_description,
          color: "red",
        });
      },
  });

  const handleLogin = async(access_token: string) => {
    

    await fetchUserInfor(access_token).then((re) => {
     

      if(re) {
        const infor: IUserInforGoogle = {
          email: re.email,
          email_verified: re.email_verified,
          family_name: re.family_name,
          given_name: re.given_name,
          name: re.name,
          picture: re.picture,
          sub: re.sub,
          role: "RECRUITER"
        }


        googleLoginRequest(infor).then((response) => {

          if(response.status === "success") {
            dispatch(login());
            navigate("/tuyen-dung/quan-ly");
            notifications.show({
              title: "Xin chào!",
              message: "Đăng nhập thành công",
              color: "green",
            });
          }
          else {
            notifications.show({
              title: "Đăng nhập thất bại",
              message: response.message,
              color: "green",
            });
          }
           
        })
      }


    })
  }
  
  return (
    <Container maw={2000} p={0} m={0} h={"100%"} pos={"relative"} style={{ zIndex: 0 }} >

      <Container  h={"100%"} pos={"absolute"} top={0} w={"100%"} maw={2000} left={0} style={{
        backgroundImage: "url(src/assets/img/register_background.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        zIndex: 1
      }} p={0} m={0}>
      </Container>

      <MediumContainer>
      <Flex direction={!isMobile ? "row" : "column"} gap={"md"} pos={"relative"} style={{ zIndex: 2 }} h={"100%"} w={"100%"} justify={"center"} align={"center"}>
        {!isMobile && <RecruiterRegisterForm />}
       <Stack gap={0} align="stretch" justify="center" h={"100%"} w={"40%"}>
          <Text fw={700} ta={"left"} size="1.5rem" c={"blue"} ml={"14%"}>Bạn là</Text>
          <Text fw={700} ta={"center"} size="3rem" c={"blue"}>Nhà tuyển dụng</Text>
          <Text ta={"center"} c={"#ECDFCC"} mt={"1rem"}>Cùng tạo dựng lợi thế cho doanh nghiệp bằng cách tìm kiếm những ứng viên ưu tú nhất</Text>
          <Flex w={"100%"} justify={"center"} align={"center"}>
          <Button variant="light" leftSection={<IconBrandGoogle stroke={1.5} />} mt={"1rem"} w={"fit-content"} onClick={() => googleLogin()}>
            Đăng nhập với Google
          </Button>
          </Flex>
        </Stack>
        {isMobile && <RecruiterRegisterForm />}
      </Flex>
      </MediumContainer>

    </Container>
  );
}