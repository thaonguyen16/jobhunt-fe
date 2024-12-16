import { LargeContainer } from "@components/ui";
import { Loader, Flex } from "@mantine/core";

export default function ErrorPage() {
  return (
    <LargeContainer>
      <Flex direction="column" gap={"md"} align={"center"} justify={"center"} w={"100%"} h={"5rem"}  pt={"3rem"} pb={"1rem"}>
      <Loader size={"xs"}/>
       
      </Flex>
    </LargeContainer>
  );
}
