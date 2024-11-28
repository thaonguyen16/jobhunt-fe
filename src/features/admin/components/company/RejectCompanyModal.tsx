import { rejectCompany } from "@/api/company";
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
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

type RejectCompanyModalProps = {
  id: number | null;
  rejectModalOpened: boolean;
  closeRejectModal: () => void;
  refreshData: () => void;
  closeApprovalModal: () => void;
};

export default function RejectCompanyModal(props: RejectCompanyModalProps) {
  const [rejectReason, setRejectReason] = useState("");

  const rejectMutation = useMutation<
    PostResponse,
    Error,
    { id: number; reason: string }
  >({
    mutationFn: rejectCompany,
    onSuccess: () => {
      props.closeRejectModal();
      props.refreshData();
      props.closeApprovalModal();
      notifications.show({
        title: "Thành công",
        message: "Từ chối công ty thành công",
        color: "teal",
      });
    },
    onError: (data) => {
      console.log(data);
      notifications.show({
        title: "Thất bại",
        message: data.message,
        color: "red",
      });
    },
  });

  const rejectCompanyHandler = () => {
    if (!rejectReason) {
      notifications.show({
        title: "Thất bại",
        message: "Vui lòng nhập lí do từ chối",
        color: "red",
      });
      return;
    }

    rejectMutation.mutate({ id: props.id!, reason: rejectReason });
  };

  return (
    <Modal
      bg={"gray.5"}
      title="Từ chối"
      onClose={props.closeRejectModal}
      opened={props.rejectModalOpened}
      size={"sm"}
    >
      <LoadingOverlay visible={rejectMutation.isPending} />
      <Stack>
        <Textarea
          label="Nhập lí do từ chối"
          required
          variant="filled"
          onChange={(e) => {
            setRejectReason(e.currentTarget.value);
          }}
        />
        <Flex mt="md" justify="end" gap="xs">
          <Button
            color="gray"
            size="xs"
            type="submit"
            onClick={props.closeRejectModal}
          >
            Đóng
          </Button>
          <Button color="red" size="xs" onClick={rejectCompanyHandler}>
            Xác nhận
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
}
