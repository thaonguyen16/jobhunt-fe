import { Message } from "@data/interface/message";
import { Flex, Text,Button } from "@mantine/core";

export default function Notification({data}:{data: Message}) {
  return (
    <Flex bg={!data.isRead ? "rgba(148,34,34,.2)" : "white"} style={{borderRadius: "10px",cursor: "pointer"}} align={"center"} justify={"flex-start"}>
      <div className="flex flex-col gap-1 p-2 rounded-md">
      <Text size="sm" fw={600} c={!data.isRead ? "rgba(148,34,34,1)" : "black"}>
        {data.title}
      </Text>
      <Text size="xs" lineClamp={5}>
        {data.message}
      </Text>
      
      <Button variant="subtle" w={"fit-content"}>
      Xem chi tiết
      </Button>

    </div>
    </Flex>
  );
}
