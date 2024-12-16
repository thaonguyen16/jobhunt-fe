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
  Card,
  LoadingOverlay,
  useMantineTheme,
  Flex,
} from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";
import { setDefaultResume } from "@/api/resume";
import DeleteCVModal from "./DeleteCVModal";
import "./cv-card.scss"
import { useNavigate } from "react-router-dom";

type CvProps = {
  id: number;
  cvTitle: string;
  default?: boolean;
  upload?: boolean;
  createdAt?: string;
  imageLink: string;
  image: string[];
};

export default function Cv(props: CvProps) {
  

  const [openViewCv, { open: openViewCvModal, close: closeViewCvModal }] =
    useDisclosure(false);
  const [cvOpened, { open: openDeleteCV, close: closeDeleteCV }] =
    useDisclosure(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleEditOnClick = () => {
    navigate("/tao-cv", { state: { id: props.id } });
  };


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

  const theme = useMantineTheme();

  return (
    <>
      <ViewCvModal opened={openViewCv} onClose={closeViewCvModal} id={props.id}/>
      <DeleteCVModal
        opened={cvOpened}
        onClose={closeDeleteCV}
        id={props.id + ""}
      />

  <Card
    p="lg"
    shadow="lg"
    className={"card"}
    radius="md"
  >
    <LoadingOverlay visible={setDefaltMutation.isPending} __size="sm" />

    {props.default ? (
              <Tooltip position="top" label="CV chính">
                <ActionIcon
                style={{zIndex: 4}}
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
                <ActionIcon style={{zIndex: 4}}
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

    <div
      className={"image"}
      style={{
        backgroundImage:
          `url(${props.imageLink && props.imageLink})`,
      }}
    />
    <div className={"overlay"} />

    <div className={"content"}>
      <div>
        <Text size="lg" className={"title"} fw={500} c={theme.colors.dark[0]}>
        {props.cvTitle}

        </Text>


        <Group justify="space-between" gap="xs">
          <Text size="sm" className={"author"} c={theme.colors.dark[0]}>
          Đã cập nhật: {props.createdAt}
          </Text>

          <Flex gap={"md"} justify={"flex-end"} align={"center"} w={"100%"}>
          <Tooltip label="Xem chi tiết">
              <ActionIcon
                size="sm"
                variant="subtle"
                color={theme.colors.dark[0]}
                onClick={openViewCvModal}
              >
                <BiSolidDetail  color={theme.colors.dark[0]} />
              </ActionIcon>
            </Tooltip>
            {props.upload || (
              <Tooltip label="Chỉnh sửa">
                <ActionIcon size="sm" variant="subtle"  color={theme.colors.dark[0]} onClick={handleEditOnClick}>
                  <FaEdit size="md"  color={theme.colors.dark[0]} />
                </ActionIcon>
              </Tooltip>
            )}
            <Tooltip label="Xóa CV">
              <ActionIcon
                color={theme.colors.dark[0]}
                size="sm"
                variant="subtle"
                onClick={openDeleteCV}
              >
                <MdDeleteForever size={"md"}  color={theme.colors.dark[0]}/>
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Group>
      </div>
    </div>
  </Card>

    </>
  );
}
