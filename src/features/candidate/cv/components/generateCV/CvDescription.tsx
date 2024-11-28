import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Box, Text } from "@mantine/core";
import { useEffect } from "react";

type CvDescriptionProps = {
  description?: string;
  onCvDescriptionChange?: (description: string) => void;
};
export default function CvDescription({
  description,
  onCvDescriptionChange,
}: CvDescriptionProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: description,
  });

  useEffect(() => {
    if (
      editor?.getText !== null ||
      editor?.getText !== undefined ||
      editor?.getText() !== ""
    ) {
      onCvDescriptionChange?.(editor?.getHTML() || "");
    }
  }, [editor?.getHTML()]);
  return (
    <Box>
      <Text size="lg" fw={500}>
        Tóm tắt chuyên môn
      </Text>
      <Text size="sm" fw={500} mb="lg" style={{ color: "#555555" }}>
        Viết 2-4 câu ngắn & đầy năng lượng để thu hút sự quan tâm! Trình bày vai
        trò, kinh nghiệm & quan trọng nhất là - thành tựu lớn nhất, kỹ năng và
        phẩm chất tốt nhất của bạn.
      </Text>
      <RichTextEditor
        editor={editor}
        defaultValue={description}
        style={{ fontSize: "13px" }}
      >
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
  );
}
