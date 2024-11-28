import {
  UserManagement,
  PlanManagement,
  JobManagement,
  CompanyManagement,
  DashboardManagement,
  RevenueManagement,
  GeneralManagement,
} from "@features/admin";
import { Avatar, Group, NavLink } from "@mantine/core";

import {
  FaUser,
  FaBuilding,
  FaBusinessTime,
  FaMoneyCheckAlt,
  FaHome,
} from "react-icons/fa";
import { FaSquarePollVertical } from "react-icons/fa6";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { Text, Menu, Image } from "@mantine/core";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <DashboardManagement />;
      case "user":
        return <UserManagement />;
      case "company":
        return <CompanyManagement />;
      case "job":
        return <JobManagement />;
      case "plan":
        return <PlanManagement />;
      case "report":
        return <RevenueManagement />;
      case "general":
        return <GeneralManagement />;
      default:
        return <>Dashboard</>;
    }
  };
  return (
    <div className="">
      {/* header */}
      <div className="fixed top-0 right-0 left-0 z-10 bg-white h-14 shadow-md flex items-center px-8 justify-between">
        <Group>
          <Image src="/src/assets/img/logo.png" h="40px" w="40px"></Image>
          <Text
            size="20px"
            fw="900"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            Jobhunt
          </Text>
        </Group>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar></Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Logout</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <div className="flex ">
        {/* sidebar */}
        <div className="fixed top-0 left-0 min-w-[200px] h-screen bg-white mt-14">
          <NavLink
            label="Trang chủ"
            leftSection={<FaHome className="h-5 w-5" />}
            active={activeComponent === "dashboard"}
            onClick={() => setActiveComponent("dashboard")}
          />
          <NavLink
            label="Người dùng"
            leftSection={<FaUser />}
            onClick={() => setActiveComponent("user")}
            active={activeComponent === "user"}
          />
          <NavLink
            label="Công ty"
            leftSection={<FaBuilding />}
            onClick={() => setActiveComponent("company")}
            active={activeComponent === "company"}
          />
          <NavLink
            label="Việc làm"
            leftSection={<FaBusinessTime />}
            onClick={() => setActiveComponent("job")}
            active={activeComponent === "job"}
          />
          <NavLink
            label="Gói dịch vụ"
            onClick={() => setActiveComponent("plan")}
            active={activeComponent === "plan"}
            leftSection={<FaMoneyCheckAlt />}
          />
          <NavLink
            label="Thống kê báo cáo"
            onClick={() => setActiveComponent("report")}
            active={activeComponent === "report"}
            leftSection={<FaSquarePollVertical />}
          />
          <NavLink
            label="Chung"
            onClick={() => setActiveComponent("general")}
            active={activeComponent === "general"}
            leftSection={<IoMdSettings className="h-5 w-5" />}
          />
        </div>
        {/* main content */}
        <div className="w-full ml-[200px] mt-14 ">
          <div className="px-4 ">{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
}
