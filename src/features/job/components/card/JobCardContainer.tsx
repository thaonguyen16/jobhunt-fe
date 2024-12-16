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

} from "@mantine/core";
import { fetchJobHot } from "@services/jobService";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import JobCard from "./Card";
import { ColorData } from "@data/constants/color";
import { useMediaQuery } from "@mantine/hooks";

export default function JobCardContainer() {
  const [jobHot, setJobHot] = useState<JobCardData[] | undefined>(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isTablet = useMediaQuery(`(max-width: ${em(1200)})`);

  useEffect(() => {
    const fetchData = async () => {
      await fetchJobHot(currentPage,9).then((job) => {
        if(job) {
          setJobHot(job.listData);
        setTotalPage(job.totalPages);
        }
      });
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
          
          <Image src={"src/assets/img/hot.png"} w={50}></Image>
          <Text size="1.4em" fw={800} c={"#0066b2"}>
            Việc làm nổi bật
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

      <SimpleGrid cols={isTablet ? 1 : 3} w={"100%"} mt={"1rem"} mb={"0.5rem"} pos={"relative"}>
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
              isHot={data.isHot} border={false}/>
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

          <Text fw={400} c={"green"}>{currentPage + 1 + " / " + totalPage + " trang"}</Text>

          <Tooltip label="Trang kế tiếp">
          <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage + 1 == totalPage} onClick={() => {
            setJobHot(undefined);
            setCurrentPage(currentPage + 1);
            
          }}>
            <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={2} />
          </ActionIcon>
          </Tooltip>
      </Flex>

    </>
  );
}
