import { Text } from "@mantine/core";

type FormHeaderProps = {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
};

export default function FormHeader(props: FormHeaderProps) {
  return (
    <div className="flex flex-col">
      <Text
        fw={700}
        size="md"
        variant="gradient"
        gradient={{ from: "blue.8", to: "cyan", deg: 90 }}
      >
        {props.title}
      </Text>
      <Text style={{ color: "#7c7c7c" }} size="sm">
        {props.subtitle}
      </Text>
    </div>
  );
}
