import { Container } from "@mantine/core";

const containerStyles = {
  width: "100%",
  margin: "0px",
  padding: "0px",
  backgroundColor: "#ffffff",
  maxWidth: "2000px"
};

type LeftLayoutContainerProps = {
  children: React.ReactNode;
};

export default function LeftLayoutContainer({
  children,
}: LeftLayoutContainerProps) {
  return <Container style={containerStyles}>{children}</Container>;
}
