import { TextInput, Modal, Button, Group } from "@mantine/core";

type ViewCvModalProps = {
  opened: boolean;
  onClose: () => void;
};

export default function ViewCvModal({ opened, onClose }: ViewCvModalProps) {
  return (
    <Modal.Root opened={opened} onClose={onClose} size="xl">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>{"Chi tiết"}</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <TextInput label="Tên CV" readOnly />
          <iframe src="" className="h-[400px]" />
          <Group justify="end">
            <Button size="xs" my="lg">
              Đóng
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
