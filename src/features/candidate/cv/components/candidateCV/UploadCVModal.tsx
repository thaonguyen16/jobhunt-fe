import {
  TextInput,
  Button,
  Modal,
  FileInput,
  Group,
  Text,
  Loader,
} from "@mantine/core";
import { TbFileCv } from "react-icons/tb";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { uploadResume } from "@/api/resume";
import { notifications } from "@mantine/notifications";

type UploadCVModalProps = {
  onClose: () => void;
  opened: boolean;
  fetchCvList: () => void;
};
export default function UploadCVModal(props: UploadCVModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  const uploadMutation = useMutation<
    PostResponse,
    Error,
    { title: string; file: File | null }
  >({
    mutationFn: uploadResume,
    onSuccess: (data) => {
      props.fetchCvList();
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "teal",
      });
      props.onClose();
      setFile(null);
      setTitle("");
    },
    onError: (error) => {
      notifications.show({
        title: "Thông báo",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <Modal.Root opened={props.opened} onClose={props.onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text fw="500" style={{ color: "#1c7ed6" }}>
              Tải lên CV
            </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <form className="flex flex-col gap-2">
            <TextInput
              size="sm"
              label="Tên CV"
              placeholder="Fresher blockchain developer"
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <FileInput
              value={file}
              onChange={setFile}
              rightSection={<TbFileCv />}
              label="Tải Cv lên"
              placeholder="Your CV"
              rightSectionPointerEvents="none"
            />

            <Group ml="auto" mt="lg">
              <Button variant="outline" size="xs">
                Hủy
              </Button>
              <Button
                size="xs"
                disabled={file === null || title === ""}
                onClick={() => uploadMutation.mutate({ title, file })}
              >
                {uploadMutation.isPending ? (
                  <Loader size="xs" color="white"></Loader>
                ) : (
                  "Xác nhận"
                )}
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
