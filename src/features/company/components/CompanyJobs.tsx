import { CompanySectionContainer } from "..";
import { CandidateJob } from "@data/interface";
import { JobCard } from "@features/job";
import { FaFire } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

import {
  TextInput,
  Divider,
  Pagination,
  Text,
  Group,
  Loader,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { searchCompanyJobs } from "@/api/company";
import debounce from "lodash.debounce";

type CompanyJobsProps = {
  id: string;
};

export default function CompanyJobs({ id }: CompanyJobsProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [jobs, setJobs] = useState<CandidateJob[]>([]);

  const PAGE_SIZE = 7;

  const query = useQuery({
    queryKey: ["company-jobs", id, currentPage, keyword],
    queryFn: () =>
      searchCompanyJobs(Number(id), currentPage - 1, PAGE_SIZE, keyword),
  });

  const debounceSetKeyword = debounce((value: string) => {
    setKeyword(value);
  }, 300);

  useEffect(() => {
    if (query.data) {
      setTotal(query.data.data.jobs.totalPages);
      setJobs(query.data.data.jobs.listData);
    }
  }, [query.data]);

  return (
    <CompanySectionContainer>
      <Group gap="2">
        <FaFire className="text-[#e8590c] h-6 w-6" />
        <Text
          fw="700"
          variant="gradient"
          gradient={{ from: "gray.9 ", to: "gray.8" }}
        >
          Các vị trí đang tuyển dụng
        </Text>
      </Group>

      <Group>
        <TextInput
          w="40%"
          placeholder="Tìm kiếm công việc"
          onChange={(e) => debounceSetKeyword(e.currentTarget.value)}
          leftSection={<FaSearch className="text-primary-800" />}
        />
      </Group>
      <Divider></Divider>

      <div className="transiton duration-75 overflow-y-auto flex flex-col gap-3 scrollbar-hidden bg-white py-2">
        {query.isLoading && <Loader m="auto" size="sm" my="lg" />}
        {!query.isLoading &&
          jobs?.length !== 0 &&
          jobs?.map((job) => (
            <JobCard
              id={job.id}
              key={job.id}
              title={job.title}
              companyLogo={job.companyImage}
              companyName={job.companyName}
              location={job.location}
              textSalary={job.textSalary}
              deadline={job.deadline}
              status={job.status}
              isFavorite={false}
              isHot={job.isHot}
              isSaved={false}
            />
          ))}
        {!query.isLoading && jobs?.length === 0 && (
          <Text>Không có công việc nào</Text>
        )}
      </div>

      <Pagination
        total={total}
        value={currentPage}
        onChange={(page) => setCurrentPage(page)}
        gap={"2px"}
        size="sm"
        color="blue.8"
        m="auto"
        my="lg"
      />
    </CompanySectionContainer>
  );
}
