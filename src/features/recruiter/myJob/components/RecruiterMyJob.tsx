import { useEffect, useState } from "react";
import { DeleteJobModal, JobEditModal } from "..";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { CandidateJob } from "@data/interface";
import { RecruiterJobCard } from "..";

import {
  Box,
  Pagination,
  Container,
  Group,
  Tabs,
  TextInput,
  Button,
  Stack,
  Text,
  Loader,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { JobAppicationSection } from "@features/recruiter/jobApplication";
import { useQuery } from "@tanstack/react-query";
import { filterRecruiterJobs } from "@/api/job";

export default function RecruiterMyJob() {
  const PAGE_SIZE = 6;
  const [renderJobs, setRenderJobs] = useState<CandidateJob[]>();

  const [activeTab, setActiveTab] = useState<string | null>("ACTIVE");
  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [deleteJobId, setDeleteJobId] = useState<number | null>(null);
  const [editJobId, setEditJobId] = useState<number | null>(null);
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  const jobQuery = useQuery({
    queryKey: ["recruiterJobs", currentPage, activeTab, keyword],
    queryFn: () =>
      filterRecruiterJobs(
        currentPage - 1,
        PAGE_SIZE,
        activeTab || "ACTIVE",
        keyword || ""
      ),
  });

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);
  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);

  useEffect(() => {
    if (jobQuery.data) {
      setRenderJobs(jobQuery.data.data.listData);
      setTotalPages(jobQuery.data.data.totalPages);
    }
  }, [jobQuery.data]);

  const handleOpenDeleteModal = (jobId: number) => {
    setDeleteJobId(jobId);
    openDeleteModal();
  };

  const handleOpenEditModal = (jobId: number) => {
    setEditJobId(jobId);
    openEditModal();
  };

  return (
    <>
      <DeleteJobModal
        opened={opened}
        onClose={closeDeleteModal}
        jobId={deleteJobId}
        refetch={jobQuery.refetch}
      />
      <JobEditModal
        refetch={jobQuery.refetch}
        opened={editModalOpened}
        onClose={closeEditModal}
        jobId={editJobId}
      />

      <Container maw={"2000px"} bg={"#f4f4f4"} pt={"20px"} mih={"500px"}>
        <Group grow wrap="nowrap" align="flex-start" mb="lg">
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            bg={"#ffffff"}
            px="md"
            py="sm"
            style={{ borderRadius: "8px" }}
          >
            <Box mb="sm">
              <Text
                size="md"
                fw={700}
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
              >
                Việc đã đăng
              </Text>
              <Group justify="end">
                <TextInput
                  size="xs"
                  color="gray"
                  onChange={(e) => setKeyword(e.currentTarget.value)}
                  leftSection={
                    <IoSearch className="text-primary-700 font-semibold"></IoSearch>
                  }
                  placeholder="Tìm việc làm"
                />
                <Button
                  leftSection={<IoMdAdd />}
                  variant="gradient"
                  size="xs"
                  gradient={{ from: "blue", to: "cyan", deg: 120 }}
                  onClick={() => {
                    setEditJobId(null);
                    openEditModal();
                  }}
                >
                  Thêm
                </Button>
              </Group>
            </Box>
            <Tabs.List mb="lg">
              <Tabs.Tab value="ACTIVE">Đang tuyển</Tabs.Tab>
              <Tabs.Tab value="PENDING">Đợi duyệt</Tabs.Tab>
              <Tabs.Tab value="EXPIRED">Hết hạn</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value={activeTab || "ACTIVE"}>
              <Stack gap="xs" align="stretch" justify="flex-start">
                {renderJobs &&
                  renderJobs.length === 0 &&
                  !jobQuery.isLoading && (
                    <Text
                      size="md"
                      fw={500}
                      style={{ color: "#228be6", textAlign: "center" }}
                    >
                      Danh sách trống
                    </Text>
                  )}
                {jobQuery.isLoading && <Loader size="xs" m="auto"></Loader>}
                {renderJobs &&
                  renderJobs.map((job) => (
                    <RecruiterJobCard
                      isActive={job.id === "1"}
                      key={job.id}
                      isExpired={job.expired}
                      {...job}
                      id={Number(job.id)}
                      dueDate={job.deadline}
                      selectJob={setSelectedJob}
                      openDeleteModal={handleOpenDeleteModal}
                      openEditModal={handleOpenEditModal}
                      createdDate={job.createdAt}
                    />
                  ))}
              </Stack>
            </Tabs.Panel>

            <Group mt="lg">
              <Pagination
                size="sm"
                ml="auto"
                total={totalPages}
                value={currentPage}
                onChange={(value) => {
                  window.scrollTo(0, 0);
                  setCurrentPage(value);
                }}
              />
            </Group>
          </Tabs>
          {selectedJob && (
            <Stack bg="white" style={{ borderRadius: "8px" }}>
              <JobAppicationSection jobId={selectedJob} />
            </Stack>
          )}
        </Group>
      </Container>
    </>
  );
}
