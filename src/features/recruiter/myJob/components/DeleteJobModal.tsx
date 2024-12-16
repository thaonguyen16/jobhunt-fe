import { deleteJob } from "@/api/job";
import { PostResponse } from "@data/interface";
import { Modal, Button, Group, Text, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

type DeleteModalProps = {
  jobId: number | null;
  refetch?: () => void;
  opened: boolean;
  onClose: () => void;
};

export default function DeleteModal(props: DeleteModalProps) {
  const deleteJobMutation = useMutation<PostResponse, Error, number>({
    mutationFn: deleteJob,
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
      title="Xoá công việc"
    >
      <Group wrap="nowrap">
        <Text>Bạn có muốn xóa công việc này không ?</Text>
      </Group>

      <Group justify="end" mt="sm">
        <Button size="xs" color="gray" onClick={props.onClose}>
          Hủy
        </Button>
        <Button
          size="xs"
          color="red"
          onClick={() => {
            deleteJobMutation.mutate(props.jobId as number);
          }}
        >
          {deleteJobMutation.isPending ? <Loader size="xs"></Loader> : "Xóa"}
        </Button>
      </Group>
    </Modal>
  );
}
