import { Card, Text, Group, Badge, Stack, Select, Grid } from "@mantine/core";
import { LineChart, PieChart, BarChart } from "@mantine/charts";
import { FaUser } from "react-icons/fa6";
import { BsPersonVcardFill } from "react-icons/bs";
import { FaArrowUpRightDots } from "react-icons/fa6";

const data = [
  {
    month: "January",
    jobs: 1,
  },
  {
    month: "February",

    jobs: 2,
  },
  {
    month: "March",
    jobs: 4,
  },
  {
    month: "April",
    jobs: 5,
  },

  {
    month: "May",
    jobs: 10,
  },
  {
    month: "June",
    jobs: 6,
  },
  {
    month: "July",

    jobs: 8,
  },
  {
    month: "August",
    jobs: 10,
  },
  {
    month: "Septemper",
    jobs: 10,
  },
  {
    month: "October",
    jobs: 12,
  },
  {
    month: "November",
    jobs: 7,
  },
  {
    month: "December",
    jobs: 20,
  },
];

const major = [
  { name: "IT", value: 400, color: "pink" },
  { name: "Bank", value: 300, color: "blue.7" },
  { name: "Education", value: 300, color: "teal.6" },
  { name: "Other", value: 200, color: "yellow.6" },
];

const job_application_data = [
  {
    month: "January",
    job_application: 1,
  },
  {
    month: "February",

    job_application: 2,
  },
  {
    month: "March",
    job_application: 20,
  },
  {
    month: "April",
    job_application: 5,
  },

  {
    month: "May",
    job_application: 10,
  },
  {
    month: "June",
    job_application: 6,
  },
  {
    month: "July",

    job_application: 8,
  },
  {
    month: "August",
    job_application: 10,
  },
  {
    month: "Septemper",
    job_application: 15,
  },
  {
    month: "October",
    job_application: 12,
  },
  {
    month: "November",
    job_application: 7,
  },
  {
    month: "December",
    job_application: 20,
  },
];

export default function DashboardManagement() {
  return (
    <div className="pb-10">
      <Text fw={500} size="lg" ml="xs" my="md">
        Tổng quan
      </Text>
      <Group>
        <Card maw={300}>
          <Group justify="space-between" mb="xs">
            <Text fw={500}>Số lượng người dùng</Text>
            <Badge color="green">
              <FaArrowUpRightDots />
            </Badge>
          </Group>

          <Group mt="md" mb="xs" gap="xl">
            <Stack>
              <Group gap="sm">
                <Badge color="green">
                  <FaUser></FaUser>
                </Badge>
                <Text fw={500} size="sm">
                  Ứng viên
                </Text>
              </Group>
              <Text fw={500} ml="auto">
                1.2229
              </Text>
            </Stack>

            <Stack>
              <Group gap="sm">
                <Badge color="blue">
                  <BsPersonVcardFill />
                </Badge>
                <Text fw={500} size="sm">
                  Doanh nghiệp
                </Text>
              </Group>
              <Text fw={500} ml="auto">
                1.2229
              </Text>
            </Stack>
          </Group>
        </Card>
      </Group>
      <div className="rounded-md bg-white">
        <Group mt="lg" grow mb="lg" px="lg" py="md" gap="lg" align="start">
          <Stack>
            <Text fw={500} m="auto">
              Lượng công việc hàng tháng
            </Text>
            <Group my="md">
              <Select
                size="xs"
                defaultValue="2024"
                data={["2024", "2023", "2022"]}
                w={100}
              />
              <Group ml="auto" gap="sm">
                <Text size="xs" fw={500}>
                  Số lượng công việc:{" "}
                </Text>
                <Text size="sm" fw={500} style={{ color: "#d9480f" }}>
                  1233
                </Text>
              </Group>
            </Group>
            <LineChart
              h={300}
              w={"100%"}
              data={data}
              dataKey="month"
              series={[{ name: "jobs", color: "blue.7" }]}
              curveType="linear"
              tickLine="xy"
              gridAxis="xy"
              type="gradient"
            />
          </Stack>
          <Stack justify="flex-start" h="100%" align="center">
            <Text fw={500} m="auto">
              Lĩnh vực tuyển dụng nhiều nhất
            </Text>
            <PieChart data={major} m="auto" mt={64} />
            <Grid ml="auto" mt="lg">
              <Grid.Col span={6}>
                <Group>
                  {" "}
                  <Badge h={20} w={20} circle color="pink"></Badge>
                  <Text>IT</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group>
                  {" "}
                  <Badge h={20} w={20} circle color="blue.7"></Badge>
                  <Text>Bank</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group>
                  {" "}
                  <Badge h={20} w={20} circle color="teal.6"></Badge>
                  <Text>Education</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={6}>
                <Group>
                  {" "}
                  <Badge h={20} w={20} circle color="yellow.6"></Badge>
                  <Text>Others</Text>
                </Group>
              </Grid.Col>
            </Grid>
          </Stack>
        </Group>
      </div>
      <div className="rounded-md bg-white py-4">
        <Stack align="center" gap="xl">
          <Text fw={500} m="auto">
            Lượng hồ sơ ứng tuyển
          </Text>
          <BarChart
            w={600}
            h={300}
            data={job_application_data}
            dataKey="month"
            gridAxis="xy"
            series={[{ name: "job_application", color: "orange.8" }]}
            tickLine="x"
          />
        </Stack>
      </div>
    </div>
  );
}
