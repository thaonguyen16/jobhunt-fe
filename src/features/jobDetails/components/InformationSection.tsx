import { Text } from "@mantine/core";

type InformationSectionProps = {
  header?: string;
  Htmlcontent?: React.ReactNode;
  html?: boolean;
  textContent?: string;
};

export default function InformationSection(props: InformationSectionProps) {
  return (
    <div className="py-4">
      <Text fw={500} size="sm">
        {props.header}
      </Text>
      <div className={`${!props.html ? "text-sm mt-2" : ""}`}>
        {props.html ? props.Htmlcontent : props.textContent}
      </div>
    </div>
  );
}
