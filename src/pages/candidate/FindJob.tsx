/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MediumContainer } from "@components/ui";
import ComboBoxGeneral from "@features/candidate/findJob/ComboBoxLocationFJ";
import ComboBoxIndustryFJ from "@features/candidate/findJob/ComboBoxIndustryFJ";
import {
  Button,
  Container,
  em,
  Flex,
  SimpleGrid,
  Skeleton,
  TextInput,
  Text,
  Transition,
  Tooltip,
  Pagination,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconFilter, IconFilterOff, IconSearch } from "@tabler/icons-react";
import ComboBoxWorkModeFJ from "@features/candidate/findJob/ComboBoxWorkModeFJ";
import ComboBoxSalaryFJ from "@features/candidate/findJob/ComboBoxSalaryFJ";
import { useEffect, useState } from "react";
import { ColorData } from "@data/constants/color";
import { JobCardData } from "@data/interface/job";
import JobCard from "@features/job/components/card/Card";
import ComboBoxSortFJ from "@features/candidate/findJob/ComboBoxSortFJ";
import ComboBoxExperienceFJ from "@features/candidate/findJob/ComboBoxExperienceFJ";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { searchJobs } from "@/api/job";
import { TbReload } from "react-icons/tb";
import { PaginationRespone } from "@data/interface/respone";

const groceries = [
  {
    value: "",
    label: "Mặc định",
  },
  {
    value: "TIME_ASC",
    label: "Ngày đăng (cũ nhất)",
  },
  {
    value: "SALARY",
    label: "Mức lương (cao - thấp)",
  },
  {
    value: "HOT",
    label: "Việc làm tuyển gấp",
  },
];

export type FilterData = {
  locationIds: number[];
  industryIds: number[];
  subIndustryIds: number[];
  keyword: string;
  workModeId?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  experienceId?: string | null;
};

