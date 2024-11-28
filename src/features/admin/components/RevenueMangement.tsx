import { Select, Text, Group } from "@mantine/core";
import { LineChart } from "@mantine/charts";

const revenue = [
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

export default function RevenueManagement() {
  return (
    <>
      {" "}
      <Text fw={500} size="lg" ml="xs" my="md">
        Doanh thu
      </Text>
      <div className="rounded-md bg-white  shadow-md px-20 py-10">
        <Group mb="xl">
          <Text size="sm" color="gray" my="auto">
            Doanh thu hàng tháng, năm:
          </Text>
          <Select
            size="xs"
            defaultValue="2024"
            data={["2024", "2023", "2022"]}
            w={100}
          />
          <Group ml="auto">
            <Text>Tổng doanh thu: </Text>
            <Text color="red.9" fw={500}>
              1000$
            </Text>
          </Group>
        </Group>
        <LineChart
          h={300}
          w={"100%"}
          data={revenue}
          dataKey="month"
          series={[{ name: "jobs", color: "blue.9" }]}
          curveType="linear"
          tickLine="xy"
          gridAxis="xy"
        />
      </div>
    </>
  );
}
