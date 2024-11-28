import { LargeContainer } from "@components/ui";
import { Text, Loader } from "@mantine/core";

export default function ErrorPage() {
  return (
    <LargeContainer>
      <div className="mx-auto mt-20">
        <Text size="lg" variant="h1" fw="700" style={{ color: "#495057" }}>
          Đang tải...
        </Text>
        <Loader />
      </div>
    </LargeContainer>
  );
}
