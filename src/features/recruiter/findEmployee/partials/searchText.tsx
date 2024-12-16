import {
  ActionIcon,
  rem,
  TextInput,
 
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconUserSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function SearchText({keyWord, submit,resetFilter}:{keyWord: (data: string) => void, submit: () => void, resetFilter: boolean}) {
  const theme = useMantineTheme();
  const [value, setValue] = useState("");

  useEffect(() => {
    if(resetFilter) {
      setValue("");
    }
  },[resetFilter]);

  return (
    <TextInput
      w={"100%"}
      radius="sm"
      size="sm"
      mt={"10px"}
      value={value}
      placeholder="Tên ứng viên, vị trí công việc"
      rightSectionWidth={42}
      leftSection={
        <IconUserSearch stroke={1} color="teal" />
      }
      onChange={(event) => {
        setValue(event.target.value);
        keyWord(event.target.value);
      }}
      style={{ fontSize: "14px" }}
      rightSection={
        <ActionIcon
          size={25}
          radius="xl"
          color={theme.primaryColor}
          variant="gradient"
          onClick={() => submit()}
        >
          <IconArrowRight
            style={{ width: rem(14), height: rem(14) }}
            stroke={1.5}
          />
        </ActionIcon>
      }
    
    />
  );
}
