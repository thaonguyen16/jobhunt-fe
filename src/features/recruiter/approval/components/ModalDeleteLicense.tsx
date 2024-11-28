import { deleteBusinessLicense } from "@/api/company";
import { Button, Group, Loader, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

type ModalDeleteLicenseProps = {
  closeModal: () => void;
  opened: boolean;
  setBusinessLicense: (license: string) => void;
};

export default function ModalDeleteLicense(props: ModalDeleteLicenseProps) {
  const delMutation = useMutation({
    mutationFn: deleteBusinessLicense,
    onSuccess: (data) => {
      window.location.reload();
      setTimeout(() => {
        notifications.show({
          title: "Thông báo",
          message: data.message,
          color: "teal",
        });
      }, 1000);
      props.closeModal();
    },
    onError: (error) => {
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "  red",
      });
    },
  });

  return (
    <Modal.Root opened={props.opened} onClose={props.closeModal}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Xóa giấy chứng nhận doanh nghiệp</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text>
            Bạn có chắc chắn muốn xóa giấy chứng nhận doanh nghiệp này không?
          </Text>
          <Group justify="end">
            <Button
              onClick={props.closeModal}
              variant="light"
              color="gray"
              size="xs"
            >
              Hủy
            </Button>
            <Button
              onClick={() => delMutation.mutate()}
              variant="filled"
              size="xs"
              color="red"
            >
              {delMutation.isPending ? (
                <Loader size="xs" color="white" />
              ) : (
                "Xóa"
              )}
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
