import { MainSectionContainer } from "@components/ui";
import HistoryCard from "./HistoryCard";
import {Loader, rem, Stack, Tabs, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobApplicationsByCandiate } from "@/api/application";
import ScrollToTop from "@components/ui/ScrollToTop";
import { IconCheck, IconCircleDashedX, IconCopyX, IconFileCheck } from "@tabler/icons-react";

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
  const iconStyle = { width: rem(20), height: rem(20) };
  const [pendinglist, setPendinglist] = useState<JobApplication[]>([]);
  const [approvelist, setApprovelist] = useState<JobApplication[]>([]);
  const [rejectlist, setRejectlist] = useState<JobApplication[]>([]);
  const [cancellist, setCancellist] = useState<JobApplication[]>([]);


  const applyJobQuery = useQuery({
    queryKey: ["ja-history"],
    queryFn: () => getJobApplicationsByCandiate(),
  });

  useEffect(() => {
    if (applyJobQuery.data) {
      const list: JobApplication[] = applyJobQuery.data.data.listData;
      if(list !== undefined) {
        setPendinglist(list.filter((e)  => e.status === "PENDING"));
        setApprovelist(list.filter((e) => e.status === "APPROVED"));
        setRejectlist(list.filter((e) => e.status === "SEEN"));
        setCancellist(list.filter((e) => e.status === "CANCELED"));
      }
    }
  }, [applyJobQuery.data]);


  return (
    <MainSectionContainer heading="Lịch sử ứng tuyển của bạn">
      <ScrollToTop />
      <Tabs defaultValue="pending">
            <Tabs.List>
              <Tabs.Tab value="pending" leftSection={<IconFileCheck style={iconStyle} stroke={1} />}>
                Đang đợi duyệt
              </Tabs.Tab>
              <Tabs.Tab value="approve" leftSection={<IconCheck style={iconStyle} stroke={1} />}>
                Đã duyệt
              </Tabs.Tab>
              <Tabs.Tab value="reject" leftSection={<IconCircleDashedX style={iconStyle} stroke={1} />}>
                Từ chối
              </Tabs.Tab>
              <Tabs.Tab value="cancel" leftSection={<IconCopyX style={iconStyle} stroke={1} />}>
                Rút ứng tuyển
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="pending">
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
        ) : pendinglist.length > 0 ? (
          pendinglist.map((jobApplication) => (
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
            </Tabs.Panel>

            <Tabs.Panel value="approve">
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
        ) : approvelist.length > 0 ? (
          approvelist.map((jobApplication) => (
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
            Bạn chưa có đơn được duyệt
          </Text>
        )}
      </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="reject">
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
        ) : rejectlist.length > 0 ? (
          rejectlist.map((jobApplication) => (
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
            Bạn chưa có đơn ứng tuyển bị từ chối
          </Text>
        )}
      </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="cancel">
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
        ) : cancellist.length > 0 ? (
          cancellist.map((jobApplication) => (
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
            Bạn chưa hủy ứng tuyển công việc nào
          </Text>
        )}
      </Stack>
            </Tabs.Panel>

          </Tabs>
    </MainSectionContainer>
  );
}