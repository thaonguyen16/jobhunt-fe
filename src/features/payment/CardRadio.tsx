import { Group, Radio, Text, Image } from "@mantine/core";
type RadioDataProps = {
  id: number,
  name: string,
  icon: string,
  background: string,
  border: string
}


export default function CardRadio(props: RadioDataProps) {

  return (
    <Radio.Card radius="md" value={props.name} key={props.name} checked
    style={{
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      padding: "10px",
      borderRadius: "10px",
      backgroundColor: props.background,
      border: props.border,
    }}
    >
      <Group wrap="nowrap" align="flex-start" style={{display: "flex",justifyContent:"flex-start",alignItems:"center"}}>
        <Radio.Indicator/>
        <Image src={props.icon} h="40px" w="80px"></Image>
        <Text size="15px">{props.name}</Text>
      </Group>
    </Radio.Card>
  );
}