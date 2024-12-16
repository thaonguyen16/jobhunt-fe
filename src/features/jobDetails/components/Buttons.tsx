import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {
  ApplicationJobModal,
  ModalRequiredAuthen,
} from "@features/candidate/applyJob";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { addFavoriteJob, removeFavoriteJob } from "@/api/job";
import { notifications } from "@mantine/notifications";
import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { FaCheck } from "react-icons/fa";

type ButtonsProps = {
  id?: string;
  isSaved?: boolean;
  isExpired?: boolean;
  jobTitle?: string;
  isApplied?: boolean;
};

export default function Buttons(props: ButtonsProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedAuthen, { open: openAuthen, close: closeAuthen }] =
    useDisclosure(false);
  const isAuthen = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const clientQuery = useQueryClient();

  const addFJMutation = useMutation<PostResponse, Error, string>({
    mutationFn: addFavoriteJob,
    onSuccess: (data) => {
      notifications.show({
        title: "Yêu thích",
        message: data.message,
        color: "teal",
      });
      clientQuery.invalidateQueries({ queryKey: ["jobDetail"] });
    },

    onError: (error) => {
      notifications.show({
        title: "Yêu thích",
        message: error.message,
        color: "red",
      });
    },
  });

  const deleteFJMutation = useMutation<PostResponse, Error, string>({
    mutationFn: removeFavoriteJob,
    onSuccess: (data) => {
      notifications.show({
        title: "Bỏ yêu thích",
        message: data.message,
        color: "teal",
      });
      clientQuery.invalidateQueries({ queryKey: ["jobDetail"] });
    },

    onError: (error) => {
      notifications.show({
        title: "Thông báo",
        message: error.message,
        color: "red",
      });
    },
  });

  const modifyFavoriteJob = () => {
    if (!props.isSaved) {
      addFJMutation.mutate(props.id || "");
    } else {
      deleteFJMutation.mutate(props.id || "");
    }
  };

  const handleApplyJob = () => {
    if (props.isExpired) {
      return;
    }

    if (props.isApplied) {
      notifications.show({
        title: "Thông báo",
        message: "Bạn đã ứng tuyển vào công việc này",
        color: "yellow",
      });
      return;
    }

    if (!isAuthen) {
      openAuthen();
    } else {
      open();
    }
  };

  return (
    <>
      <ApplicationJobModal
        opened={opened}
        closeModal={close}
        jobTitle={props.jobTitle}
      />
      <ModalRequiredAuthen opened={openedAuthen} onClose={closeAuthen} />
      <Group ml="auto">
        <Button
          onClick={handleApplyJob}
          size="xs"
          leftSection={props.isApplied ? <FaCheck /> : <SendRoundedIcon />}
          disabled={props.isExpired}
          color={props.isApplied ? "teal" : "blue"}
        >
          {props.isApplied
            ? "Đã ứng tuyển"
            : props.isExpired
            ? "Hết hạn"
            : "Ứng tuyển"}
        </Button>

        <Button
          onClick={modifyFavoriteJob}
          variant="outline"
          size="xs"
          leftSection={
            props.isSaved ? (
              <MdFavorite className="w-4 h-4" />
            ) : (
              <MdFavoriteBorder className="w-4 h-4" />
            )
          }
        >
          {addFJMutation.isPending || deleteFJMutation.isPending ? (
            <Loader size="xs"></Loader>
          ) : (
            `${props.isSaved ? "Bỏ lưu" : "Lưu việc"}`
          )}
        </Button>
      </Group>
    </>
  );
}
