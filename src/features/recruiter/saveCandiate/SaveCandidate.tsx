import { useEffect, useState } from "react";
import CandidateCard from "../findEmployee/partials/candidateCard";
import { CandidateCV } from "@data/interface/cv";
import { getAllSaveCandidate } from "../../../api/resume";
import { Flex, Loader, Pagination, Text } from "@mantine/core";
import { MediumContainer } from "@components/ui";

export default function SaveCandidate() {

  const [saveList, setSaveList] = useState<CandidateCV[]>([]);
  const [totalItem, setTotalItem] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getData = async () => {
      await getAllSaveCandidate(currentPage, 10).then((data) => {
        console.log(data)
        setLoading(false);
        setSaveList(data.favorite_jobs.listData);
        setTotalItem(data.favorite_jobs.totalItems);
        setTotalPage(data.favorite_jobs.totalPages);
      })
    }

    getData();

  }, [currentPage]);

  return <>
    <MediumContainer >
      <Text mb={"1rem"} c={"blue"} fw={500} size="md">Bạn đã lưu <Text component="span" c={"orange"} fw={700} size="lg">{totalItem}</Text> ứng viên</Text>
      {!loading && <Flex direction={"column"} gap={"xs"}>
        <CandidateCard resumData={saveList} />
      </Flex>}
      {loading && <Flex w={"100%"} h={"100%"} align={"center"} justify={"center"}>
        <Loader type="dots" color="teal" />
      </Flex>}
      {saveList && saveList.length != 0 && <Flex direction={"row"} align={"center"} justify={"center"} w={"100%"} mt={"1rem"} mb={"3rem"}>
        <Pagination total={totalPage} value={currentPage + 1} onChange={(value) => {
          setCurrentPage(value - 1);
          setLoading(true);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }} color={"#A64D79"} size="sm" radius="xl" withEdges />
      </Flex>}
    </MediumContainer>
  </>
}