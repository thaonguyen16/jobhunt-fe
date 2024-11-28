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
import "../setting-recruiter.scss"
import { setAvatarCompany } from "@services/companyService";

type AvatarModalProps = {
  opened: boolean;
  onClose: () => void;
  setIAvatar:() => void;
  title: string;
};

export default function AvatarModal({ opened, onClose,setIAvatar,title }: AvatarModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const dispatch = useDispatch();

  const updateAvatarMutation = useMutation<string, Error, FormData>({
    mutationFn: title !== "Thay đổi logo công ty" ? changeAvatarRequest : setAvatarCompany,
    onSuccess: (data) => {
      onClose();
      setIsLoading(false);
      setIsUpload(false);
      setIAvatar();
      title !== "Thay đổi logo công ty" && dispatch(setUserAvatar({ url: data }));
      title !== "Thay đổi logo công ty" && dispatch(setAvatar(data));
      notifications.show({
        title: "Tải file",
        message: title !== "Thay đổi logo công ty" ? "Thay đổi ảnh đại diện thành công" : "Thay đổi logo công ty thành công",
        color: "green",
      });
    },
    onError: (error) => {
      setIsLoading(false);
      setIsUpload(false);
      onClose();
      notifications.show({
        title: title !== "Thay đổi logo công ty" ? "Thay đổi ảnh đại diện thất bại" : "Thay đổi logo công ty thất bại",
        message: error.name,
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
    
    <Modal.Root className="modal-image" centered opened={opened} onClose={onClose}  removeScrollProps={{ allowPinchZoom: true }} transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }} closeOnClickOutside={false}>
      <Modal.Overlay blur={0} ></Modal.Overlay>
      <Modal.Content>
        <Modal.Header bg={"dark"}>
          <Modal.Title w={"100%"} ta={"center"}>{title}</Modal.Title>
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
