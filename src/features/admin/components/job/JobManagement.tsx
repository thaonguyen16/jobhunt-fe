import { Text, Tabs } from "@mantine/core";
import JobTable from "./JobTable";
import { useState } from "react";

export default function JobManagement() {
  const [status, setStatus] = useState<string | null>("PENDING");
  return (
    <div>
      <Text fw={500} size="lg" ml="xs" my="md">
        Quản lý công việc
      </Text>
      <div className="bg-white p-2 rounded-md shadow-md">
        <Tabs defaultValue={status} inverted onChange={setStatus}>
          <Tabs.Panel value="PENDING" pb="xs">
            Công việc chờ duyệt
          </Tabs.Panel>
          <Tabs.Panel value="ACTIVE" pb="xs">
            Công việc đã duyệt
          </Tabs.Panel>
          <Tabs.Panel value="REJECTED" pb="xs">
            Công việc đã từ chối
          </Tabs.Panel>
          <Tabs.List>
            <Tabs.Tab value="PENDING" color="yellow">
              Chờ duyệt
            </Tabs.Tab>
            <Tabs.Tab value="ACTIVE" color="green.4">
              Đã duyệt
            </Tabs.Tab>
            <Tabs.Tab value="REJECTED" color="red.4">
              Từ chối
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value={status || "PENDING"} pb="xs">
            <JobTable status={status || "PENDING"} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}
