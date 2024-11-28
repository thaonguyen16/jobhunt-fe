import { PostResponse } from "@data/interface";
import {
  Flex,
  Button,
  Modal,
  Stack,
  Textarea,
  LoadingOverlay,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { rejectJob } from "@/api/job";

type RejectJobModalProps = {
  rejectModalOpened: boolean;
  closeRejectModal: () => void;
  closeApprovalModal: () => void;
  jobId: number | null;
};
export default function RejectJobModal(props: RejectJobModalProps) {
  const reasonRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const rejectMutation = useMutation<
    PostResponse,
    Error,
    { id: number; reason: string }
  >({
    mutationFn: rejectJob,
    onSuccess: (data) => {
      props.closeRejectModal();
      queryClient.invalidateQueries({ queryKey: ["adminFilterJob"] });
      props.closeApprovalModal();
      notifications.show({
        title: "Thành công",
        message: data.message,
        color: "green",
      });
    },
    onError: (error) => {
      console.error(error);
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "red",
      });
    },
  });

  const handleRejectJob = () => {
    if (reasonRef.current) {
      if (props.jobId) {
        rejectMutation.mutate({
          id: props.jobId,
          reason: reasonRef.current.value,
        });
      }
    }
  };

  return (
    <Modal
      bg={"gray.5"}
      title="Lí do từ chối"
      onClose={props.closeRejectModal}
      opened={props.rejectModalOpened}
      size={"sm"}
    >
      <LoadingOverlay visible={rejectMutation.isPending} />
      <Stack>
        <Textarea label="Nhập lí do từ chối" ref={reasonRef} />

        <Flex mt="md" justify="end" gap="xs">
          <Button color="gray" size="xs" onClick={props.closeRejectModal}>
            Đóng
          </Button>
          <Button color="red" size="xs" onClick={handleRejectJob}>
            Xác nhận
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
