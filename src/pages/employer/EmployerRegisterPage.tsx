import { MediumContainer } from "@components/ui";
import { RecruiterRegisterForm } from "@features/recruiter/authentication";
import { Container, em, Flex, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mui/material";

export default function EmployerRegisterPage() {
  const isMobile = useMediaQuery(`(max-width: ${em(900)})`);
  
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
      <Flex direction={"row"} gap={"md"} pos={"relative"} style={{ zIndex: 2 }} h={"100%"} w={"100%"} justify={"center"} align={"center"}>
        <RecruiterRegisterForm />
       {!isMobile &&  <Stack gap={0} align="stretch" justify="center" h={"100%"} w={"40%"}>
          <Text fw={700} ta={"left"} size="1.5rem" c={"blue"} ml={"14%"}>Bạn là</Text>
          <Text fw={700} ta={"center"} size="3rem" c={"blue"}>Nhà tuyển dụng</Text>
          <Text ta={"center"} c={"#ECDFCC"} mt={"1rem"}>Cùng tạo dựng lợi thế cho doanh nghiệp bằng cách tìm kiếm những ứng viên ưu tú nhất</Text>
        </Stack>}
      </Flex>
      </MediumContainer>

    </Container>
  );
}