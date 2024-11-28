import { LeftSidebarLayout } from "@components/layouts";
import { Flex, NavLink, Transition } from "@mantine/core";
import { RecruiterMyJob } from "@features/recruiter/myJob";
import { RecruiterInfo } from "@features/recruiter/recuiterInfo";
import { useState } from "react";

import { RootState } from "@store";
import { useSelector } from "react-redux";
import "./sidenav.scss";
import FindEmployeeSection from "@features/recruiter/findEmployee/FindEmployeeSection";
import { Box } from "@mui/material";
import {
  IconBriefcase,
  IconUserCog,
  IconUsersGroup,
} from "@tabler/icons-react";

export default function AddJobPage() {
  const [selectedTab, setSelectedTab] = useState("thong-tin");
  const sidebarCollapsed = useSelector(
    (state: RootState) => state.sidebarState
  );
  const { collapsed } = sidebarCollapsed;

  const sidebar = (
    <Box>
      <NavLink
        active={selectedTab === "thong-tin"}
        onClick={() => setSelectedTab("thong-tin")}
        pr={"10px"}
        label="Thông tin cá nhân"
        mb={"1rem"}
        leftSection={
          <IconUserCog style={{ width: "24px", height: "24px" }} stroke={1} />
        }
      />
      <NavLink
        active={selectedTab === "cong-viec"}
        pr={"10px"}
        label="Đăng tuyển"
        mb={"1rem"}
        onClick={() => setSelectedTab("cong-viec")}
        leftSection={
          <IconBriefcase style={{ width: "24px", height: "24px" }} stroke={1} />
        }
      />

      <NavLink
        label="Ứng viên"
        active={selectedTab === "ung-vien"}
        mb={"1rem"}
        pr={"10px"}
        onClick={() => setSelectedTab("ung-vien")}
        leftSection={
          <IconUsersGroup
            style={{ width: "24px", height: "24px" }}
            stroke={1}
          />
        }
      />
    </Box>
  );

  const sidebarCollapsedF = (
    <Box>
      <NavLink
        active={selectedTab === "thong-tin"}
        href="#thong-tin"
        label={
          <IconUserCog style={{ width: "24px", height: "24px" }} stroke={1} />
        }
        onClick={() => setSelectedTab("thong-tin")}
      />
      <NavLink
        href="#cong-viec"
        active={selectedTab === "cong-viec"}
        label={
          <IconBriefcase style={{ width: "24px", height: "24px" }} stroke={1} />
        }
        onClick={() => setSelectedTab("cong-viec")}
      />

      <NavLink
        href="#ung-vien"
        active={selectedTab === "ung-vien"}
        label={
          <IconUsersGroup
            style={{ width: "24px", height: "24px" }}
            stroke={1}
          />
        }
        onClick={() => setSelectedTab("ung-vien")}
      />
    </Box>
  );

  const main = (
    <>
      {selectedTab === "cong-viec" && <RecruiterMyJob />}
      {selectedTab === "thong-tin" && <RecruiterInfo />}
      {selectedTab === "ung-vien" && <FindEmployeeSection />}
    </>
  );

  return (
    <LeftSidebarLayout
      sidebar={
        <Flex direction={"row"} pos={"relative"}>
          <Transition
            mounted={collapsed}
            transition="pop-top-left"
            duration={0}
            enterDelay={0}
            timingFunction="ease"
          >
            {(styles) => <div style={styles}> {sidebarCollapsedF}</div>}
          </Transition>
          <Transition
            mounted={!collapsed}
            transition="pop-top-left"
            duration={0}
            timingFunction="ease"
            enterDelay={0}
          >
            {(styles) => <div style={styles}> {sidebar}</div>}
          </Transition>
        </Flex>
      }
      main={main}
    ></LeftSidebarLayout>
  );
}
