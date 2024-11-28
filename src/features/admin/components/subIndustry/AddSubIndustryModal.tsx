import { PostResponse } from "@data/interface";
import {
  Modal,
  Button,
  Select,
  Stack,
  TagsInput,
  Group,
  Text,
  Box,
  ComboboxItem,
  LoadingOverlay,
  Loader,
} from "@mantine/core";
import { addSubIndustries } from "@/api/subIndustry";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { IAddSubIndustries, IIndustry } from "../../interface";
import { getIndustries } from "@/api/industry";
import { notifications } from "@mantine/notifications";

type AddSubIndustryModalProps = {
  opened: boolean;
  onClose: () => void;
  refetchData: () => void;
};

export default function AddSubIndustryModal(props: AddSubIndustryModalProps) {
  const { opened, onClose, refetchData } = props;
  const [subIndustries, setSubIndustries] = useState<string[]>([]);
  const [industryOptions, setIndustryOptions] = useState<ComboboxItem[]>([]);
  const [selectedIndustryId, setSelectedIndustryId] = useState("");

  const industryQuery = useQuery({
    queryKey: ["industries"],
    queryFn: getIndustries,
  });

  useEffect(() => {
    if (industryQuery.data) {
      setIndustryOptions(
        industryQuery.data.data.industries.map((industry: IIndustry) => ({
          value: industry.id + "",
          label: industry.name,
        }))
      );
      if (industryQuery.data.data.industries.length > 0) {
        setSelectedIndustryId(industryQuery.data.data.industries[0].id + "");
      }
    }
  }, [industryQuery.data]);

  const addSubIndustriesMutation = useMutation<
    PostResponse,
    Error,
    IAddSubIndustries
  >({
    mutationFn: addSubIndustries,
    onError: (error) => {
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "red",
      });
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Thành công",
        message: data.message,
        color: "green",
      });
      onClose();
      setSubIndustries([]);
      refetchData();
    },
  });

  const onSubIndustriesChangeHandler = (subIndustries: string[]) => {
    setSubIndustries(subIndustries);
  };

  const onAddSubIndustriesHanlder = () => {
    const data: IAddSubIndustries = {
      industryId: selectedIndustryId,
      subIndustries: subIndustries,
    };
    addSubIndustriesMutation.mutate(data);
  };

  return (
    <>
      <Box pos="relative">
        <Modal.Root opened={opened} size="sm" onClose={onClose}>
          <Modal.Overlay />
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Thêm ngành nghề</Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body>
              <LoadingOverlay
                visible={addSubIndustriesMutation.isPending}
                loaderProps={{ children: <Loader color="blue" /> }}
              />
              <Stack>
                <Select
                  label="Chọn lĩnh vực"
                  size="sm"
                  required
                  onChange={(value, _: ComboboxItem) =>
                    setSelectedIndustryId(value || "")
                  }
                  defaultValue={selectedIndustryId}
                  variant="filled"
                  data={industryOptions}
                  searchable
                  nothingFoundMessage="Không tìm thấy..."
                />
                <Box>
                  <Text size="xs">
                    * Để lưu nhiều ngành cũng lúc thì nhập tên lĩnh vực rồi
                    enter nhiều lần
                  </Text>
                  <TagsInput
                    name="skills"
                    value={subIndustries}
                    size="sm"
                    onChange={onSubIndustriesChangeHandler}
                    label="Kỹ năng"
                    variant="filled"
                  />
                </Box>
              </Stack>
              <Group mt="md" justify="end">
                <Button color="gray" size="xs" onClick={onClose}>
                  Hủy
                </Button>
                <Button size="xs" onClick={onAddSubIndustriesHanlder}>
                  Lưu
                </Button>
              </Group>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      </Box>
    </>
  );
}
