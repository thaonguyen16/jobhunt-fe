import { getOneSubIndustry, updateSubIndustry } from "@/api/subIndustry";
import {
  Modal,
  Button,
  Select,
  Stack,
  Group,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IIndustry, ISubIndustry, IUpdateSubIndustry } from "../../interface";
import { ComboboxItem } from "@mantine/core";
import { getIndustries } from "@/api/industry";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";

type UpdateSubIndustryModalProps = {
  id: number | null;
  opened: boolean;
  onClose: () => void;
  refetchData: () => void;
};

export default function UpdateSubIndustryModal(
  props: UpdateSubIndustryModalProps
) {
  const { opened, onClose } = props;

  const [subIndustry, setSubIndustry] = useState<ISubIndustry | null>(null);
  const [industryOptions, setIndustryOptions] = useState<ComboboxItem[]>([]);

  const [subIndustryName, setSubIndustryName] = useState<string>(
    subIndustry?.name + ""
  );
  const [selectedIndustryId, setSelectedIndustryId] = useState("");

  const query = useQuery({
    queryKey: ["one-sub-industries", props.id],
    queryFn: () => getOneSubIndustry(props.id),
    enabled: !!props.id && opened,
  });

  const industryQuery = useQuery({
    queryKey: ["industries"],
    queryFn: getIndustries,
    enabled: opened,
  });

  const updateMutation = useMutation<
    PostResponse,
    Error,
    { id: number; data: IUpdateSubIndustry }
  >({
    mutationFn: updateSubIndustry,
    onError: (error) => {
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "red",
      });
    },
    onSuccess: () => {
      notifications.show({
        title: "Thành công",
        message: "Cập nhật ngành nghề thành công",
        color: "teal",
      });
      props.refetchData();
      query.refetch();
      industryQuery.refetch();
      onClose();
    },
  });

  useEffect(() => {
    if (query.data) {
      setSubIndustry(query.data.data.subIndustry);
      setSelectedIndustryId(query.data.data.subIndustry.industry.id + "");
    }
  }, [query.data]);

  useEffect(() => {
    if (industryQuery.data) {
      setIndustryOptions(
        industryQuery.data.data.industries.map((industry: IIndustry) => ({
          value: industry.id + "",
          label: industry.name,
        }))
      );
    }
  }, [industryQuery.data]);

  const updateSubIndustryHandler = () => {
    if (props.id === null || selectedIndustryId === "") return;

    updateMutation.mutate({
      id: props.id,
      data: { name: subIndustryName, industryId: +selectedIndustryId },
    });
  };

  const onChangeSubIndustryName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubIndustryName(event.target.value);
  };

  return (
    <>
      <Modal.Root opened={opened} size="sm" onClose={onClose}>
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Cập nhật ngành nghề</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body>
            <LoadingOverlay
              visible={
                query.isLoading ||
                industryQuery.isLoading ||
                updateMutation.isPending
              }
            />
            <Stack>
              <TextInput
                defaultValue={subIndustry?.name}
                label="Tên ngành"
                variant="filled"
                // value={subIndustryName}
                size="sm"
                onChange={onChangeSubIndustryName}
              />
              <Select
                value={subIndustry?.industry.id + ""}
                label="Chọn lĩnh vực"
                onChange={(value) => {
                  setSelectedIndustryId(value + "");
                }}
                size="sm"
                variant="filled"
                data={industryOptions}
                searchable
                nothingFoundMessage="Không tìm thấy..."
              />
            </Stack>
            <Group mt="md" justify="end">
              <Button color="gray" size="xs" onClick={onClose}>
                Hủy
              </Button>
              <Button size="xs" onClick={updateSubIndustryHandler}>
                Cập nhật
              </Button>
            </Group>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
