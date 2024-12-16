import { Modal, Button, Group, Text, LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";
import { IDeleteManySubIndustries, ISubIndustry } from "../../interface";
import {
  getOneSubIndustry,
  deleteSubIndustry,
  deleteManySubIndustries,
} from "@/api/subIndustry";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";

type DeleteSubIndustryModalProps = {
  id: number | null;
  opened: boolean;
  onClose: () => void;
  refetchData: () => void;
  isMany: boolean;
  ids?: number[];
};

export default function DeleteSubIndustryModal(
  props: DeleteSubIndustryModalProps
) {
  const { opened, onClose } = props;
  const [deletedSubIndustry, setDeletedSubIndustry] =
    useState<ISubIndustry | null>(null);

  const subIndustryQuery = useQuery({
    queryKey: ["sub-industry", props.id],
    queryFn: () => getOneSubIndustry(props.id || -1),
    enabled: !!props.id,
  });

  const deleteMutation = useMutation<PostResponse, Error, { id: number }>({
    mutationFn: deleteSubIndustry,
    onSuccess: (data) => {
      props.refetchData();
      notifications.show({
        title: "Thành công",
        message: data.message,
        color: "teal",
      });
      onClose();
    },
    onError: () => {
      notifications.show({
        title: "Xóa ngành nghề thất bại",
        message: "Đã có lỗi xảy ra, vui lòng thử lại",
        color: "red",
      });
    },
  });

  const deleteManyMutation = useMutation<
    PostResponse,
    Error,
    IDeleteManySubIndustries
  >({
    mutationFn: deleteManySubIndustries,
    onSuccess: (data) => {
      props.refetchData();
      notifications.show({
        title: "Thành công",
        message: data.message,
        color: "teal",
      });
      onClose();
    },
    onError: () => {
      notifications.show({
        title: "Xóa ngành nghề thất bại",
        message: "Đã có lỗi xảy ra, vui lòng thử lại",
        color: "red",
      });
    },
  });

  useEffect(() => {
    if (subIndustryQuery.data) {
      setDeletedSubIndustry(subIndustryQuery.data.data.subIndustry);
    }
  }, [subIndustryQuery.data]);

  const deleteSubIndustryHandler = () => {
    if (props.isMany && props.ids) {
      deleteManyMutation.mutate({ ids: props.ids });
      return;
    }
    if (props.id && !props.isMany) {
      deleteMutation.mutate({ id: props.id });
    }
  };

  return (
    <Modal.Root opened={opened} size="sm" onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Xóa ngành nghề</Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <LoadingOverlay
            visible={
              subIndustryQuery.isLoading ||
              deleteMutation.isPending ||
              deleteManyMutation.isPending
            }
          />
          {props.isMany ? (
            <Text size="sm">
              Bạn có muốn xóa dữ liệu trang này không? Sau khi xóa dữ liệu không
              thể khôi phục.
            </Text>
          ) : (
            <Text size="sm">
              Bạn có muốn xóa mục{" "}
              <span className="font-semibold">{deletedSubIndustry?.name}</span>{" "}
              không? Sau khi xóa không thể khôi phục.
            </Text>
          )}

          <Group mt="md" justify="end">
            <Button color="gray" size="xs" onClick={onClose}>
              Hủy
            </Button>
            <Button size="xs" color="red" onClick={deleteSubIndustryHandler}>
              Xóa
            </Button>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
