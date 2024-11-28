import {
  ActionIcon,
  rem,
  TextInput,
 
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconUserSearch } from "@tabler/icons-react";

export default function SearchText({keyWord, submit}:{keyWord: (data: string) => void, submit: () => void}) {
  const theme = useMantineTheme();

  return (
    <TextInput
      w={"100%"}
      radius="sm"
      size="sm"
      mt={"10px"}
      placeholder="Tên ứng viên, vị trí công việc"
      rightSectionWidth={42}
      leftSection={
        <IconUserSearch stroke={1} color="teal" />
      }
      onChange={(event) => {
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
