import { HeaderUserNav, HeaderWrapper } from "@components/layouts/header";
import { Flex, Image, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import "./header.scss"

const Header = () => {
  const navigate = useNavigate();

  return (
    <HeaderWrapper>
      <Flex style={{cursor: "pointer"}}
        direction={"row"}
        justify={"flex-start"}
        align={"center"}
        wrap={"nowrap"}
        onClick={() => {
          navigate("/");
        }}
      >
        <Image src="/src/assets/img/logo.png" h="40px" w="40px" />
        <Text
          size="20px"
          fw="900"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Jobhunt
        </Text>
      </Flex>
      <HeaderUserNav />
    </HeaderWrapper>
  );
};
export default Header;
