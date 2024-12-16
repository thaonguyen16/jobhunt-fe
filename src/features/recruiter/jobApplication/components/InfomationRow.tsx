import { Group, Text } from "@mantine/core";

type InformationRowProps = {
  label?: string;
  value?: string;
};

export default function InformationRow(props: InformationRowProps) {
  const { label, value } = props;
  return (
    <Group gap="xs">
      <Text size="xs" fw="500">
        {label + ":"}
      </Text>
      <Text size="xs">{value}</Text>
    </Group>
  );
}
