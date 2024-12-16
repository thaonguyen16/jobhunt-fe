import { Button, Modal, Stack, Text } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
type ModalRequiredAuthenProps = {
  opened: boolean;
  onClose: () => void;
};

export default function ModalRequiredAuthen(props: ModalRequiredAuthenProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <Modal opened={props.opened} onClose={props.onClose} title="Thông báo">
        <Stack>
          <Text fw={500}>Đăng nhập để ứng tuyển công việc</Text>
          <Button
            onClick={() => {
              props.onClose();
              navigate("/dang-nhap", { state: { from: location.pathname } });
            }}
            size="sm"
            leftSection={<FaArrowRight />}
          >
            Đăng nhập
          </Button>
        </Stack>
      </Modal>
    </>
  );
}
