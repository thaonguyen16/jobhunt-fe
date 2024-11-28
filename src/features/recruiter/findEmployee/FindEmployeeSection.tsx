import { ActionIcon, Center, Text, Container, Flex, Grid, Group, Loader, Overlay, Stack, Tooltip, Pagination } from "@mantine/core";
import FilterCard from "./FilterCard";
import HeaderCard from "./HeaderCard";
import EmployeeCard from "./EmployeeCard";
import { CandidateCV, FilterCandidateCV } from "@data/interface/cv";
import { fetchResumeFilter } from "@services/resumeService";
import { useState } from "react";
import { IconEye } from "@tabler/icons-react";



export default function FindEmployeeSection() {

  const [resume, setResume] = useState<CandidateCV[] | undefined>(undefined)
  const [isloading, setLoading] = useState(false);
  const [hiddenFilter, setHiddentFilter] = useState(false);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [filterData, setFilterData] = useState<FilterCandidateCV>({keyWord: "",
    location: [],
    workMode: "",
    industry: "",
    subIndustry: "",
    experience: -1,
    degree: "",
    salaryMin: 0,
    salaryMax: 0,
    updateSort: true,
    findJobSort: false,
  });


  const handleFindEmployee = async(data: FilterCandidateCV) => {
    setLoading(true);
    setFilterData(filterData);
    await fetchResumeFilter(currentPage, 10,data).then((data) => {
      if (data) {
        setResume(data.listData);
        setTotalItem(data.totalItems);
        setTotalPage(data.totalPages);
        setLoading(false);
      }
    })
  }

  const handleHiddenFilter = (data: boolean) => {
    setHiddentFilter(data);
  }

  const handleSetSort = async (data: string) => {
    if(data == 'UPDATE') {
      setFilterData({...filterData, findJobSort: false});
      setFilterData({...filterData, updateSort: true});
    } 
    else if(data == "SEEKING")
    {
      setFilterData({...filterData, updateSort: false});
      setFilterData({...filterData, findJobSort: true});
    }

    setLoading(true);
    await fetchResumeFilter(currentPage, 10,filterData).then((data) => {
      if (data) {
        setResume(data.listData);
        setTotalItem(data.totalItems);
        setTotalPage(data.totalPages);
        setLoading(false);
      }
    })
  }
  return (

    <>
      {isloading && (
        <Overlay w="100%" h="100%" pos="fixed" blur={2} zIndex={10000}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>
      )}
      <Container maw={"2000px"} bg={"#f4f4f4"} pt={"20px"} mih={"500px"} pb={"100px"} ml={"0px"} className="filter-card">
        {!hiddenFilter ? <Grid w={"100%"}>
          <Grid.Col span={{ base: 12, sm: 3.5, xs: 12 }}>
            <FilterCard submit={handleFindEmployee} hiddenF={handleHiddenFilter}></FilterCard>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 8.5, xs: 12 }}>
            <Stack gap={"sm"}>
              <HeaderCard changeValue={handleSetSort}></HeaderCard>
              <EmployeeCard resumData={resume} hiddenF={hiddenFilter} totalItem={totalItem}></EmployeeCard>
              {resume && resume.length != 0 &&  <Flex direction={"row"} align={"center"} justify={"center"} w={"100%"} mt={"1rem"} mb={"3rem"}>
                <Pagination total={totalPage} value={currentPage + 1} onChange={(value) => {
                  setCurrentPage(value - 1);
                  handleFindEmployee(filterData);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }} color={"#A64D79"} size="sm" radius="xl" withEdges />
              </Flex>}
            </Stack>
          </Grid.Col>
        </Grid> : <Stack>
          <Flex w={"100%"} justify={"space-between"} wrap={"nowrap"} gap={"md"}>
            <Flex direction={"row"} w={"30%"} wrap={"wrap"} bg={"rgba(255,255,255,.9"} style={{ borderRadius: "10px" }}>
              <Group w={"100%"} justify="space-between" p={"sm"}>
                <Text size="md" fw={"700"} c={"#0581e6"}>
                  Tìm kiếm cơ bản
                </Text>
                <Group>

                  <Tooltip label="Hiện bộ lọc">
                    <ActionIcon color="blue" onClick={() => { setHiddentFilter(false) }} variant="subtle">
                      <IconEye stroke={1} />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </Group>

            </Flex>
            <HeaderCard changeValue={handleSetSort}></HeaderCard>

          </Flex>
          <EmployeeCard resumData={resume} hiddenF={hiddenFilter} totalItem={totalItem}></EmployeeCard>
          {resume && resume.length != 0 &&  <Flex direction={"row"} align={"center"} justify={"center"} w={"100%"} mt={"1rem"} mb={"3rem"}>
                <Pagination total={totalPage} value={currentPage + 1} onChange={(value) => {
                  setCurrentPage(value - 1);
                  handleFindEmployee(filterData);
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
                }} color={"#A64D79"} size="sm" radius="xl" withEdges />
              </Flex>}
        </Stack>
        }
      </Container>
    </>
  );
}
