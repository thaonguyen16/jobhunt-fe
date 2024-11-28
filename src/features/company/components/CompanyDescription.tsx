import { useState } from "react";
import { CompanySectionContainer } from "..";
import { Text, Group, ActionIcon } from "@mantine/core";
import { RiFilePaper2Fill } from "react-icons/ri";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type CompanyDescriptionProps = {
  description?: string;
};
export default function CompanyDescription({
  description,
}: CompanyDescriptionProps) {
  const [showAll, setShowAll] = useState(false);
  const verifyDescription = description
    ? description.trim()
    : "Không có thông tin hiển thị";

  const textToShow = showAll
    ? verifyDescription
    : verifyDescription.slice(
        0,
        verifyDescription.indexOf(".", verifyDescription.indexOf(".") + 1) + 1
      );

  return (
    <CompanySectionContainer>
      <Group gap="2">
        <RiFilePaper2Fill className={"text-[#e8590c] h-6 w-6"} />
        <Text
          fw="700"
          variant="gradient"
          gradient={{ from: "gray.9 ", to: "gray.8" }}
        >
          Mô tả ngắn về công ty
        </Text>
      </Group>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: textToShow || "" }}
      />
      <div className="flex items-center justify-center">
        <ActionIcon
          size="xs"
          variant="light"
          radius={"xl"}
          onClick={() => setShowAll(!showAll)}
        >
          {!showAll ? (
            <IoIosArrowDown></IoIosArrowDown>
          ) : (
            <IoIosArrowUp></IoIosArrowUp>
          )}
        </ActionIcon>
      </div>
    </CompanySectionContainer>
  );
}
