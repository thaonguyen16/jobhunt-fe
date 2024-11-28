import {
  Table,
  Flex,
  Tooltip,
  Button,
  Divider,
  Box,
  TextInput,
  Pagination,
  Group,
  Loader,
} from "@mantine/core";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import CompanyApprovalModal from "./CompanyApprovalModal";
import RejectCompanyModal from "./RejectCompanyModal";
import { useQuery } from "@tanstack/react-query";
import { getCompanies } from "@/api/company";
import EmptyListData from "../EmptyListData";

type CompanyType = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  status: string;
  selected?: boolean;
};

type CompanyTableProps = {
  status: string;
};

export default function CompanyTable(props: CompanyTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageCompanies, setCurrentPageCompanies] = useState<
    CompanyType[]
  >([]);
  const [
    approvalModalOpened,
    { open: openApprovalModal, close: closeApprovalModal },
  ] = useDisclosure(false);

  const [
    rejectModalOpened,
    { open: openRejectModal, close: closeRejectModal },
  ] = useDisclosure(false);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(
    null
  );

  const [keyword, setKeyword] = useState("");

  const companyQuery = useQuery({
    queryKey: ["companies", currentPage, props.status, keyword],
    queryFn: () => getCompanies(currentPage - 1, 6, props.status, keyword),
  });

  const onChangePageHandler = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (companyQuery.data) {
      setCurrentPageCompanies(companyQuery.data.data.listData);
      setTotalPages(companyQuery.data.data.totalPages);
    }
  }, [companyQuery.data]);

  const rows = currentPageCompanies.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.address}</Table.Td>
      <Table.Td>{element.phone}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>
        <Flex gap="xs" align={"center"}>
          <Tooltip label="Phê duyệt" position="top">
            <Button
              size="xs"
              unstyled
              onClick={() => {
                setSelectedCompanyId(element.id);
                openApprovalModal();
              }}
            >
              <MdModeEdit className="h-5 w-5" color="green" />
            </Button>
          </Tooltip>
          {props.status === "REJECTED" && (
            <>
              <Divider orientation="vertical" size={"sm"} />
              <Tooltip label="Xóa" position="top">
                <Button unstyled>
                  <MdDelete className="h-5 w-5" color="red" />
                </Button>
              </Tooltip>
            </>
          )}
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <>
      <RejectCompanyModal
        closeApprovalModal={closeApprovalModal}
        closeRejectModal={closeRejectModal}
        id={selectedCompanyId}
        refreshData={() => {
          companyQuery.refetch();
        }}
        rejectModalOpened={rejectModalOpened}
      ></RejectCompanyModal>
      <CompanyApprovalModal
        id={selectedCompanyId}
        approvalModalOpened={approvalModalOpened}
        closeApprovalModal={closeApprovalModal}
        openRejectModal={openRejectModal}
        refreshData={() => {
          companyQuery.refetch();
        }}
      />
      <Box my="md">
        <div className="flex justify-between">
          <Flex gap="md" align="center">
            <TextInput
              variant="filled"
              onChange={(e) => setKeyword(e.currentTarget.value)}
              leftSectionPointerEvents="none"
              leftSection={<IoIosSearch />}
              placeholder="Tìm công ty..."
              size="xs"
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
            <Table.Th>Tên công ty</Table.Th>
            <Table.Th>Địa chỉ</Table.Th>
            <Table.Th>Số điện thoại</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th>Tùy chỉnh</Table.Th>
          </Table.Tr>
        </Table.Thead>

        {rows.length !== 0 && <Table.Tbody>{rows}</Table.Tbody>}
      </Table>
      {rows.length === 0 && !companyQuery.isLoading && (
        <EmptyListData></EmptyListData>
      )}
      {companyQuery.isLoading && (
        <div className="w-[100%] flex items-center justify-center mt-20">
          <Loader size="sm"></Loader>
        </div>
      )}
      <Flex justify="end" mt="sm">
        <Pagination.Root
          total={totalPages}
          size="sm"
          onChange={onChangePageHandler}
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
