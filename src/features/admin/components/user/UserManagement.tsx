import {
  Table,
  Checkbox,
  Flex,
  Box,
  Button,
  Tooltip,
  Divider,
  TextInput,
  Group,
  Pagination,
  Select,
  Text,
  Card,
  Badge,
  ComboboxItem,
  Loader,
} from "@mantine/core";
import { IoMdAdd, IoIosSearch } from "react-icons/io";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useDisclosure } from "@mantine/hooks";
import { FaUserFriends, FaBuilding, FaUserTie } from "react-icons/fa";
import { useEffect, useState } from "react";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";
import UpdateUserModal from "./UpdateUserModal";
import { useQuery } from "@tanstack/react-query";
import { getUsersData } from "@/api/user";
import EmptyListData from "../EmptyListData";

type UserType = {
  id: string;
  fullName: string;
  email: string;
  roles: string[];
  status: string;
  joinDate: string;
  isSelect?: boolean;
};

const getBagdeColor = (role: string) => {
  if (role === "ADMIN") return "blue";
  else if (role === "RECRUITER") return "gray";
  else if (role === "CANDIDATE") return "cyan";
};

const statusColor = (status: string) => {
  if (status === "Active") return "green";
  else if (status === "Inactive") return "red";
  else return "yellow";
};

const roles: ComboboxItem[] = [
  { value: "ALL", label: "Tất cả" },
  { value: "CANDIDATE", label: "Ứng viên" },
  { value: "RECRUITER", label: "Nhà tuyển dụng" },
  { value: "ADMIN", label: "Admin" },
];

const PAGE_SIZE = 6;

