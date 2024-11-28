import { DatesRangeValue, MonthPickerInput } from "@mantine/dates";
import { Group, TextInput } from "@mantine/core";
import { ProjectItemType } from "@features/candidate/cv";
import { Box, Text, Accordion, Stack, Center, ActionIcon } from "@mantine/core";
import { useEffect, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { convertToMMYYYY } from "@utils/datetimeUtil";
import { EducationItemType } from "@features/candidate/cv";

type ProjectItemProps = {
  onItemChange?: (item: ProjectItemType) => void;
  item: ProjectItemType;
  deleteProjectItem?: (id: number) => void;
};

export default function ProjectItem({
  item,
  deleteProjectItem,
  onItemChange,
}: ProjectItemProps) {
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

  const handleDeleteProjectItem = () => {
    if (item.id) {
      deleteProjectItem?.(item.id);
    }
  };

  const onTextInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newItem = { ...item, [name]: value };

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
      ...item,
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
        ...item,
        description: editor?.getHTML() || "",
      };
      debounceTimeout.current = setTimeout(() => {
        onItemChange?.(newItem);
      }, 500);
    }
  }, [editor?.getHTML()]);

  return (
    <Accordion.Item key={item.id} value={item.id + ""}>
      <Center>
        <Accordion.Control>{item.name || "Chưa xác định"}</Accordion.Control>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={handleDeleteProjectItem}
        >
          <MdDeleteForever />
        </ActionIcon>
      </Center>
      <Accordion.Panel>
        <Stack>
          <Group grow gap="lg">
            <TextInput
              name="name"
              onChange={onTextInputChangeHandler}
              label="Tên dự án"
              variant="filled"
              defaultValue={item.name}
            />
            <MonthPickerInput
              type="range"
              label="Thời gian "
              onChange={handleOnRangeDate}
              placeholder="Chọn thời gian"
              variant="filled"
            />
          </Group>
          <Box>
            <Text size="sm" fw={500} mb={4}>
              Mô tả
            </Text>
            <RichTextEditor editor={editor} defaultValue={item.description}>
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
