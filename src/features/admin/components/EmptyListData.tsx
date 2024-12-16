import { Text, Image, Stack } from "@mantine/core";

export default function EmptyListData() {
  return (
    <Stack mt="lg" align="center">
      <Image src="/src/assets/img/empty_list.png" alt="empty" w={100} />
      <Text fw={500} size="sm" style={{ color: "#0581e6" }}>
        Danh sách trống
      </Text>
    </Stack>
  );
}
