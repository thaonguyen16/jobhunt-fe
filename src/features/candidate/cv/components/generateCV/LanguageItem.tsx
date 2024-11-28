import {
  Accordion,
  Group,
  Center,
  ActionIcon,
  TextInput,
  Select,
  Textarea,
} from "@mantine/core";
import { MdDeleteForever } from "react-icons/md";
import { LanguageItemType } from "@features/candidate/cv";
import { useRef } from "react";

type LanguageItemProps = {
  languageItem: LanguageItemType;
  deleteLanguageItem: (id: number) => void;
  onItemChange?: (item: LanguageItemType) => void;
};

export default function LanguageItem({
  languageItem,
  deleteLanguageItem,
  onItemChange,
}: LanguageItemProps) {
  const { id, name, description, level } = languageItem;
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const deleteLanguageItemHandler = (id: number) => {
    deleteLanguageItem(id);
  };

  const onTextInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newItem = { ...languageItem, [name]: value };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Set a new timeout to update the state after 0.5 seconds
    debounceTimeout.current = setTimeout(() => {
      onItemChange?.(newItem);
    }, 500);
  };

  const onDescriptionChangeHadler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const newItem = { ...languageItem, description: value };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Set a new timeout to update the state after 0.5 seconds
    debounceTimeout.current = setTimeout(() => {
      onItemChange?.(newItem);
    }, 500);
  };

  const onSelectChangeHandler = (value: string | null) => {
    const newItem = { ...languageItem, name: value || "" };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to update the state after 0.5 seconds
    debounceTimeout.current = setTimeout(() => {
      onItemChange?.(newItem);
    }, 500);
  };

  return (
    <Accordion.Item key={id} value={id + ""}>
      <Center>
        <Accordion.Control>
          {name === "" ? "Chưa xác định" : name}
        </Accordion.Control>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={() => deleteLanguageItemHandler(id)}
        >
          <MdDeleteForever />
        </ActionIcon>
      </Center>
      <Accordion.Panel>
        <Group grow gap="lg">
          <Select
            defaultValue={name}
            variant="filled"
            label="Chọn ngôn ngữ"
            placeholder="Chọn ngôn ngữ"
            onChange={onSelectChangeHandler}
            data={["Tiếng Anh", "Tiếng Nhật", "Tiếng Trung", "Tiếng Hàn"]}
          />

          <TextInput
            name="level"
            label="Trình độ"
            variant="filled"
            defaultValue={level}
            onChange={onTextInputChangeHandler}
            placeholder="TOEIC 200"
          />
        </Group>
        <Textarea
          mt="xs"
          onChange={onDescriptionChangeHadler}
          label="Mô tả"
          defaultValue={description}
          variant="filled"
          placeholder="Nhập mô tả ngắn"
        />
      </Accordion.Panel>
    </Accordion.Item>
  );
}
