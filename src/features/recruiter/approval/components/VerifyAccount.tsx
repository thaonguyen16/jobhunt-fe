import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { Button, FileInput, Group, Loader, Text } from "@mantine/core";

import ModalDeleteLicense from "./ModalDeleteLicense";
import { MdDeleteForever } from "react-icons/md";
import { MdFileUpload } from "react-icons/md";
import { useMutation } from "@tanstack/react-query";
import { addBusinessLicense } from "@/api/company";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
type VerifyAccountProps = {
  loading: (loading: boolean) => void;
  businessLicense: string;
};

export default function VerifyAccount({ businessLicense }: VerifyAccountProps) {
  const [file, setFile] = useState<File | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [bus, setBus] = useState<string>(businessLicense);

  const addLicenseMutation = useMutation({
    mutationFn: addBusinessLicense,
    onSuccess: () => {
      window.location.reload();
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
    <div className="bg-white rounded-lg my-2 px-8 py-4">
      <ModalDeleteLicense
        closeModal={close}
        opened={opened}
        setBusinessLicense={setBus}
      />

      {businessLicense !== "" ? (
        <>
          <Text size="sm" mt="sm" fw={500} style={{ color: "#1c7ed6" }} mb="sm">
            Giấy chứng nhận doanh nghiệp
          </Text>
          <div className="iframe-container border rounded-lg shadow-md overflow-hidden bg-white h-screen">
            <iframe
              src={businessLicense}
              className="w-full h-full"
              title="Business License"
              style={{
                border: "none",
              }}
            ></iframe>
          </div>
        </>
      ) : (
        <FileInput
          label="Tải lên giấy chứng nhận doanh nghiệp"
          onChange={setFile}
          fileInputProps={{ accept: ".pdf" }}
          size="sm"
          leftSection={<MdFileUpload className="text-primary-600" />}
        />
      )}

      <Text size="10px" mt="sm" style={{ color: "gray.0" }} fw="500">
        <span className="text-primary-600">Lưu ý:</span> Chỉ chấp nhận file PDF
        và có dung lượng dưới 5MB <br />
      </Text>
      <Group justify="center" mt="lg">
        <Button
          size="xs"
          color="blue.9"
          leftSection={<FaSave />}
          onClick={() => {
            if (bus !== "") {
              notifications.show({
                title: "Thông báo",
                message:
                  "Vui lòng xóa giấy chứng nhận hiện tại trước khi cập nhật",
                color: "yellow",
              });
            }
            if (file) {
              addLicenseMutation.mutate(file);
            } else {
              notifications.show({
                title: "Thông báo",
                message: "Vui lòng chọn file",
                color: "yellow",
              });
            }
          }}
        >
          {addLicenseMutation.isPending ? (
            <Loader size="xs" color="white" />
          ) : (
            "Cập nhật"
          )}
        </Button>
        <Button
          size="xs"
          variant="light"
          color="red"
          leftSection={<MdDeleteForever />}
          onClick={open}
        >
          Xóa
        </Button>
      </Group>
    </div>
  );
}
