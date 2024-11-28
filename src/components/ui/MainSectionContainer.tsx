import { Text } from "@mantine/core";

type MainSectionContainerProps = {
  children: React.ReactNode;
  heading?: string;
};

export default function MainSectionContainer({
  children,
  heading,
}: MainSectionContainerProps) {
  return (
    <div className="p-4">
      <Text size="md" fw={500} style={{ color: "#0581e6" }}>
        {heading}
      </Text>
      {children}
    </div>
  );
}
