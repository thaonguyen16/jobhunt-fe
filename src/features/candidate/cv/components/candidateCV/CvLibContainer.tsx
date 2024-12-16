import { Flex } from "@mantine/core";

type CvLibContainerProps = {
  children?: React.ReactNode;
};
export default function CvLibContainer(props: CvLibContainerProps) {
  return <Flex gap={"md"}>{props.children}</Flex>;
}
