import { MdDelete, MdEdit, MdArticle } from "react-icons/md";
import {
  Text,
  Card,
  Stack,
  Group,
  Tooltip,
  ActionIcon,
  Badge,
  Image
} from "@mantine/core";
import { FaStopCircle } from "react-icons/fa";

export type RecruiterJobCardProps = {
  id: number;
  title?: string;
  dueDate?: string | null;
  createdDate?: string;
  isExpired?: boolean;
  status?: string;
  isHot?: boolean;
  applyCount?: number;
  setTotalJobApplications?: (total: number) => void;
  openDeleteModal: (id: number) => void;
  openStopModal: (id: number) => void;
  openEditModal: (id: number) => void;
  isActive?: boolean;
  selectJob: (id: number) => void;
  setSelectJobTitle: (title: string) => void;
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
        <Group>
            <Text size="sm" style={{ color: "#228be6" }} fw={500}>
              {title}
            </Text>
            {props.isHot && (
              <Tooltip label={"Việc tuyển gấp"}>
                <Image src="/src/assets/img/fire.png" w="24px" h="24px"></Image>
              </Tooltip>
            )}
          </Group>
          <Stack gap="xs">
            <Group>
              {" "}
              <Badge
                color={props.isExpired ? "red" : "green"}
                style={{ textTransform: "none" }}
              >
                {props.isExpired ? (
                  <Text size="xs" fw={500}>
                    Hết hạn ứng tuyển
                  </Text>
                ) : (
                  <Text size="xs" fw="500">
                    Hạn ứng tuyển: {props.dueDate}
                  </Text>
                )}
              </Badge>
              <Badge color={"orange"} style={{ textTransform: "none" }}>
                <Text size="xs" fw="500">
                  {" "}
                  Số đơn ứng tuyển: {props.applyCount || 0}
                </Text>
              </Badge>
            </Group>

            <Text size="10px">Ngày đăng: {props.createdDate}</Text>
          </Stack>
        </Stack>
        <Group ml="auto">
          <Tooltip label="Xem đơn ứng tuyển">
          <ActionIcon
              bg="white"
              onClick={() => {
                props.setSelectJobTitle(title || "");
                props.selectJob(id);
                props.setTotalJobApplications &&
                  props.setTotalJobApplications(props.applyCount || 0);
              }}
            >
              <MdArticle color="green" />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label="Chỉnh sửa"
            onClick={() => {
              props.openEditModal(id);
              props.setTotalJobApplications &&
                props.setTotalJobApplications(props.applyCount || 0);
            }}
          >
            <ActionIcon bg="white">
              <MdEdit style={{ color: "#339af0" }}></MdEdit>
            </ActionIcon>
          </Tooltip>
          {props.status === "ACTIVE" ? (
            <Tooltip label="Ngưng tuyển">
              <ActionIcon bg="white" onClick={() => props.openStopModal(id)}>
                <FaStopCircle color="gray" className="h-4 w-4"></FaStopCircle>
              </ActionIcon>
            </Tooltip>
          ) : (
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
