import { CandidateCV } from "@data/interface/cv";
import { em, Flex, SimpleGrid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import CandidateCard from "./partials/candidateCard";

export default function EmployeeCard({ resumData, hiddenF,totalItem }: { resumData?: CandidateCV[], hiddenF: boolean,totalItem: number }) {
  const isMobile = useMediaQuery(`(max-width: ${em(1200)})`)
  return (
    <>
      {resumData && <Text ta={"left"} size="15px" fw={"700"} c={"#0581e6"} mt={"10px"} mb={"10px"}>
        Tìm thấy <Text component="span" size="lg" c={"orange"} fw={700}>{totalItem}</Text> ứng viên phù hợp
      </Text>}
      {resumData && <SimpleGrid cols={hiddenF && !isMobile ? 2 : 1}>
        <CandidateCard resumData={resumData} key={resumData[0]?.name + resumData[0]?.address}></CandidateCard>
      </SimpleGrid>}

      {!resumData && <Flex w={"100%"} h={"10rem"} justify={"center"} align={"center"}>
        <Text fw={600} size="sm">Vui lòng chọn tiêu chí tìm kiếm</Text>
      </Flex>}

    </>
  );
}
