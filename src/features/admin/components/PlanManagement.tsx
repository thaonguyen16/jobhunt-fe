import {
  Table,
  Checkbox,
  Flex,
  Box,
  Button,
  Tooltip,
  Divider,
  Text,
  Group,
  Pagination,
  Select,
} from "@mantine/core";
import { IoMdAdd } from "react-icons/io";

import { MdModeEdit, MdDelete } from "react-icons/md";

type PlanType = {
  id: number;
  planName: string;
  monthlyPrice: number;
  yearlyPrice: number;
  status: string;
  description: string;
  planType: string;
};

const plans: PlanType[] = [
  {
    id: 1,
    planName: "Basic",
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    status: "active",
    description: "Gói cơ bản dành cho cá nhân.",
    planType: "individual",
  },
  {
    id: 2,
    planName: "Standard",
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    status: "active",
    description: "Gói tiêu chuẩn dành cho nhóm nhỏ.",
    planType: "group",
  },
  {
    id: 3,
    planName: "Premium",
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    status: "active",
    description: "Gói cao cấp dành cho doanh nghiệp.",
    planType: "business",
  },
  {
    id: 4,
    planName: "Enterprise",
    monthlyPrice: 49.99,
    yearlyPrice: 499.99,
    status: "active",
    description: "Gói doanh nghiệp lớn với các tính năng tùy chỉnh.",
    planType: "enterprise",
  },
  {
    id: 5,
    planName: "Startup",
    monthlyPrice: 14.99,
    yearlyPrice: 149.99,
    status: "active",
    description: "Gói dành riêng cho các công ty khởi nghiệp.",
    planType: "startup",
  },
  //   {
  //     id: 6,
  //     planName: "Non-Profit",
  //     monthlyPrice: 12.99,
  //     yearlyPrice: 129.99,
  //     status: "inactive",
  //     description: "Gói ưu đãi dành cho tổ chức phi lợi nhuận.",
  //     planType: "non-profit",
  //   },
  //   {
  //     id: 7,
  //     planName: "Family",
  //     monthlyPrice: 24.99,
  //     yearlyPrice: 249.99,
  //     status: "active",
  //     description: "Gói dùng chung cho gia đình với các tính năng mở rộng.",
  //     planType: "family",
  //   },
  //   {
  //     id: 8,
  //     planName: "Education",
  //     monthlyPrice: 8.99,
  //     yearlyPrice: 89.99,
  //     status: "inactive",
  //     description: "Gói đặc biệt dành cho giáo dục và trường học.",
  //     planType: "education",
  //   },
  //   {
  //     id: 9,
  //     planName: "Freelancer",
  //     monthlyPrice: 5.99,
  //     yearlyPrice: 59.99,
  //     status: "active",
  //     description: "Gói tiết kiệm dành cho freelancer.",
  //     planType: "individual",
  //   },
  //   {
  //     id: 10,
  //     planName: "Corporate",
  //     monthlyPrice: 39.99,
  //     yearlyPrice: 399.99,
  //     status: "active",
  //     description: "Gói toàn diện cho các tập đoàn lớn.",
  //     planType: "corporate",
  //   },
];

export default function PlanManagement() {
  const rows = plans.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Checkbox checked={false} onChange={() => {}} />
      </Table.Td>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.planName}</Table.Td>
      <Table.Td>{element.monthlyPrice}</Table.Td>
      <Table.Td>{element.yearlyPrice}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.planType}</Table.Td>
      <Table.Td>
        <Flex gap="xs" align={"center"}>
          <Tooltip label="Chỉnh sửa" position="top">
            <Button size="xs" unstyled>
              <MdModeEdit className="h-5 w-5" color="green" />
            </Button>
          </Tooltip>
          <Divider orientation="vertical" size={"sm"} />
          <Tooltip label="Xóa" position="top">
            <Button unstyled>
              <MdDelete className="h-5 w-5" color="red" />
            </Button>
          </Tooltip>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div>
        <Text fw={500} size="lg" ml="xs" my="md">
          Quản lý gói dịch vụ
        </Text>
      </div>
      <div className="bg-white shadow-md rounded-md px-4 py-2 mt-2">
        <Flex direction="column" mt="lg" gap="sm">
          {/* FUNCTION BAR */}
          <Box>
            <div className="flex justify-between">
              <Flex gap="md" align="center">
                <Select
                  placeholder="Lọc gói"
                  data={["Ứng viên vip", "Nhà tuyển pro", "Admin"]}
                  searchable
                  nothingFoundMessage="Nothing found..."
                  w={150}
                  size="xs"
                />
                <Divider orientation="vertical" size="sm" />
                <Tooltip label="Thêm gói" position="right">
                  <Button color="blue" size="xs">
                    <IoMdAdd className="h-4 w-4" />
                  </Button>
                </Tooltip>
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
                  <Checkbox checked={false} />
                </Table.Th>
                <Table.Th>Id</Table.Th>
                <Table.Th>Tên gói</Table.Th>
                <Table.Th>Giá tháng</Table.Th>
                <Table.Th>Giá năm</Table.Th>
                <Table.Th>Trạng thái</Table.Th>
                <Table.Th>Loại gói</Table.Th>
                <Table.Th>Tùy chỉnh</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          {/* pagitnation */}
          <Flex justify="end" mt="sm">
            <Pagination.Root total={5} size="sm">
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
