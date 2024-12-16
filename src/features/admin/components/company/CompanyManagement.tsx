import { Text, Tabs } from "@mantine/core";
import CompanyTable from "./CompanyTable";
import { useState } from "react";

export default function CompanyManagement() {
  const [tab, setTab] = useState<string | null>("PENDING");
  return (
    <div>
      <div>
        <Text fw={500} size="lg" ml="xs" my="md">
          Quản lý công ty
        </Text>
      </div>
      <div className="bg-white p-2 rounded-md shadow-md pt-8">
        <Tabs value={tab} onChange={setTab} inverted>
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
          <Tabs.Panel value={tab || "PENDING"} pb="xs">
            <CompanyTable status={tab || "PENDING"} />
          </Tabs.Panel>
          {/* <Tabs.Panel value="ACTIVE" pb="xs">
            <CompanyTable status="ACTIVE" />
          </Tabs.Panel>
          <Tabs.Panel value="rejected" pb="xs">
            <CompanyTable status="REJECTED" />
          </Tabs.Panel> */}
        </Tabs>
      </div>
    </div>
  );
}
