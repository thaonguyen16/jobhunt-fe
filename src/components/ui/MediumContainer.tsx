import Container from "@mui/material/Container";

type MediumContainerProps = {
  children?: React.ReactNode;
};

export default function MediumContainer({ children }: MediumContainerProps) {
  return (
    <Container
      style={{
        maxWidth: "2000px",
        padding: 0,
        position: "relative",
        paddingLeft: "3rem",
        paddingRight: "3rem",
        paddingTop: "1.5rem",
      }}
    >
      {children}
    </Container>
  );
}
