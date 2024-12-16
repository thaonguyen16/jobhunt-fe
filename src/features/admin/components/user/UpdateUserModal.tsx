import { Modal, TextInput, Button, Flex, Select } from "@mantine/core";

type UpdateUserModalProps = {
  updateUsersOpened: boolean;
  closeUpdateUserModal: () => void;
};

export default function UpdateUserModal(props: UpdateUserModalProps) {
  const { updateUsersOpened, closeUpdateUserModal } = props;
  return (
    <Modal
      opened={updateUsersOpened}
      onClose={closeUpdateUserModal}
      title="Thêm người dùng"
    >
      <Flex direction="column" gap="sm">
        <TextInput label="Họ và tên" required />

        <TextInput label="Email" required />

        <Select label="Role" data={["ADMIN", "RECRUITER", "CANDIDATE"]} />
      </Flex>
      <Flex mt="md" justify="end" gap="xs">
        <Button color="gray" size="xs" type="submit">
          Hủy
        </Button>
        <Button color="blue" size="xs">
          Thêm
        </Button>
      </Flex>
    </Modal>
  );
}
