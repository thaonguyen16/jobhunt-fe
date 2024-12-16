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
import { MdDeleteForever } from "react-icons/md";
import { DatesRangeValue, MonthPickerInput } from "@mantine/dates";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { RichTextEditor } from "@mantine/tiptap";
import { useEffect } from "react";
import { convertToMMYYYY } from "@utils/datetimeUtil";
import { WorkHistoryItemType } from "@features/candidate/cv";

type WorkHistoryItemProps = {
  item: WorkHistoryItemType;
  deleteWorkHistoryItem: (id: number) => void;
  onItemChange?: (item: WorkHistoryItemType) => void;
};

export default function WorkHistoryItem({
  item,
  deleteWorkHistoryItem,
  onItemChange,
}: WorkHistoryItemProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: item.description,
  });

  const deleteWorkHistoryItemHandler = (id: number) => {
    deleteWorkHistoryItem(id);
  };

  const { id, position, companyName, workLocation } = item;

  const onTextInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newItem = { ...item, [name]: value };
    onItemChange?.(newItem);
  };

  const handleOnRangeDate = (values: DatesRangeValue) => {
    const startDate = convertToMMYYYY(values[0]?.toDateString() || "");
    const endDate = convertToMMYYYY(values[1]?.toDateString() || "");
    const newItem = { ...item, startDate, endDate };
    onItemChange?.(newItem);
  };

  useEffect(() => {
    if (
      editor?.getText !== null ||
      editor?.getText !== undefined ||
      editor?.getText() !== ""
    ) {
      const newItem = { ...item, description: editor?.getHTML() || "" };
      onItemChange?.(newItem);
    }
  }, [editor, item, onItemChange]);

  return (
    <Accordion.Item key={id} value={id + ""}>
      <Center>
        <Accordion.Control>{item.companyName}</Accordion.Control>
        <ActionIcon
          size="lg"
          variant="subtle"
          color="gray"
          onClick={() => deleteWorkHistoryItemHandler(id || 0)}
        >
          <MdDeleteForever />
        </ActionIcon>
      </Center>
      <Accordion.Panel>
        <Stack>
          <Group grow gap="lg">
            <TextInput
              name="company"
              label="Công ty"
              variant="filled"
              onChange={(e) => onTextInputChangeHandler(e)}
              defaultValue={companyName}
            />
            <TextInput
              name="position"
              onChange={(e) => onTextInputChangeHandler(e)}
              label="Vị trí"
              variant="filled"
              defaultValue={position}
            />
          </Group>
          <Group grow>
            <MonthPickerInput
              name="dateRange"
              type="range"
              onChange={handleOnRangeDate}
              label="Thời gian làm việc"
              placeholder="Chọn thời gian"
              variant="filled"
            />
            <TextInput
              name="workLocation"
              onChange={(e) => onTextInputChangeHandler(e)}
              label="Nơi làm việc"
              variant="filled"
              defaultValue={workLocation}
            />
          </Group>
          <Box>
            <Text size="sm" fw={500} mb={4}>
              Mô tả công việc
            </Text>
            <RichTextEditor editor={editor}>
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