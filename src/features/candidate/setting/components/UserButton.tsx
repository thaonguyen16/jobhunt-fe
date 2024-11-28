import { Avatar, Group, UnstyledButton, Text, rem } from "@mantine/core";
import "../setting.scss"
import { IconChevronDown } from "@tabler/icons-react";
export default function UserButton() {
  return (
    <>
      <UnstyledButton className={"user"}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          radius="xl"
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            Bùi Thanh Duy
          </Text>

          <Text c="dimmed" size="xs">
            Software Engineer
          </Text>
        </div>

        <IconChevronDown style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
      </Group>
    </UnstyledButton>
    </>
  );
}
