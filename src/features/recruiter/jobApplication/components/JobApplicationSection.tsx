import { FaCircleCheck } from "react-icons/fa6";
import { HiMiniQueueList } from "react-icons/hi2";
import { useEffect, useState } from "react";
import {
  JobApplicationCard,
  JobApplicationModal,
} from "@features/recruiter/jobApplication";
import { TiExportOutline } from "react-icons/ti";

import { useDisclosure } from "@mantine/hooks";
import {
  Text,
  Box,
  Pagination,
  Tabs,
  Grid,
  Loader,
  Group,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { MdPending } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getJobApplicationsByRecruiter } from "@/api/application";
import api from "@utils/axios";
import { getAccessToken } from "@utils/authUtils";

type JobApplicationPageProps = {
  jobId: number | null;
};

type JobApplicationType = {
  id: number;
  name: string;
  email: string;
  phone: string;

  job: {
    id: number;
    title: string;
  };
  avatar: string;
  status: string;
};

export default function JobApplicationSection(props: JobApplicationPageProps) {
  const { jobId } = props;
  const PAGE_SIZE = 6;
  const [
    jobApplicationOpened,
    { open: openJobApplicationModal, close: closeJobApplicationModal },
  ] = useDisclosure(false);
  const [applyStatus, setApplyStatus] = useState<string | null>("PENDING");
  const [jobApplications, setJobApplications] = useState<JobApplicationType[]>(
    []
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobApplications, setTotalJobApplications] = useState(0);
  const [selectedJobApplication, setSelectedJobApplication] = useState<
    number | null
  >(null);

  const applyJobQuery = useQuery({
    queryKey: [
      "recruiter-job-applications",
      page,
      PAGE_SIZE,
      jobId,
      applyStatus,
    ],
    queryFn: () =>
      getJobApplicationsByRecruiter(page - 1, PAGE_SIZE, jobId, applyStatus),
    enabled: jobId !== null,
  });

  useEffect(() => {
    if (applyJobQuery.data) {
      setJobApplications(applyJobQuery.data.data.listData);
      setTotalPages(applyJobQuery.data.data.totalPages);
      setTotalJobApplications(applyJobQuery.data.data.totalItems);
    }
  }, [applyJobQuery.data]);

  const handleExportJA = async () => {
    try {
      const res = await api.get(`/job-applications/${jobId}/export`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        responseType: "blob",
      });
      // Create a Blob from the response data
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Generate a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a temporary <a> element
      const a = document.createElement("a");
      a.href = url;
      a.download = "job-applications.xlsx"; // Set the downloaded file name
      document.body.appendChild(a);

      // Trigger the download
      a.click();

      // Clean up
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const renderJobApplications = jobApplications.map(
    (jobApplication: JobApplicationType) => (
      <Grid.Col span={6}>
        <JobApplicationCard
          key={jobApplication.id}
          id={jobApplication.id}
          name={jobApplication.name}
          email={jobApplication.email}
          phone={jobApplication.phone}
          avatar={jobApplication.avatar}
          pending={applyStatus === "PENDING" ? true : false}
          openJobApplicationModal={openJobApplicationModal}
          setJobApplicationId={setSelectedJobApplication}
        />
      </Grid.Col>
    )
  );

  return (
    <>
      <JobApplicationModal
        id={selectedJobApplication?.toString() || ""}
        opened={jobApplicationOpened}
        closeModal={closeJobApplicationModal}
      />
      <div className="className px-4 bg-white shadow-lg rounded-md py-4">
        <Text size="md" fw="500" mb="lg">
          {jobApplications[0]?.job.title}{" "}
          <span className="text-[#d9480f] font-bold text-lg">
            ({totalJobApplications})
          </span>
        </Text>

        <Tabs
          defaultValue="PENDING"
          onChange={(value) => setApplyStatus(value)}
        >
          <Tabs.List>
            <Tabs.Tab
              value="PENDING"
              leftSection={<MdPending color="#339af0" />}
            >
              Chờ duyệt
            </Tabs.Tab>
            <Tabs.Tab
              value="APPROVED"
              leftSection={<FaCircleCheck color="#339af0" />}
            >
              Phù hợp
            </Tabs.Tab>
            <Tabs.Tab
              value="SEEN"
              leftSection={<HiMiniQueueList color="#339af0" />}
            >
              Từ chối
            </Tabs.Tab>

            {applyStatus === "APPROVED" && (
              <Tooltip label="Xuất thông tin ứng viên" position="top">
                <ActionIcon
                  ml="auto"
                  mr="lg"
                  variant="gradient"
                  onDoubleClick={handleExportJA}
                >
                  <TiExportOutline />
                </ActionIcon>
              </Tooltip>
            )}
          </Tabs.List>

          <Tabs.Panel value={applyStatus || "PENDING"} mt="md" pb="md">
            <div className="max-h-[500px] overflow-y-auto overflow-x-hidden no-scrollbar">
              {applyJobQuery.isFetching ? (
                <Group>
                  <Loader size="xs" my="lg" mx="auto"></Loader>
                </Group>
              ) : jobApplications.length === 0 ? (
                <Box my="24">
                  <Text size="sm" style={{ textAlign: "center" }}>
                    Không có đơn ứng tuyển nào.
                  </Text>
                </Box>
              ) : (
                <Grid style={{ rowGap: "20px", alignItems: "stretch" }}>
                  {renderJobApplications}
                </Grid>
              )}
            </div>
          </Tabs.Panel>
          <Group justify="flex-end">
            <Pagination
              total={totalPages}
              size="sm"
              my="20"
              onChange={(value) => {
                setPage(value);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </Group>
        </Tabs>
      </div>
    </>
  );
}
