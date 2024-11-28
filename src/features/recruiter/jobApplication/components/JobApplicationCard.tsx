import { Button, Text, Avatar, Card, Stack } from "@mantine/core";

import { InformationRow } from "..";

type JobApplicationCardProps = {
  id?: number | null;
  avatar?: string;
  name?: string;
  phone?: string;
  email?: string;
  pending?: boolean;
  openJobApplicationModal?: () => void;
  setJobApplicationId?: (id: number) => void;
};

export default function JobApplicationCard(props: JobApplicationCardProps) {
  const { id, avatar, name, phone, email } = props;

  const shortenEmail = (email: string | undefined) => {
    if (!email) return "";
    const maxLength = 20;
    if (email.length <= maxLength) return email;
    const [localPart, domain] = email.split("@");
    const shortenedLocalPart =
      localPart.length > 10 ? localPart.slice(0, 10) + "..." : localPart;
    return `${shortenedLocalPart}@${domain}`;
  };

  const shortenedEmail = shortenEmail(email);

  return (
    <Card
      shadow="sm"
      withBorder
      color="gray.8"
      padding="md"
      radius="md"
      style={{ position: "relative" }}
    >
      <Avatar src={avatar} alt="user avatar" size="lg" mx="auto" />
      <Stack gap="xs">
        <Text size="sm" fw={500} style={{ textAlign: "center" }}>
          {name}
        </Text>
        <InformationRow label="Email" value={shortenedEmail}></InformationRow>
        <InformationRow label="SĐT" value={phone}></InformationRow>
      </Stack>

      <Button
        size="xs"
        onClick={() => {
          if (!props.openJobApplicationModal || !props.setJobApplicationId) {
            return;
          }
          props.openJobApplicationModal();
          props.setJobApplicationId(id || 0);
        }}
        mt="sm"
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 120 }}
      >
        Xem hồ sơ
      </Button>
    </Card>
  );
}
