import { FaStar } from "react-icons/fa6";
import { FaRegStar, FaEdit } from "react-icons/fa";
import { BiSolidDetail } from "react-icons/bi";

import { MdDeleteForever } from "react-icons/md";
import ViewCvModal from "./ViewCvModal";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  Tooltip,
  Group,
  Text,
  Stack,
  Card,
  LoadingOverlay,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";
import { setDefaultResume } from "@/api/resume";
import DeleteCVModal from "./DeleteCVModal";

type CvProps = {
  id: number;
  cvTitle: string;
  default?: boolean;
  upload?: boolean;
  createdAt?: string;
};

export default function Cv(props: CvProps) {
  const [openViewCv, { open: openViewCvModal, close: closeViewCvModal }] =
    useDisclosure(false);
  const [cvOpened, { open: openDeleteCV, close: closeDeleteCV }] =
    useDisclosure(false);
  const queryClient = useQueryClient();

  const setDefaltMutation = useMutation<PostResponse, Error, string>({
    mutationFn: setDefaultResume,
    onSuccess: (data) => {
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "teal",
      });
      queryClient.invalidateQueries({ queryKey: ["cvList"] });
    },
    onError: (data) => {
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "red",
      });
    },
  });

  return (
    <>
      <ViewCvModal opened={openViewCv} onClose={closeViewCvModal} />
      <DeleteCVModal
        opened={cvOpened}
        onClose={closeDeleteCV}
        id={props.id + ""}
      />

      <Card withBorder shadow="sm">
        <LoadingOverlay visible={setDefaltMutation.isPending} __size="sm" />
        <Stack gap="sm">
          <Group justify="space-beeten">
            <Text fw="500" style={{ color: "#228be6" }} lineClamp={2}>
              {props.cvTitle}
            </Text>

            {props.default ? (
              <Tooltip position="top" label="CV chính">
                <ActionIcon
                  size="sm"
                  variant="subtle"
                  color="yellow.8"
                  ml="auto"
                >
                  <FaStar></FaStar>
                </ActionIcon>
              </Tooltip>
            ) : (
              <Tooltip position="top" label="Đặt làm CV chính">
                <ActionIcon
                  size="xs"
                  onClick={() => setDefaltMutation.mutate(props.id.toString())}
                  variant="subtle"
                  color="yellow.8"
                  ml="auto"
                >
                  <FaRegStar></FaRegStar>
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
          <Text size="10px" fw="500" color={"gray.6"}>
            Đã cập nhật: {props.createdAt}
          </Text>

          <Group ml="auto">
            <Tooltip label="Xem chi tiết">
              <ActionIcon
                size="sm"
                variant="subtle"
                color="green"
                onClick={openViewCvModal}
              >
                <BiSolidDetail color="green" />
              </ActionIcon>
            </Tooltip>
            {props.upload || (
              <Tooltip label="Chỉnh sửa">
                <ActionIcon size="sm" variant="subtle">
                  <FaEdit size="md" />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label="Xóa CV">
              <ActionIcon
                color="red"
                size="sm"
                variant="subtle"
                onClick={openDeleteCV}
              >
                <MdDeleteForever color="red" size={"md"} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </Card>
    </>
  );
}
