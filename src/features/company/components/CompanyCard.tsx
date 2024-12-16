import { Group, Text, Card, Stack } from "@mantine/core";
import { CompanyLogo } from "..";
import { useNavigate } from "react-router-dom";
import style from "./CompanyCard.module.css";

export type CompanyCardProps = {
  image?: string;
  name?: string;
  id?: number;
  description?: string;
  jobNumber?: number;
};

export default function CompanyCard(props: CompanyCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className={style["company-card"]}
      padding="xs"
      radius="md"
      withBorder
      shadow="sm"
      style={{
        cursor: "pointer",
      }}
      onClick={() => {
        navigate(`/cong-ty/${props.id}`);
      }}
    >
      <Group>
        <CompanyLogo src={props.image} />

        <Stack gap="xs" w={"60%"} justify="flex-start">
          <Text size="sm" style={{ color: "#333" }} fw={700} lineClamp={2}>
            {props.name}
          </Text>
          <div
            className="line-clamp-3 text-[10px] text-gray-300 font-semibold"
            dangerouslySetInnerHTML={{
              __html: props.description || " ",
            }}
          />
          <Text size="xs" fw="500" style={{ color: "#008055" }}>
            {props.jobNumber} công việc đang tuyển
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}
