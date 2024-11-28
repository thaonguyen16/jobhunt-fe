import { ResumeCard } from "@features/candidate/cv";
import { Container, Stack, Text, Group, Grid } from "@mantine/core";

export default function ResumeGalleryPage() {
  return (
    <Container py="lg" size={"lg"} mt="sm">
      <Stack w="50%">
        <Text
          size="lg"
          fw="700"
          color="blue.9"
          style={{
            letterSpacing: "0.5px",
          }}
        >
          Trình tạo CV - Xây dựng ấn tượng đầu tiên hoàn hảo
        </Text>
        <Text
          size="md"
          color="gray.9"
          style={{
            lineHeight: "1.5",
            letterSpacing: "0.5px",
          }}
        >
          Tìm cho bạn mẫu CV phù hợp với công việc mơ ước và bắt đầu tạo ngay
          hôm nay! Chỉ cần vài bước đơn giản, bạn sẽ có CV chuyên nghiệp để
          chinh phục nhà tuyển dụng.
        </Text>
      </Stack>
      <Grid>
        <Grid.Col span={3}>
          <ResumeCard />
        </Grid.Col>
        <Grid.Col span={3}>
          <ResumeCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
