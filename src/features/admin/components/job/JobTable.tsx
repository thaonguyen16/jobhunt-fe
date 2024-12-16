import {
  Table,
  Flex,
  Tooltip,
  Button,
  Divider,
  Box,
  TextInput,
  Select,
  Pagination,
  Group,
  ComboboxData,
  Text,
  Loader,
  Badge,
} from "@mantine/core";
import { MdModeEdit } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { getCompanyOptions } from "@/api/company";
import { getAdminJobs } from "@/api/job";
import RejectJobModal from "./RejectJobModal";
import ApproveJobModal from "./ApproveJobModal";
import EmptyListData from "../EmptyListData";

type JobType = {
  id: number;
  title: string;
  companyName: string;
  status: string;
  expired: boolean;
  createdAt: string;
  deadline: string;
  selected?: boolean;
};

type JobTableProps = {
  jobs?: JobType[];
  status?: string;
};

export default function JobTable({ status }: JobTableProps) {
  const ITEMS_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [keyword, setKeyword] = useState<string>("");

  const [companyOptions, setCompanyOptions] = useState<ComboboxData>([]);
  const [currentPageJobs, setCurrentPageJobs] = useState<JobType[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);

  const [
    approvalModalOpened,
    { open: openApprovalModal, close: closeApprovalModal },
  ] = useDisclosure(false);
  const [
    rejectModalOpened,
    { open: openRejectModal, close: closeRejectModal },
  ] = useDisclosure(false);

  const companyQuery = useQuery({
    queryKey: ["companyOptions"],
    queryFn: getCompanyOptions,
  });

  const adminJobQuery = useQuery({
    queryKey: [
      "adminFilterJob",
      currentPage,
      ITEMS_PAGE,
      status,
      companyId,
      keyword,
    ],
    queryFn: () =>
      getAdminJobs(currentPage - 1, ITEMS_PAGE, status, companyId, keyword),
  });

  useEffect(() => {
    if (adminJobQuery.data) {
      setCurrentPageJobs(adminJobQuery.data.data.listData);
      setTotalPage(adminJobQuery.data.data.totalPages);
    }
  }, [adminJobQuery.data]);

  useEffect(() => {
    if (companyQuery.data) {
      setCompanyOptions([
        { label: "Tất cả", value: "" },
        ...companyQuery.data.data.companies,
      ]);
    }
  }, [companyQuery.data]);

  const rows = currentPageJobs.map((element) => {
    console.log(element);

    let statusVn =
      element.status === "PENDING"
        ? "Chờ duyệt"
        : element.status === "ACTIVE"
        ? "Hợp lệ"
        : "Từ chối";

    return (
      <Table.Tr key={element.id}>
        <Table.Td>{element.id}</Table.Td>
        <Table.Td w={500}>
          <Text fw={500} size="sm" lineClamp={1}>
            {element.title}
          </Text>
        </Table.Td>
        <Table.Td>
          <Badge color={element.expired ? "red" : "green.8"} variant="light">
            {element.deadline}
          </Badge>
        </Table.Td>
        <Table.Td>{element.createdAt}</Table.Td>
        <Table.Td>
          <Badge
            variant="light"
            style={{ textTransform: "none" }}
            color={
              element.status === "PENDING"
                ? "yellow"
                : element.status === "ACTIVE"
                ? "teal.8"
                : "red"
            }
          >
            {statusVn}
          </Badge>
        </Table.Td>
        <Table.Td>
          <Flex gap="xs" align={"center"}>
            <Tooltip label="Phê duyệt" position="top">
              <Button
                size="xs"
                unstyled
                onClick={() => {
                  setSelectedJobId(element.id);
                  openApprovalModal();
                }}
              >
                <MdModeEdit className="h-5 w-5" color="green" />
              </Button>
            </Tooltip>
          </Flex>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <RejectJobModal
        closeApprovalModal={closeApprovalModal}
        jobId={selectedJobId}
        rejectModalOpened={rejectModalOpened}
        closeRejectModal={closeRejectModal}
      />

      <ApproveJobModal
        status={status || ""}
        approvalModalOpened={approvalModalOpened}
        closeApprovalModal={closeApprovalModal}
        openRejectModal={openRejectModal}
        jobId={selectedJobId}
      />

      <Box my="md">
        <div className="flex justify-between">
          <Flex gap="md" align="center">
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IoIosSearch />}
              placeholder="Tìm công việc..."
              onChange={(e) => setKeyword(e.currentTarget.value)}
              size="xs"
            />
            <Divider orientation="vertical" size={"sm"} />
            <Select
              placeholder="Lọc theo công ty"
              searchable
              onChange={(value) => setCompanyId(value)}
              data={companyOptions}
              nothingFoundMessage="Nothing found..."
              w={300}
              size="xs"
              fw={500}
            />
          </Flex>
        </div>
      </Box>
      <Table
        striped
        bg="white"
        stripedColor="blue.0"
        stickyHeader
        horizontalSpacing="md"
        verticalSpacing="sm"
      >
        <Table.Thead bg="blue.2">
          <Table.Tr>
            <Table.Th>Id</Table.Th>
            <Table.Th>Tên công việc</Table.Th>
            <Table.Th>Hạn ứng tuyển</Table.Th>
            <Table.Th>Ngày tạo</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Tùy chỉnh</Table.Th>
          </Table.Tr>
        </Table.Thead>
        {rows.length !== 0 && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
      {rows.length === 0 && !adminJobQuery.isLoading && (
        <EmptyListData></EmptyListData>
      )}
      {adminJobQuery.isLoading && (
        <div className="w-[100%] flex items-center justify-center mt-20">
          <Loader size="sm"></Loader>
        </div>
      )}
      <Flex justify="end" mt="sm">
        <Pagination.Root
          total={totalPage}
          value={currentPage}
          size="sm"
          onChange={setCurrentPage}
        >
          <Group gap={5} justify="center">
            <Pagination.First />
            <Pagination.Previous />
            <Pagination.Items />
            <Pagination.Next />
            <Pagination.Last />
          </Group>
        </Pagination.Root>
      </Flex>
    </>
  );
}
