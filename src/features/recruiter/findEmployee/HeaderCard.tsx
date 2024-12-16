import { CheckIcon, Flex, Group, Radio, Text } from "@mantine/core";
import { useState } from "react";

export default function HeaderCard({changeValue}:{changeValue: (data: string) => void}) {

  const [value, setValue] = useState("UPDATE");

  return (
    <Flex bg={"rgba(255,255,255,.6"} w={"100%"} direction={"row"} wrap={"wrap"} h={"3rem"} p={"xs"} align={"center"} justify={"flex-start"}>
      <Text ta={"left"} size="sm">
        Ưu tiên hiển thị
      </Text>
      <Radio.Group name="Priority" ml={"3rem"} value={value} onChange={(value) => {
        setValue(value);
        changeValue(value);
      }}>
        <Group>
          <Radio

            variant="outline"
            size="xs"
            icon={CheckIcon}
            label={<Text size="sm">Mới cập nhật</Text>}
            value="UPDATE"


          />
          <Radio
            variant="outline"
            icon={CheckIcon}
            label={<Text size="sm">Đang tìm việc</Text>}

            value="SEEKING"
            size="xs"

          />
        </Group>
      </Radio.Group>
    </Flex>
  );
}
