import { MainSectionContainer } from "@components/ui";
import HistoryCard from "./HistoryCard";
import { Loader, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobApplicationsByCandiate } from "@/api/application";
import ScrollToTop from "@components/ui/ScrollToTop";

type Job = {
  title: string;
  textSalary: string;
  companyName: string;
  companyImage: string;
};

type Resume = {
  id: number;
  name: string;
};

export type JobApplication = {
  id: number;
  job: Job;
  createdAt: string;
  status: string;
  resume: Resume;
};

export default function ApplyJobHistory() {
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  const applyJobQuery = useQuery({
    queryKey: ["ja-history"],
    queryFn: () => getJobApplicationsByCandiate(),
  });

  useEffect(() => {
    if (applyJobQuery.data) {
      setJobApplications(applyJobQuery.data.data.listData);
    }
  }, [applyJobQuery.data]);

  return (
    <MainSectionContainer heading="Lịch sử ứng tuyển của bạn">
      <ScrollToTop />
      <Stack
        mt="sm"
        bg={"white"}
        px="5%"
        h={applyJobQuery.isLoading ? "500px" : "auto"}
        py="xl"
        style={{
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {applyJobQuery.isLoading ? (
          <Loader size="sm" my="xl" mx="auto" />
        ) : jobApplications ? (
          jobApplications.map((jobApplication) => (
            <HistoryCard
              id={jobApplication.id}
              key={jobApplication.id}
              cvName={jobApplication.resume.name}
              name={jobApplication.job.title}
              companyName={jobApplication.job.companyName}
              salary={jobApplication.job.textSalary}
              applyTime={jobApplication.createdAt}
              status={jobApplication.status}
              companyLogo={jobApplication.job.companyImage}
            />
          ))
        ) : (
          <Text size="lg" color="gray" fw="500" my="20px">
            Bạn chưa ứng tuyển công việc nào
          </Text>
        )}
      </Stack>
    </MainSectionContainer>
  );
}
