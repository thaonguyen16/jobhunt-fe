import { Text, Badge } from "@mantine/core";

type KeyInfoProps = {
  industry?: string;
  subIndustries?: string[];
};

export default function KeyInfo(props: KeyInfoProps) {
  return (
    <>
      <div className="major mb-4">
        <Text fw={500} size="sm">
          Lĩnh vực
        </Text>
        <div className="inline-block mt-2">
          <Badge style={{ textTransform: "none" }} variant="light">
            {props.industry}
          </Badge>
        </div>
      </div>
      <div className="skills">
        <Text fw={500} size="sm">
          Ngành nghề
        </Text>
        <div className="inline-block mt-2">
          {props.subIndustries?.map((subIndustry) => (
            <Badge style={{ textTransform: "none" }} variant="light" ml="3">
              {subIndustry}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
