import { JobCardData } from "@data/interface/job";
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
  Container,

} from "@mantine/core";
import { fetchJobSuggest } from "@services/jobService";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import JobCard from "./Card";
import { ColorData } from "@data/constants/color";
import { useMediaQuery } from "@mantine/hooks";

export default function SuggestJobCardContainer() {
  const [jobHot, setJobHot] = useState<JobCardData[] | undefined>(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMediaQuery(`(max-width: ${em(1200)})`);

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobSuggest(currentPage,9).then((job) => {
        if(job) {
          setJobHot(job.listData);
        setTotalPage(job.totalPages);
        }
      });
    };

    fetchData();
  }, [currentPage]);


  return (
    jobHot?.length != 0 && <Container mb={"2rem"} mt={"2rem"} bg={"white"} style={{borderRadius: "20px"}} w={"100%"} maw={"2000"} pos={"relative"} pt={"2rem"} pb={"1rem"}>
    <Flex
      direction={"row"}
      gap={"xs"}
      wrap={"wrap"}
      align={"center"}
      justify={"space-between"}
      bg={"white"}
    >
      <Group>
        
        <Image src={"src/assets/img/recommend.png"} w={50}></Image>
        <Text size="1.4em" fw={800} c={"#0066b2"}>
          Gợi ý việc làm
        </Text>
      </Group>
      <Group>
      <Tooltip label="Trang trước">
      <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage == 0} onClick={() => {
      setJobHot(undefined);
      setCurrentPage(currentPage - 1);
    
    }}>

          <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>
        </Tooltip>
        <Tooltip label="Trang kế tiếp">
        <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage + 1 == totalPage} onClick={() => {
          setJobHot(undefined);
          setCurrentPage(currentPage + 1);
          
        }}>
          <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>
        </Tooltip>
      </Group>
    </Flex>

    <SimpleGrid cols={isMobile ? 1 : 3} w={"100%"} mt={"1rem"} mb={"0.5rem"} pos={"relative"}>
      {jobHot ? (
        jobHot.map((data,index) => (
          <JobCard
                key={data.id + "J0"}
                id={data.id}
                title={data.title}
                deadline={data.deadline}
                updatedAt={data.updatedAt}
                salary={data.salary}
                company={data.company}
                location={data.location}
                industry={data.industry}
                isSaved={data.isSaved}
                color={ColorData.filter(e => e.id == data.industry.id)[0] ? ColorData.filter(e => e.id == data.industry.id)[0].color : ColorData[index].color}
                isHot={data.isHot} border={true}            />
        ))
      ) : (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <Skeleton key={index} height={"10rem"} radius={"x1"}/>
          ))}
        </>
      )}
    </SimpleGrid>

    <Flex mt={"1rem"} direction={"row"} align={"center"} justify={"center"} gap={"md"} wrap={"nowrap"} mb={"2rem"}>
    <Tooltip label="Trang trước">
    <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage == 0} onClick={() => {
      setJobHot(undefined);
      setCurrentPage(currentPage - 1);
    
    }}>
          <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>
        </Tooltip>

        <Text fw={400} c={"purple"}>{currentPage + 1 + " / " + totalPage + " trang"}</Text>

        <Tooltip label="Trang kế tiếp">
        <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage + 1 == totalPage} onClick={() => {
          setJobHot(undefined);
          setCurrentPage(currentPage + 1);
          
        }}>
          <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={2} />
        </ActionIcon>
        </Tooltip>
    </Flex>

  </Container>
  );
}
