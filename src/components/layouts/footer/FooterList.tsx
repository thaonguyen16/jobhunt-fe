import {Text,Stack} from "@mantine/core"

type FooterListProps = {
  children?: React.ReactNode;
  name: string;
};
export default function FooterList(props: FooterListProps) {
  return (
    <Stack>
      <Text c={"rgba(255,255,255,.8)"} fw={600}>{props.name}</Text>
      <ul className="flex flex-col gap-3">{props.children}</ul>
    </Stack>
  );
}
