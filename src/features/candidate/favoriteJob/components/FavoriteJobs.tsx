import { MainSectionContainer } from "@components/ui";
import { Text, Pagination, Stack, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import { JobCard } from "@features/job";
import { CandidateJob } from "@data/interface";

import { useQuery } from "@tanstack/react-query";
import { searchFavoriteJobs } from "@/api/job";

export default function FavoriteJobs() {
  const PAGE_SIZE = 6;
  const [jobs, setJobs] = useState<CandidateJob[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const query = useQuery({
    queryKey: ["favorite-jobs", currentPage, PAGE_SIZE],
    queryFn: () => searchFavoriteJobs(currentPage - 1, PAGE_SIZE),
  });

  useEffect(() => {
    if (query.data) {
      setJobs(query.data.data.favorite_jobs.listData);
      setTotalPages(query.data.data.favorite_jobs.totalPages);
    }
    console.log(query.data);
  }, [query.data]);

  const emptyJobs = (
    <Text size="xs" my="24" style={{ textAlign: "center" }}>
      Không có việc làm nào
    </Text>
  );

  return (
    <MainSectionContainer heading="Việc làm đã thích">
      <Text size="sm" mb="lg">
        Danh sách{" "}
        <span className="text-lg text-primary-500 font-semibold">
          {jobs.length}
        </span>{" "}
        việc làm đã lưu
      </Text>
      <div className=" bg-white py-10 mx-10 rounded-md shadow-sm">
        <Stack mx="auto" maw={"700px"}>
          {query.isLoading && <Loader m="auto"></Loader>}
          {jobs.length !== 0 &&
            !query.isLoading &&
            jobs?.map((job) => {
              return (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  companyLogo={job.companyImage}
                  companyName={job.companyName}
                  location={job.location}
                  textSalary={job.textSalary}
                  deadline={job.deadline}
                  isHot={job.isHot}
                  isSaved={job.isFavorite || false}
                />
              );
            })}
          {jobs.length === 0 && emptyJobs}
          <Pagination
            color="blue.8"
            mt="lg"
            total={totalPages}
            value={currentPage}
            onChange={(value) => setCurrentPage(value)}
            size="sm"
            mx="auto"
          />
        </Stack>
      </div>
    </MainSectionContainer>
  );
}
