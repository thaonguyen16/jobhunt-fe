import { PostResponse } from "@data/interface";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "@/api/user";
import { notifications } from "@mantine/notifications";

type DeleteUserModalProps = {
  id?: number | null;
  opened: boolean;
  email?: string;
  onClose: () => void;
  refetchData?: () => void;
};

export default function DeleteUserModal(props: DeleteUserModalProps) {
  const { opened, onClose, refetchData, id, email } = props;

  const deleteMutation = useMutation<PostResponse, Error, { id: number }>({
    mutationFn: deleteUser,
    onSuccess: () => {
      refetchData && refetchData();
      onClose();
      notifications.show({
        title: "Thành công",
        message: "Xóa người dùng thành công",
        color: "blue",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <Modal opened={opened} onClose={onClose} size="md" title="Thông báo">
      <Text>
        Bạng có muốn xóa người dùng "{email}". Sau khi xóa không thể khôi phục
        tài khoản.
      </Text>

      <Group mt="xl">
        <Button onClick={onClose} size="xs" color="gray">
          Hủy
        </Button>
        <Button
          onClick={() => {
            deleteMutation.mutate({ id: id! });
          }}
          size="xs"
          color="red"
        >
          Xóa
        </Button>
      </Group>
    </Modal>
  );
}
