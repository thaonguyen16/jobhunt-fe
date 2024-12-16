import {
  Flex,
  Text,
  Image,
  Group,
  ActionIcon,
  SimpleGrid,
  Skeleton,
  em,
  Tooltip,
} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import IndustryCard from "./IndustryCard";
import { fetchIndustriesNoSub } from "@services/industryService";
import { IndustryCardData } from "@data/interface/industry";

export default function IndustryCardContainer() {
  const [industryData, setIndustryData] = useState<IndustryCardData[] | undefined>(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMediaQuery(`(max-width: ${em(1200)})`);

  useEffect(() => {
    const fetchData = async () => {

      await fetchIndustriesNoSub(currentPage, 16).then((data) => {
       if(data) {
        setIndustryData(data.listData);
        setTotalPage(data.totalPages);
       }
      })

    };

    fetchData();

  }, [currentPage]);



  return (
    <>
      <Flex
        direction={"row"}
        gap={"xs"}
        wrap={"wrap"}
        align={"center"}
        justify={"space-between"}
      >
        <Group>

          <Image src={"src/assets/img/menu.png"} w={40}></Image>
          <Text size="1.4em" fw={800} c={"#0066b2"}>
            Ngành nghề trọng điểm
          </Text>
        </Group>
      </Flex>

      <SimpleGrid cols={isMobile ? 4 : 8} w={"100%"} mt={"1rem"} mb={"0.5rem"} pos={"relative"}>
        {industryData ? (

          <>
            <ActionIcon disabled={currentPage == 0} variant="light" pos={"absolute"} radius={"xl"} top={"42%"} left={-15} style={{ zIndex: 3 }} onClick={() => {
              setIndustryData(undefined);
              setCurrentPage(currentPage - 1);

            }}>
              <IconChevronLeft />
            </ActionIcon>

            {industryData.map((data) => (

              <IndustryCard key={data.id + "I2"} id={data.id} name={data.name} icon={data.icon} numberJob={data.numberJob} />
            ))}
            <ActionIcon variant="light" disabled={currentPage + 1 == totalPage} pos={"absolute"} radius={"xl"} top={"42%"} right={-15} style={{ zIndex: 3 }} onClick={() => {
              setIndustryData(undefined);
              setCurrentPage(currentPage + 1);

            }}>
              <IconChevronRight />
            </ActionIcon>
          </>


        ) : (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((index) => (
              <Skeleton key={index} height={"10rem"} radius={"x1"} />
            ))}
          </>
        )}
      </SimpleGrid>

      <Flex direction={"row"} align={"center"} justify={"center"} gap={"md"} wrap={"nowrap"} mb={"2rem"} mt={"1rem"}>
        <Tooltip label="Trang trước">
          <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled={currentPage == 0} onClick={() => {
            setIndustryData(undefined);
            setCurrentPage(currentPage - 1);

          }}>
            <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={2} />
          </ActionIcon>
        </Tooltip>

        <Text fw={400} c={"brown"}>{currentPage + 1 + " / " + totalPage + " trang"}</Text>

        <Tooltip label="Trang kế tiếp">
          <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled={currentPage + 1 == totalPage} onClick={() => {
            setIndustryData(undefined);
            setCurrentPage(currentPage + 1);

          }}>
            <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={2} />
          </ActionIcon>
        </Tooltip>
      </Flex>

    </>
  );
}
