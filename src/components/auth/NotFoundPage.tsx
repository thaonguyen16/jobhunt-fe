import { LargeContainer } from "@components/ui";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Text, Button } from "@mantine/core";

export default function NotFoundPage() {
  return (
    <LargeContainer>
      <div className="mx-auto mt-20">
        <Text size="24px" variant="h1" fw="700" style={{ color: "#495057" }}>
          404
        </Text>
        <Text variant="h4" size="md" fw="500" style={{ color: "#828282" }}>
          Không tìm thấy trang
        </Text>

        <Link to="/">
          <Button
            size="xs"
            variant="gradient"
            leftSection={<FaArrowLeft />}
            gradient={{ from: "dark.3", to: "gray", deg: 90 }}
            mt="sm"
          >
            Về trang chủ
          </Button>
        </Link>
      </div>
    </LargeContainer>
  );
}
