import { Stack, Text, Skeleton, Group, Select } from "@mantine/core";
import { BarChart } from "@mantine/charts";
import { useQuery } from "@tanstack/react-query";
import { getJobApplicationMonthlyReport } from "@/api/application";
import { useState } from "react";

const job_application_data = [];

export default function JobApplicationMonthlyReport() {
  const [jobYear, setJobYear] = useState<string | null>("2024");
  const jaQuery = useQuery({
    queryKey: ["job_application_report", jobYear],
    queryFn: () => getJobApplicationMonthlyReport(jobYear || "2024"),
  });

  console.log(jaQuery.data);

  return (
    <Stack align="center" gap="xl">
      <Text fw={500} m="auto">
        Lượng hồ sơ ứng tuyển
      </Text>
      <Group my="md">
        <Select
          size="xs"
          defaultValue="2024"
          onChange={setJobYear}
          data={["2025", "2024", "2023"]}
          w={100}
        />
        <Group ml="auto" gap="sm">
          <Text size="xs" fw={500}>
            Số lượng công việc:{" "}
          </Text>
          <Text size="sm" fw={500} style={{ color: "#d9480f" }}>
            {jaQuery?.data?.data.totalJob || 0}
          </Text>
        </Group>
      </Group>
      <Skeleton visible={jaQuery.isLoading} />
      <BarChart
        w={600}
        h={300}
        data={jaQuery?.data?.data.listData || job_application_data}
        dataKey="month"
        gridAxis="xy"
        series={[
          { name: "totalJob", label: "Số đơn ứng tuyển", color: "orange.8" },
        ]}
        tickLine="x"
      />
    </Stack>
  );
}
