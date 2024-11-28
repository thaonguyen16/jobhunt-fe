import { MdDelete, MdEdit, MdArticle } from "react-icons/md";
import {
  Text,
  Card,
  Stack,
  Group,
  Tooltip,
  ActionIcon,
  Badge,
} from "@mantine/core";

export type RecruiterJobCardProps = {
  id: number;
  title?: string;
  dueDate?: string | null;
  createdDate?: string;
  isExpired?: boolean;
  openDeleteModal: (id: number) => void;
  openEditModal: (id: number) => void;
  isActive?: boolean;
  selectJob: (id: number) => void;
};

export default function RecruiterJobCard(props: RecruiterJobCardProps) {
  const { id, title, isActive } = props;

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      p="sm"
      bg={isActive ? "#e7f5ff" : "#ffffff"}
    >
      <Group>
        <Stack gap="xs">
          <Text size="sm" style={{ color: "#228be6" }} fw={500}>
            {title}
          </Text>
          <Stack gap="xs">
            <Badge
              variant="light"
              color={props.isExpired ? "red" : "green"}
              style={{ textTransform: "none" }}
            >
              {props.isExpired ? (
                <Text size="xs" fw={500}>
                  Hết hạn ứng tuyển
                </Text>
              ) : (
                <Text size="xs">Hạn ứng tuyển: {props.dueDate}</Text>
              )}
            </Badge>
            <Text size="10px">Ngày đăng: {props.createdDate}</Text>
          </Stack>
        </Stack>
        <Group ml="auto">
          <Tooltip label="Xem đơn ứng tuyển">
            <ActionIcon bg="white" onClick={() => props.selectJob(id)}>
              <MdArticle color="green" />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Chỉnh sửa" onClick={() => props.openEditModal(id)}>
            <ActionIcon bg="white">
              <MdEdit style={{ color: "#339af0" }}></MdEdit>
            </ActionIcon>
          </Tooltip>
          {props.isExpired && (
            <Tooltip label="Xoá">
              <ActionIcon bg="white">
                <MdDelete
                  color="red"
                  className="h-4 w-4"
                  onClick={() => props.openDeleteModal(id)}
                ></MdDelete>
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Group>
    </Card>
  );
}
