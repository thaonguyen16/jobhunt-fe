import styles from "./HTMLContent.module.css";
import { Stack, Text } from "@mantine/core";

type HtmlContenProps = {
  htmlContent?: string;
  label?: string;
};

export default function HtmlContent({ htmlContent, label }: HtmlContenProps) {
  return (
    <Stack gap={1}>
      <Text fw={500} size="sm">
        {label}
      </Text>
      <div
        className={`${styles["html-content"]} bg-gray-50  py-4 px-6 rounded-sm`}
        dangerouslySetInnerHTML={{ __html: htmlContent || "" }}
      />
    </Stack>
  );
}
