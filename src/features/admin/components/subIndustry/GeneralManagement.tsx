import {
  Table,
  Checkbox,
  Flex,
  Tooltip,
  Button,
  Divider,
  Box,
  Select,
  Pagination,
  TextInput,
  Group,
  Text,
  ComboboxItem,
  Loader,
} from "@mantine/core";
import { IoMdAdd } from "react-icons/io";
import AddSubIndustryModal from "./AddSubIndustryModal";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { IIndustry, ISubIndustry } from "../../interface";
import { useDisclosure } from "@mantine/hooks";
import UpdateSubIndustryModal from "./UpdateSubIndustryModal";
import DeleteSubIndustryModal from "./DeleteSubIndustryModal";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getIndustries } from "@/api/industry";
import { getSubIndustries } from "@/api/subIndustry";
import { MdDeleteForever } from "react-icons/md";
import { useEffect, useState } from "react";

const PAGE_SIZE = 8;

export default function GeneralManagement() {
  const [
    opened,
    { open: openAddSubIndustryModal, close: closeAddSubIndustryModal },
  ] = useDisclosure(false);
  const [
    isUpdateModalOpened,
    { open: openUpdateSubIndustryModal, close: closeUpdateSubIndustryModal },
  ] = useDisclosure(false);
  const [
    isDeleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);

  const industryQuery = useQuery({
    queryKey: ["industries"],
    queryFn: getIndustries,
  });

  const [industryId, setIndustryId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [industryOptions, setIndustryOptions] = useState<ComboboxItem[]>([]);
  const [subIndustries, setSubIndustries] = useState<ISubIndustry[]>([]);
  const [deletedIndustryId, setDelectedIndustryId] = useState<number | null>(
    null
  );
  const [updatedSubIndustryId, setUpdatedSubIndustryId] = useState<
    number | null
  >(null);
  const [selectedIndustryIds, setSelectedIndustryIds] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [isMany, setIsMany] = useState(false);
  const [searchKey, setSearchKey] = useState<string>("");

  const subIndustryQuery = useQuery({
    queryKey: ["subIndustries", industryId, page - 1, PAGE_SIZE, searchKey],
    queryFn: () => getSubIndustries(industryId, page - 1, PAGE_SIZE, searchKey),
  });

  useEffect(() => {
    if (isSelectAll) {
      setSelectedIndustryIds(subIndustries.map((industry) => industry.id));
    } else {
      setSelectedIndustryIds([]);
    }
  }, [isSelectAll, setSelectedIndustryIds, subIndustries]);

  useEffect(() => {
    if (industryQuery.data) {
      setIndustryOptions([
        { value: "0", label: "Tất cả" },
        ...industryQuery.data.data.industries.map((industry: IIndustry) => ({
          label: industry.name,
          value: industry.id + "",
        })),
      ]);
    }
  }, [industryQuery.data]);

  useEffect(() => {
    if (subIndustryQuery.data) {
      setSubIndustries(subIndustryQuery.data.data.listData);
      setTotalPages(subIndustryQuery.data.data.totalPages);
    }
  }, [subIndustryQuery.data]);

  const onFilterByIndustryHandler = (value: string | null, _: ComboboxItem) => {
    value ? setIndustryId(parseInt(value)) : setIndustryId(null);
  };

  const deleteManySubIndustriesHandler = () => {
    setIsMany(true);
    openDeleteModal();
  };

  const rows = subIndustries.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Checkbox
          size="xs"
          checked={selectedIndustryIds.includes(element.id)}
        />
      </Table.Td>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.industry.name}</Table.Td>
      <Table.Td>
        <Flex gap="xs" align={"center"}>
          <Tooltip label="Chỉnh sửa" position="top">
            <Button size="xs" unstyled>
              <MdModeEdit
                className="h-5 w-5"
                color="green"
                onClick={() => {
                  setUpdatedSubIndustryId(element.id);
                  openUpdateSubIndustryModal();
                }}
              />
            </Button>
          </Tooltip>
          <Divider orientation="vertical" size={"sm"} />
          <Tooltip label="Xóa" position="top">
            <Button
              unstyled
              onClick={() => {
                setIsMany(false);
                openDeleteModal();
                setDelectedIndustryId(element.id);
              }}
            >
              <MdDelete className="h-5 w-5" color="red" />
            </Button>
          </Tooltip>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <DeleteSubIndustryModal
        id={deletedIndustryId}
        isMany={isMany}
        opened={isDeleteModalOpened}
        onClose={closeDeleteModal}
        ids={selectedIndustryIds}
        refetchData={() => {
          subIndustryQuery.refetch();
        }}
      />
      <UpdateSubIndustryModal
        id={updatedSubIndustryId}
        opened={isUpdateModalOpened}
        onClose={closeUpdateSubIndustryModal}
        refetchData={() => {
          subIndustryQuery.refetch();
        }}
      />
      <AddSubIndustryModal
        opened={opened}
        onClose={closeAddSubIndustryModal}
        refetchData={() => {
          subIndustryQuery.refetch();
        }}
      />
      <div>
        <Text fw={500} size="lg" ml="xs" my="md">
          Quản lý ngành nghề
        </Text>
      </div>
      <div className="bg-white shadow-md rounded-md px-4 py-2 mt-2 mb-10">
        <Flex direction="column" mt="lg" gap="sm">
          {/* FUNCTION BAR */}
          <Box>
            <Group>
              <TextInput
                placeholder="Tìm kiếm"
                size="xs"
                onChange={(event) => setSearchKey(event.currentTarget.value)}
                leftSection={<FaSearch></FaSearch>}
              />
              <Select
                onChange={onFilterByIndustryHandler}
                placeholder="Lọc theo lĩnh vực"
                data={industryOptions}
                searchable
                value={industryId ? industryId + "" : "0"}
                nothingFoundMessage="Nothing found..."
                w={150}
                size="xs"
              />

              <Group ml="auto">
                <Button
                  color="blue"
                  size="xs"
                  onClick={openAddSubIndustryModal}
                  leftSection={<IoMdAdd className="h-4 w-4" />}
                >
                  Thêm
                </Button>

                <Button
                  color="red"
                  size="xs"
                  disabled={selectedIndustryIds.length === 0}
                  onClick={deleteManySubIndustriesHandler}
                  leftSection={
                    <MdDeleteForever className="h-4 w-4"></MdDeleteForever>
                  }
                >
                  Xóa nhiều
                </Button>
              </Group>
            </Group>
          </Box>
          {/* TABLE */}
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
                <Table.Th>
                  <Checkbox
                    size="xs"
                    checked={isSelectAll}
                    indeterminate={isSelectAll}
                    onChange={() => {
                      setIsSelectAll(!isSelectAll);
                    }}
                  />
                </Table.Th>
                <Table.Th>Id</Table.Th>
                <Table.Th>Tên ngành nghề</Table.Th>
                <Table.Th>Lĩnh vực</Table.Th>
                <Table.Th>Tùy chỉnh</Table.Th>
              </Table.Tr>
            </Table.Thead>
            {rows.length !== 0 && <Table.Tbody>{rows}</Table.Tbody>}
          </Table>
          {rows.length === 0 && !subIndustryQuery.isLoading && (
            <div className="w-[100%] flex items-center justify-center">
              <Text fw={500} size="sm" style={{ color: "#0581e6" }}>
                Danh sách trống
              </Text>
            </div>
          )}
          {subIndustryQuery.isLoading && (
            <div className="w-[100%] flex items-center justify-center">
              <Loader size="sm"></Loader>
            </div>
          )}
          {/* pagitnation */}
          <Group justify="end" mt="sm">
            <Pagination.Root
              total={totalPages}
              value={page}
              onChange={(value) => {
                setPage(value);
                setIsSelectAll(false);
              }}
              size="sm"
            >
              <Group gap={5} justify="center">
                <Pagination.First />
                <Pagination.Previous />
                <Pagination.Items />
                <Pagination.Next />
                <Pagination.Last />
              </Group>
            </Pagination.Root>
          </Group>
        </Flex>
      </div>
    </>
  );
}
