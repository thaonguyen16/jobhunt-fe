import { Text, Group, Stack, Select, Skeleton } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getJobReport } from "@/api/job";

const data = [];

export default function JobMonthlyReport() {
  const [jobYear, setJobYear] = useState<string | null>("2024");
  const jobReportQuery = useQuery({
    queryKey: ["job_report", jobYear],
    queryFn: () => getJobReport(jobYear || "2024"),
  });

  return (
    <Stack w={"100%"}>
      <Text fw={500} m="auto">
        Lượng công việc hàng tháng
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
            {jobReportQuery?.data?.data.totalJob || 0}
          </Text>
        </Group>
      </Group>
      {jobReportQuery.isLoading ? (
        <Skeleton visible={jobReportQuery.isLoading} />
      ) : (
        <LineChart
          h={300}
          w={"100%"}
          data={jobReportQuery?.data.data.listData || data}
          dataKey="month"
          series={[
            { name: "totalJob", label: "Lượng công việc", color: "blue.7" },
          ]}
          curveType="linear"
          tickLine="xy"
          gridAxis="xy"
          type="gradient"
        />
      )}
    </Stack>
  );
}
