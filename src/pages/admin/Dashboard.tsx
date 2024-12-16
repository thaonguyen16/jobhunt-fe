import {
  UserManagement,
  PlanManagement,
  JobManagement,
  CompanyManagement,
  DashboardManagement,
  RevenueManagement,
  GeneralManagement,
} from "@features/admin";
import { Avatar, Flex, Indicator, NavLink } from "@mantine/core";

import {
  FaUser,
  FaBuilding,
  FaBusinessTime,
  FaMoneyCheckAlt,
  FaHome,
  FaReceipt,
} from "react-icons/fa";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { Text, Menu, Image } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store";
import PlanHistory from "@features/candidate/plan/PlanHistory";
import { useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";
import Cookies from "js-cookie";
import { logout } from "@store/auth";

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const avatarImage = useSelector((state: RootState) => state.userAvatar);
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Log out");
    dispatch(logout());
    Cookies.remove("access_token");
    navigate("/dang-nhap");
  };

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
      case "transaction":
        return <PlanHistory />
      case "report":
        return <RevenueManagement />;
      case "general":
        return <GeneralManagement />;
      default:
        return <>Dashboard</>;
    }
  };

  const navigate = useNavigate();
  return (
    <div className="">
      {/* header */}
      <div className="fixed top-0 right-0 left-0 z-10 bg-white h-14 shadow-md flex items-center px-8 justify-between">
        <Flex style={{cursor: "pointer"}}
                direction={"row"}
                justify={"flex-start"}
                align={"center"}
                wrap={"nowrap"}
                onClick={() => {
                  navigate("/");
                }}
              >
                <Image src="/src/assets/img/logo.png" h="40px" w="40px" />
                <Text
                  size="20px"
                  fw="900"
                  variant="gradient"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  Jobhunt
                </Text>
              </Flex>

              <Menu
        zIndex={10}
        transitionProps={{ transition: "fade-down", duration: 500 }}
        trigger="click"
        closeOnItemClick={false}
      >
        <Menu.Target>
          <Indicator
            inline
            processing
            color="green"
            size={10}
            position="bottom-end"
            offset={5}
            style={{ cursor: "pointer" }}
          >
            <Avatar size="md" radius="xl" src={avatarImage.url} />
          </Indicator>
        </Menu.Target>

          <Menu.Dropdown>
          <Menu.Item
            onClick={() => {
              Cookies.remove("access_token");
              Cookies.remove("expiration");
              handleLogout();
            }}
            leftSection={<IconLogout size={"1.2rem"} stroke={1} />}
          >
            Đăng xuất
          </Menu.Item>
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
            label="Giao dịch"
            onClick={() => setActiveComponent("transaction")}
            active={activeComponent === "transaction"}
            leftSection={<FaReceipt />}
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
