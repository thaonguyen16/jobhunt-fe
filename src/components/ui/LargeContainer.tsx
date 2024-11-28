import Container from "@mui/material/Container";

type LargeContainerProps = {
  children?: React.ReactNode;
  isColumn?: boolean;
};
export default function LargeContainer({
  children,
  isColumn,
}: LargeContainerProps) {
  return (
    <Container
  
      style={{
        display: "flex",
        flexDirection: isColumn ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "3rem",
        width: "100%",
        margin: "0px",
        padding: "0px",
        paddingLeft: "2rem",
        paddingRight: "2rem",
        flexWrap: "nowrap",
        maxWidth: "2000px"
      }}
      fixed
    >
      {children}
    </Container>
  );
}
