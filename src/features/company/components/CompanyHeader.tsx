import { TbWorldWww } from "react-icons/tb";
import {
  Avatar,
  BackgroundImage,
  Group,
  Text,
  Stack,
  Badge,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { MdGroups2 } from "react-icons/md";

type CompanyHeaderProps = {
  companyName?: string;
  companyLogo?: string;
  companyWebsite?: string;
  companySize?: string;
};

export default function CompanyHeader(props: CompanyHeaderProps) {
  return (
    <BackgroundImage
      px="lg"
      src="/src/assets/img/layer.jpg"
      style={{ borderRadius: "8px 8px 0  0" }}
      py="lg"
    >
      <Stack>
        <Group>
          <Avatar size="xl" src={props.companyLogo}></Avatar>
          <Text style={{ color: "#fff" }} fw="500">
            {props.companyName}
          </Text>
        </Group>

        <Group gap="lg" justify="end">
          <Group gap="4">
            <Badge
              variant="gradient"
              py="1"
              color="gray"
              size="lg"
              leftSection={
                <TbWorldWww className="text-primary-100 h-4 w-4"> </TbWorldWww>
              }
              style={{ textTransform: "none" }}
            >
              <Link
                to={props.companyWebsite || ""}
                target="_blank"
                rel="noreferrer"
              >
                <Text style={{ color: "#fff" }} size="xs">
                  {" "}
                  {props.companyWebsite}
                </Text>
              </Link>
            </Badge>
          </Group>
          <Group gap="4">
            <Badge
              variant="gradient"
              py="1"
              color="gray"
              size="lg"
              leftSection={
                <MdGroups2 className="text-primary-100 w-5 h-5"></MdGroups2>
              }
              style={{ textTransform: "none" }}
            >
              <Text style={{ color: "#fff" }} size="xs">
                {props.companySize}
              </Text>
            </Badge>
          </Group>
        </Group>
      </Stack>
    </BackgroundImage>
  );
}
