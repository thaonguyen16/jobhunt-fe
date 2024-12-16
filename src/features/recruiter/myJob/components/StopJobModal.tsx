import { changeStatusJob } from "@/api/job";
import { PostResponse } from "@data/interface";
import { Modal, Button, Group, Text, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

type StopModalProps = {
  jobId: number | null;
  refetch?: () => void;
  opened: boolean;
  onClose: () => void;
};

export default function StopJobModal(props: StopModalProps) {
  const stopJobMutation = useMutation<
    PostResponse,
    Error,
    { id: number; status: string }
  >({
    mutationFn: changeStatusJob,
    onSuccess: (data) => {
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "teal",
      });
      props.refetch && props.refetch();
      props.onClose();
    },
    onError: (error) => {
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <Modal
      opened={props.opened}
      onClose={props.onClose}
      size="xs"
      title="Ngưng tuyển"
    >
      <Group wrap="nowrap">
        <Text>Bạn có muốn ngưng tuyển công việc này không ?</Text>
      </Group>

      <Group justify="end" mt="sm">
        <Button size="xs" color="gray" onClick={props.onClose}>
          Hủy
        </Button>
        <Button
          size="xs"
          color="yellow"
          onClick={() => {
            console.log(props.jobId);
            stopJobMutation.mutate({ id: props.jobId!, status: "STOPPED" });
          }}
        >
          {stopJobMutation.isPending ? (
            <Loader size="xs"></Loader>
          ) : (
            "Ngưng tuyển"
          )}
        </Button>
      </Group>
    </Modal>
  );
}
