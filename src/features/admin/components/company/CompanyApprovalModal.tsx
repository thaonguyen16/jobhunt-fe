import {
  Flex,
  Button,
  TextInput,
  Group,
  Modal,
  Stack,
  Textarea,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useMutation, useQuery } from "@tanstack/react-query";
import { approveCompany, getCompany } from "@/api/company";
import { useEffect, useState } from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import { notifications } from "@mantine/notifications";
import { PostResponse } from "@data/interface";

type CompanyApprovalModalProps = {
  id: number | null;
  approvalModalOpened: boolean;
  closeApprovalModal: () => void;
  openRejectModal: () => void;
  refreshData: () => void;
};

type CompanyType = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  scale: string;
  businessLicense: string;
  status: string;
  selected?: boolean;
};

export default function CompanyApprovalModal(props: CompanyApprovalModalProps) {
  const [company, setCompany] = useState<CompanyType | null>(null);
  const query = useQuery({
    queryKey: ["one-company", props.id],
    queryFn: () => getCompany(props.id || 1),
  });

  useEffect(() => {
    if (query.data) {
      setCompany(query.data.data.company);
    }
  }, [query.data]);

  const approveMutation = useMutation<PostResponse, Error, { id: number }>({
    mutationFn: approveCompany,
    onSuccess: () => {
      props.refreshData();
      props.closeApprovalModal();
      notifications.show({
        title: "Thành công",
        message: "Duyệt công ty thành công",
        color: "teal",
      });
    },
    onError: (data) => {
      notifications.show({
        title: "Lỗi",
        message: data.message,
        color: "red",
      });
    },
  });

  const approveCompanyHanlder = () => {
    if (company) {
      approveMutation.mutate({ id: company.id });
    }
  };

  return (
    <Modal
      zIndex={50}
      size={"70%"}
      opened={props.approvalModalOpened}
      onClose={props.closeApprovalModal}
      // title="Phê duyệt công ty"
      title={<Text fw={500}>Phê duyệt công ty</Text>}
    >
      <LoadingOverlay
        visible={approveMutation.isPending || query.isLoading}
      ></LoadingOverlay>
      <Flex direction="column" gap="md">
        <Group justify="space-between" wrap="nowrap" grow>
          <Textarea
            label="Tên công ty"
            variant="filled"
            readOnly
            value={company?.name}
          />
          <Textarea
            label="Địa chỉ"
            variant="filled"
            readOnly
            value={company?.address}
          />
        </Group>
        <Group justify="space-between" wrap="nowrap" grow>
          <TextInput
            variant="filled"
            label="Số diện thoại"
            readOnly
            value={company?.phone}
          />
          <TextInput
            variant="filled"
            label="Email"
            readOnly
            defaultValue={company?.email}
          />
          <TextInput
            variant="filled"
            label="Số lượng nhân viên"
            disabled
            value={company?.scale}
          />
        </Group>

        <Stack>
          <Text size="sm" fw={500}>
            Giấy chứng nhận doanh nghiệp
          </Text>
          {company?.businessLicense ? (
            <iframe
              src={company?.businessLicense}
              width="100%"
              height="500px"
              style={{ border: "none" }}
              title="PDF Viewer"
            ></iframe>
          ) : (
            <Text
              my="lg"
              size="xs"
              fw={500}
              style={{ color: "red", textAlign: "center" }}
            >
              Không có giấy chứng nhận doanh nghiệp
            </Text>
          )}
        </Stack>
      </Flex>
      <Group mt="lg" justify="end">
        <Button
          color="gray"
          size="xs"
          type="submit"
          onClick={props.closeApprovalModal}
        >
          Đóng
        </Button>
        {company?.status !== "ACTIVE" && (
          <Button
            color="green.8"
            size="xs"
            variant="outline"
            leftSection={
              <MdOutlineCheckCircle className="h-4 w-4"></MdOutlineCheckCircle>
            }
            onClick={approveCompanyHanlder}
          >
            Duyệt
          </Button>
        )}

        <Button
          color="red"
          size="xs"
          variant="outline"
          onClick={props.openRejectModal}
          leftSection={<CiCircleRemove className="h-4 w-4"></CiCircleRemove>}
        >
          Từ chối
        </Button>
      </Group>
    </Modal>
  );
}
