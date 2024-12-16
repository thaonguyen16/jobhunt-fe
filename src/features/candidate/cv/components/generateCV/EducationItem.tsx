import {
  Box,
  Text,
  Accordion,
  Group,
  Stack,
  Center,
  ActionIcon,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { DatesRangeValue, MonthPickerInput } from "@mantine/dates";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { Select } from "@mantine/core";
import { convertToMMYYYY } from "@utils/datetimeUtil";
import { EducationItemType } from "@features/candidate/cv";

type EducationItemProps = {
  educationItem: EducationItemType;
  deleteEducationItem: (id: number) => void;
  onItemChange?: (item: EducationItemType) => void;
};

export default function EducationItem({
  educationItem,
  deleteEducationItem,
  onItemChange,
}: EducationItemProps) {
  // config editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const deleteItemHandler = (id: number) => {
    deleteEducationItem(id);
  };

  const { id, schoolName, degree, description } = educationItem;

  const onTextInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newItem = { ...educationItem, [name]: value };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onItemChange?.(newItem);
    }, 500);
  };

  const handleOnRangeDate = (values: DatesRangeValue) => {
    const startDate = convertToMMYYYY(values[0]?.toDateString() || "");
    const endDate = convertToMMYYYY(values[1]?.toDateString() || "");
    const newItem = {
      ...educationItem,
      startDate: startDate,
      endDate: endDate,
    };
    debounceTimeout.current = setTimeout(() => {
      onItemChange?.(newItem);
    }, 500);
  };

  useEffect(() => {
    if (
      editor?.getText !== null ||
      editor?.getText !== undefined ||
      editor?.getText() !== ""
    ) {
      const newItem = {
        ...educationItem,
        description: editor?.getHTML() || "",
      };
      onItemChange?.(newItem);
    }
  }, [editor, educationItem, onItemChange]);

  return (
    <Accordion.Item key={id} value={id + ""}>
      <Center>
        <Accordion.Control>{schoolName || "Chưa xác định"}</Accordion.Control>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={() => deleteItemHandler(id || -1)}
        >
          <MdDeleteForever />
        </ActionIcon>
      </Center>
      <Accordion.Panel>
        <Stack>
          <Group grow gap="lg">
            <TextInput
              name="school"
              label="Trường"
              variant="filled"
              defaultValue={schoolName}
              onChange={onTextInputChangeHandler}
            />
            <Select
              label="Bằng cấp"
              variant="filled"
              onChange={(value) =>
                onItemChange?.({ ...educationItem, degree: value || "" })
              }
              data={["Cử nhân", "Kỹ sư", "Thạc sĩ", "Tiến sĩ"]}
              defaultValue={degree}
            />
          </Group>

          <MonthPickerInput
            type="range"
            label="Thời gian "
            onChange={handleOnRangeDate}
            placeholder="Chọn thời gian"
            variant="filled"
          />

          <Box>
            <Text size="sm" fw={500} mb={4}>
              Mô tả thêm
            </Text>
            <RichTextEditor editor={editor} defaultValue={description}>
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.ClearFormatting />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignJustify />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
          </Box>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>
  );
}