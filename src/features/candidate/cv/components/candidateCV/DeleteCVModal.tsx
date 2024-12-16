import { Button, Modal, Group, Loader } from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";
import { deleteResume } from "@/api/resume";

type DeleteCVModalProps = {
  id: string;
  onClose: () => void;
  opened: boolean;
};

export default function DeleteCVModal(props: DeleteCVModalProps) {
  const queryClient = useQueryClient();

  const deleteCvMutation = useMutation<PostResponse, Error, string>({
    mutationFn: deleteResume,
    onSuccess: (data) => {
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "teal",
      });
      queryClient.invalidateQueries({ queryKey: ["cvList"] });
      props.onClose();
    },
    onError: () => {
      notifications.show({
        title: "Thông báo",
        message: "Xóa CV thất bại",
        color: "red",
      });
    },
  });

  return (
    <Modal.Root opened={props.opened} onClose={props.onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Xác nhận xoá CV</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>

        <Modal.Body>
          Bạn muốn xóa CV này?
          <Group mt="lg" justify="end">
            <Button onClick={props.onClose} variant="outline" size="xs">
              Huỷ
            </Button>
            <Button
              onClick={() => deleteCvMutation.mutate(props.id)}
              autoFocus
              color="red"
              size="xs"
            >
              {deleteCvMutation.isPending ? (
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
