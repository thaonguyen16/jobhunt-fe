import { Modal, Button, Center } from "@mantine/core";
import { CircularProgress } from "@mui/material";
import { FileDropZone } from "@components/form/File";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changeAvatarRequest } from "@services/userService";
import { notifications } from "@mantine/notifications";
import { setUserAvatar } from "@store/avatar";
import { useDispatch } from "react-redux";
import { setAvatar } from "@store/auth";

type AvatarModalProps = {
  opened: boolean;
  onClose: () => void;
  setIAvatar:() => void;
};

export default function AvatarModal({ opened, onClose,setIAvatar }: AvatarModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const dispatch = useDispatch();

  const updateAvatarMutation = useMutation<string, Error, FormData>({
    mutationFn: changeAvatarRequest,
    onSuccess: (data) => {
      onClose()
      setIsLoading(false);
      setIAvatar();
      dispatch(setUserAvatar({ url: data }));
      dispatch(setAvatar(data));
      notifications.show({
        title: "Tải file",
        message: "Thay đổi ảnh đại diện thành công",
        color: "green",
      });
    },
    onError: (error) => {
      setIsLoading(false);
      notifications.show({
        title: "Thay đổi ảnh đại diện thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const onUpdateImgHandler = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file as File);
      updateAvatarMutation.mutate(formData);
    } catch (err) {
      console.error(err);
    } 
  };

  useEffect(() => {
    if(file) {
      setIsUpload(true);
    }
    else {
      setIsUpload(false);
    }
  },[file])

  return (
    
    <Modal.Root centered opened={opened} onClose={onClose}  removeScrollProps={{ allowPinchZoom: true }} transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }} closeOnClickOutside={false}>
      <Modal.Overlay blur={0} ></Modal.Overlay>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title w={"100%"} ta={"center"}>Thay đổi ảnh đại diện</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-stretch px-2 gap-4">
            {isLoading ? (
              <Center w={"100%"} h={"10rem"}>
                <CircularProgress></CircularProgress>
              </Center>
            ) : (
              <FileDropZone
                description="Kích thước file không quá 200MB và là định dạng: .png, .jpg, .jpeg"
                content="Tải ảnh lên"
                statusF = {isUpload}
                onSelectFile={(file) => setFile(file)}
              />
            )}
            {!isLoading && <div className="flex-none flex flex-col gap-4">
              <Button size="xs" onClick={onUpdateImgHandler} variant="light" disabled = {!isUpload}>
                Thay mới
              </Button>
              <Button color="red" size="xs" variant="light" disabled = {!isUpload} onClick={() => setFile(null)}>
                Xoá ảnh
              </Button>
              <Button variant="outline" size="xs" onClick={() => {
                onClose();
                setIsUpload(false);
              }}>
                Thoát
              </Button>
            </div>}
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