export default function UserManagement() {
  const [opened, { open: openAddUserModal, close: closeAddUserModal }] =
    useDisclosure(false);
  const [
    deleteItemOpened,
    { open: openDeleteOneModal, close: closeDeleteOneModal },
  ] = useDisclosure(false);

  const [
    updateUsersOpened,
    { open: openUpdateUsersModal, close: closeUpdateUserModal },
  ] = useDisclosure(false);
  const [currentPageUsers, setCurrentPageUsers] = useState<UserType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [role, setRole] = useState("ALL");
  const [deleteUserEmail, setDeleteUserEmail] = useState<string>("");
  const [seletedUserId, setSeletedUserId] = useState<number | null>(null);

  const userQuery = useQuery({
    queryKey: ["admin-users", currentPage, PAGE_SIZE, keyword, role],
    queryFn: () => getUsersData(currentPage - 1, PAGE_SIZE, keyword, role),
  });

  useEffect(() => {
    if (userQuery.data) {
      setCurrentPageUsers(userQuery.data.data.listData);
      setTotalPages(userQuery.data.data.totalPages);
    }
  }, [userQuery]);

  const onKeySearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.currentTarget.value);
    setCurrentPage(1);
  };

  const rows = currentPageUsers.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Checkbox disabled={true} checked={element.isSelect} size="xs" />
      </Table.Td>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.fullName}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>
        {element.roles.map((role) => (
          <Badge size="xs" color={getBagdeColor(role)} mr="sm">
            {role}
          </Badge>
        ))}
      </Table.Td>
      <Table.Td>
        <Badge color={statusColor(element.status)}>{element.status}</Badge>
      </Table.Td>

      <Table.Td>
        <Flex gap="xs" align={"center"}>
          <Tooltip label="Chỉnh sửa" position="top">
            <Button
              size="xs"
              unstyled
              onClick={() => {
                openUpdateUsersModal();
              }}
            >
              <MdModeEdit className="h-5 w-5" color="green" />
            </Button>
          </Tooltip>
          <Divider orientation="vertical" size={"sm"} />
          <Tooltip label="Xóa" position="top">
            <Button
              unstyled
              onClick={() => {
                openDeleteOneModal();
                setDeleteUserEmail(element.email);
                setSeletedUserId(parseInt(element.id));
              }}
            >
              <MdDelete className="h-5 w-5" color="red" />
            </Button>
          </Tooltip>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  const onChangePageHandler = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <AddUserModal
        opened={opened}
        closeAddUserModal={closeAddUserModal}
        refetch={() => {
          userQuery.refetch();
        }}
      />
      <DeleteUserModal
        id={seletedUserId}
        opened={deleteItemOpened}
        onClose={closeDeleteOneModal}
        email={deleteUserEmail}
        refetchData={() => {
          userQuery.refetch();
        }}
      />
      <UpdateUserModal
        updateUsersOpened={updateUsersOpened}
        closeUpdateUserModal={closeUpdateUserModal}
      />

      <div>
        <Text fw={500} size="lg" ml="xs" my="md">
          Quản lý người dùng
        </Text>
        <Flex align="center" gap="md" mb="lg">
          <Card
            shadow="md"
            padding="lg"
            radius="lg"
            withBorder
            style={{ backgroundColor: "#f8fafc" }}
          >
            <Flex justify="space-between" align="center" direction="column">
              <Group align="center">
                <Badge
                  color="blue"
                  variant="light"
                  radius="xl"
                  size="lg"
                  p="sm"
                  style={{ backgroundColor: "#e0f2fe" }}
                >
                  <FaUserFriends size={24} />
                </Badge>
                <Text size="lg" fw={400}>
                  Người dùng
                </Text>
              </Group>
              <Text size="xl" fw={500} style={{ color: "#0572cc" }}>
                100
              </Text>
            </Flex>
          </Card>
          {/* Card Doanh nghiệp */}
          <Card
            shadow="md"
            padding="lg"
            radius="lg"
            withBorder
            style={{ backgroundColor: "#f8fafc" }}
          >
            <Flex justify="space-between" align="center" direction="column">
              <Group align="center">
                <Badge
                  color="green"
                  variant="light"
                  radius="xl"
                  size="lg"
                  p="sm"
                  style={{ backgroundColor: "#d1fae5" }}
                >
                  <FaBuilding size={20} />
                </Badge>
                <Text size="lg" fw={400}>
                  Doanh nghiệp
                </Text>
              </Group>
              <Text size="xl" fw={500} style={{ color: "#2b8a3e" }}>
                2
              </Text>
            </Flex>
          </Card>

          {/* Card Ứng viên */}
          <Card
            shadow="md"
            padding="lg"
            radius="lg"
            withBorder
            style={{ backgroundColor: "#f8fafc" }}
          >
            <Flex justify="space-between" align="center" direction="column">
              <Group align="center">
                <Badge
                  color="red"
                  variant="light"
                  radius="xl"
                  size="lg"
                  p="sm"
                  style={{ backgroundColor: "#fee2e2" }}
                >
                  <FaUserTie size={20} />
                </Badge>
                <Text size="lg" fw={400}>
                  Ứng viên
                </Text>
              </Group>
              <Text size="xl" fw={500} style={{ color: "#d6336c" }}>
                98
              </Text>
            </Flex>
          </Card>
        </Flex>
      </div>
      <div className="bg-white shadow-md rounded-md px-4 py-2 mt-2 mb-10">
        <Flex direction="column" mt="lg" gap="sm">
          {/* FUNCTION BAR */}
          <Box>
            <div className="flex justify-between">
              <Flex gap="md" align="center">
                <TextInput
                  variant="filled"
                  leftSectionPointerEvents="none"
                  leftSection={<IoIosSearch />}
                  placeholder="Tìm người dùng..."
                  onChange={onKeySearchChange}
                  size="xs"
                />
                <Divider orientation="vertical" size={"sm"} />
                <Select
                  variant="filled"
                  defaultValue={roles[0].value}
                  data={roles}
                  onChange={(value) => setRole(value || "ALL")}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  size="xs"
                />
              </Flex>
              <Flex gap="sm" justify="end">
                <Tooltip label="Thêm người dùng" position="top">
                  <Button
                    color="blue"
                    size="xs"
                    onClick={openAddUserModal}
                    leftSection={<IoMdAdd className="h-4 w-4" />}
                  >
                    Thêm
                  </Button>
                </Tooltip>
                <Button
                  color="red"
                  size="xs"
                  leftSection={<MdDelete className="h-4 w-4" />}
                >
                  Xóa nhiều
                </Button>
              </Flex>
            </div>
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
                    disabled={true}
                    size="xs"
                    onChange={() => setIsSelectAll(!isSelectAll)}
                    indeterminate={isSelectAll}
                  />
                </Table.Th>
                <Table.Th>Id</Table.Th>
                <Table.Th>Tên người dùng</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Tài khoản</Table.Th>
                <Table.Th>Trạng thái</Table.Th>

                <Table.Th>Tùy chỉnh</Table.Th>
              </Table.Tr>
            </Table.Thead>
            {rows.length !== 0 && <Table.Tbody>{rows}</Table.Tbody>}
          </Table>
          {rows.length === 0 && !userQuery.isLoading && (
            <EmptyListData></EmptyListData>
          )}
          {userQuery.isLoading && (
            <div className="w-[100%] flex items-center justify-center">
              <Loader size="sm"></Loader>
            </div>
          )}
          {/* pagitnation */}
          <Flex justify="end" mt="sm">
            <Pagination.Root
              total={totalPages}
              size="sm"
              value={currentPage}
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
        </Flex>
      </div>
    </>
  );
}