export default function FindJob() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const [showFilterAdvance, setShowFiltrAdvance] = useState(false);
  const [filterJobs, setFilterJobs] = useState<JobCardData[] | undefined>(
    undefined
  );
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const location = useLocation();
  const filterData = location.state;
  const [currentPage, setCurrentPage] = useState(0);
  const [listLocation, setListLocation] = useState<string[]>(
    filterData ? filterData.locationIds : []
  );
  const [listIndustry, setListIndustry] = useState<string[]>(
    filterData ? filterData.industryIds : []
  );
  const [listSubIndustry, setListSubIndustry] = useState<string[]>(
    filterData ? filterData.subIndustryIds : []
  );
  const [keyword, setKeyword] = useState<string>(
    filterData ? filterData.keyword : ""
  );
  const [workModeId, setWorkModeId] = useState<string>("");
  const [salary, setSalary] = useState<[number, number]>([0, 0]);
  const [experienceId, setExperienceId] = useState<string>("");

  const [sortType, setSortType] = useState<string>(groceries[0].label);

  const searchJobMutation = useMutation<
    PaginationRespone,
    Error,
    { page: number; size: number; sortType: string; filterData: FilterData }
  >({
    mutationFn: searchJobs,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setFilterJobs(data.listData);
      setTotalItem(data.totalItems);
      setTotalPage(data.totalPages);
    },
  });

  useEffect(() => {
    searchJobMutation.mutate({
      page: currentPage,
      size: 8,
      sortType: sortType,
      filterData: {
        locationIds: listLocation.map((e) => Number(e)),
        industryIds: listIndustry.map((e) => Number(e)),
        subIndustryIds: listSubIndustry.map((e) => Number(e)),
        keyword: keyword,
        workModeId: workModeId,
        minSalary: salary[0] === 0 ? null : salary[0] * 1000000,
        maxSalary: salary[1] === 0 ? null : salary[1] * 1000000,
        experienceId: experienceId,
      },
    });
  }, [currentPage, sortType]);

  const handleSearchData = () => {
    searchJobMutation.mutate({
      page: currentPage,
      size: 8,
      sortType: sortType,
      filterData: {
        locationIds: listLocation.map((e) => Number(e)),
        industryIds: listIndustry.map((e) => Number(e)),
        subIndustryIds: listSubIndustry.map((e) => Number(e)),
        keyword: keyword,
        workModeId: workModeId,
        minSalary: salary[0] === 0 ? null : salary[0] * 1000000,
        maxSalary: salary[1] === 0 ? null : salary[1] * 1000000,
        experienceId: experienceId,
      },
    });
  };

  const handleAdvanceFilter = () => {
    setShowFiltrAdvance(!showFilterAdvance);
    setWorkModeId("");
    setSalary([0, 0]);
    setExperienceId("");
  };

  const resetFilterHandler = () => {
    setListLocation([]);
    setListIndustry([]);
    setListSubIndustry([]);
    setKeyword("");
    setWorkModeId("");
    setSalary([0, 0]);
    setExperienceId("");
  };

  return (
    <MediumContainer>
      {/* Search bar */}
      <Container w={"100%"} maw={2000} h={!isMobile ? "7rem" : "18rem"} p={0}>
        <Flex
          direction={!isMobile ? "row" : "column"}
          gap={"md"}
          justify={"space-between"}
          align={"center"}
        >
          <Flex
            pl={"sm"}
            pr={"sm"}
            direction={"row"}
            gap={"md"}
            w={!isMobile ? "40%" : "100%"}
            h={"3rem"}
            align={"center"}
            justify={"flex-start"}
            bg={"white"}
            style={{ borderRadius: "10px" }}
          >
            <IconSearch />
            <TextInput
              value={keyword}
              defaultValue={keyword}
              onChange={(e) => setKeyword(e.currentTarget.value)}
              w={"100%"}
              variant="transparent"
              placeholder="Nhập tên công việc"
              size="md"
            />
          </Flex>
          <ComboBoxGeneral value={listLocation} setValue={setListLocation} />
          <ComboBoxIndustryFJ
            setSelectedIndustry={setListIndustry}
            selectedIndustry={listIndustry}
            setSelectedSubIndustry={setListSubIndustry}
            selectedSubIndustry={listSubIndustry}
          />

          <Flex
            direction={"row"}
            justify={"center"}
            align={"center"}
            w={!isMobile ? "20%" : "100%"}
            gap={"xs"}
          >
            <Button
              onClick={handleSearchData}
              size="sm"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              Tìm kiếm
            </Button>
            <Tooltip label={!showFilterAdvance ? "Lọc thêm" : "Đóng"}>
              <ActionIcon variant="subtle" onClick={handleAdvanceFilter}>
                {!showFilterAdvance ? (
                  <IconFilter size={14} />
                ) : (
                  <IconFilterOff size={14} />
                )}
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Bỏ lọc">
              <ActionIcon variant="subtle" onClick={resetFilterHandler}>
                <TbReload />
              </ActionIcon>
            </Tooltip>
          </Flex>
        </Flex>
        <Transition
          mounted={showFilterAdvance}
          transition="slide-down"
          duration={500}
          keepMounted
          timingFunction="ease"
        >
          {(styles) => (
            <Container
              hidden={!showFilterAdvance}
              style={{ ...styles, overflow: "hidden" }}
              w={"100%"}
              maw={2000}
            >
              <Flex
                direction={"row"}
                justify={"flex-start"}
                align={"center"}
                mt={"1rem"}
                gap={"md"}
              >
                <ComboBoxWorkModeFJ
                  getMobile={isMobile ? isMobile : false}
                  selectedWorkMode={workModeId}
                  setSelectedWorkMode={setWorkModeId}
                />
                <ComboBoxSalaryFJ
                  getMobile={isMobile ? isMobile : false}
                  setValue={setSalary}
                  value={salary}
                />
                <ComboBoxExperienceFJ
                  getMobile={isMobile ? isMobile : false}
                  selectedExp={experienceId}
                  setSelectedExp={setExperienceId}
                />
              </Flex>
            </Container>
          )}
        </Transition>
        <Transition
          mounted={showFilterAdvance}
          transition="slide-up"
          duration={500}
          keepMounted
          timingFunction="ease"
        >
          {(styles) => (
            <Container
              hidden={showFilterAdvance}
              style={{ ...styles, overflow: "hidden" }}
              w={"100%"}
              maw={2000}
            >
              <Flex
                direction={"row"}
                justify={"flex-start"}
                align={"center"}
                mt={"1rem"}
                gap={"md"}
              >
                <ComboBoxWorkModeFJ
                  getMobile={isMobile ? isMobile : false}
                  selectedWorkMode={workModeId}
                  setSelectedWorkMode={setWorkModeId}
                />
                <ComboBoxSalaryFJ
                  getMobile={isMobile ? isMobile : false}
                  setValue={setSalary}
                  value={salary}
                />
                <ComboBoxExperienceFJ
                  getMobile={isMobile ? isMobile : false}
                  selectedExp={experienceId}
                  setSelectedExp={setExperienceId}
                />
              </Flex>
            </Container>
          )}
        </Transition>
      </Container>
      {/* Job Card */}
      <Flex
        direction={"row"}
        align={"center"}
        justify={"flex-start"}
        w={"100%"}
        gap={"xs"}
      >
        <Text fw={500} c={"rgba(0,0,0,.7"}>
          Tìm Thấy
        </Text>
        <Text fw={800} size={"1.5rem"} c={"#A64D79"}>
          {totalItem}
        </Text>
        <Text fw={500} c={"rgba(0,0,0,.7"}>
          công việc
        </Text>
      </Flex>
      <Flex direction={"row"} justify={"flex-end"} align={"center"} w={"100%"}>
        <ComboBoxSortFJ
          getMobile={isMobile ? isMobile : false}
          groceries={groceries}
          value={sortType}
          setValue={setSortType}
        />
      </Flex>

      <SimpleGrid
        cols={isMobile ? 1 : 2}
        w={"100%"}
        mt={"1rem"}
        mb={"0.5rem"}
        pos={"relative"}
      >
        {filterJobs && !searchJobMutation.isPending ? (
          filterJobs.map((data, index) => (
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
              color={
                ColorData.filter((e) => e.id == Number(data.industry.id))[0]
                  ? ColorData.filter(
                      (e) => e.id === Number(data.industry.id)
                    )[0].color
                  : ColorData[index].color
              }
              isHot={data.isHot}
              border={false}
            />
          ))
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Skeleton
                key={index}
                visible={searchJobMutation.isPending}
                height={"10rem"}
                radius={"x1"}
              />
            ))}
          </>
        )}
      </SimpleGrid>
      <Flex
        direction={"row"}
        align={"center"}
        justify={"center"}
        w={"100%"}
        mt={"1rem"}
        mb={"3rem"}
      >
        <Pagination
          total={totalPage}
          value={currentPage + 1}
          onChange={(value) => {
            setCurrentPage(value - 1);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          color={"#A64D79"}
          size="sm"
          radius="xl"
          withEdges
        />
      </Flex>
    </MediumContainer>
  );
}