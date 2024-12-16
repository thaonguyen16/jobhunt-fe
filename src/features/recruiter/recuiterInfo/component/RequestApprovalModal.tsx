import { requestApproval } from "@/api/company";
import { PostResponse } from "@data/interface";
import { Button, Modal, Group, Loader, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

type RequestApprovalModalProps = {
  onClose: () => void;
  opened: boolean;
  loading: (status: boolean) => void;
};

export default function RequestApprovalModal(props: RequestApprovalModalProps) {
  const requestApproveMutation = useMutation<PostResponse, Error>({
    mutationFn: requestApproval,
    onSuccess: (data) => {
      props.onClose();
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "teal",
      });
      props.loading(true);
    },
    onError: (data) => {
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "red",
      });
    },
    onSettled: () => {
      props.loading(false);
    },
  });

  return (
    <Modal.Root opened={props.opened} onClose={props.onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Xác nhận yêu cầu</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>

        <Modal.Body>
          <Text>
            Hãy chắn là bạn đã điều chỉnh thông tin mà chúng tôi yêu cầu?
          </Text>
          <Group mt="lg" justify="end">
            <Button onClick={props.onClose} variant="outline" size="xs">
              Huỷ
            </Button>
            <Button
              onClick={() => {
                requestApproveMutation.mutate();
              }}
              autoFocus
              color="red"
              size="xs"
            >
              {requestApproveMutation.isPending ? (
                <Loader size="xs"></Loader>
              ) : (
                "Xác nhận"
              )}
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
