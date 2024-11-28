import { LeftSidebarLayout } from "@components/layouts";
import { Flex, NavLink, Transition } from "@mantine/core";
import { Profile, CvManage } from "@features/candidate/setting";

import {
  IconSettings,
  IconUserCog,
  IconBriefcase,
  IconFileCv,
  IconHeartSpark,
  IconApps,
} from "@tabler/icons-react";

import { useState } from "react";
import { FavoriteJobs } from "@features/candidate/favoriteJob";
import { ApplyJobHistory } from "@features/candidate/applyHistory";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import "./setting-user.scss"
import { Box } from "@mui/material";
import JobDemand from "@features/candidate/jobDemand/JobDemand";

export default function UserSetting() {
  const [selectedTab, setSelectedTab] = useState("thong-tin");

  const sidebarCollapsed = useSelector(
    (state: RootState) => state.sidebarState
  );
  const { collapsed } = sidebarCollapsed;

  const sidebar = (
    <Box>
      <NavLink
        label="Quản lý tài khoản"
        leftSection={<IconSettings stroke={1} />}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink active={selectedTab === "thong-tin"}
          href="#thong-tin"
          onClick={() => setSelectedTab("thong-tin")}
          label="Thông tin cá nhân"
          mt={"1rem"}
          mb={"1rem"}
          leftSection={<IconUserCog stroke={1} />}
        />

      </NavLink>
      <NavLink
    
        label="Quản lý hồ sơ"
        leftSection={<svg id="Folder-Settings--Streamline-Atlas" xmlns="http://www.w3.org/2000/svg" viewBox="-0.625 -0.625 20 20" pathLength={20} width={20} ><desc>{"Folder Settings Streamline Icon: https://streamlinehq.com"}</desc><defs /><path d="M9.375 2.6640625 7.8828125 1.171875H1.171875v14.9140625a1.484375 1.484375 0 0 0 1.4921875 1.4921875h13.421875a1.484375 1.484375 0 0 0 1.4921875 -1.4921875V2.6640625Z" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="M7.140625 11.609375a2.234375 2.234375 0 1 0 4.46875 0 2.234375 2.234375 0 1 0 -4.46875 0" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 9.375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 15.34375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 9.375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 15.34375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m7.4375 10.4921875 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m12.6015625 13.4765625 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m7.4375 10.4921875 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m12.6015625 13.4765625 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m11.3125 10.4921875 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m6.1484375 13.4765625 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m11.3125 10.4921875 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m6.1484375 13.4765625 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m1.171875 5.6484375 16.40625 0" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /></svg>}
        childrenOffset={28}
        defaultOpened
      >
        <NavLink active={selectedTab === "nhu-cau-cong-viec"}
          href="#nhu-cau-cong-viec"
          onClick={() => setSelectedTab("nhu-cau-cong-viec")}
          label="Nhu cầu công việc"
          mt={"1rem"}
          mb={"1rem"}
          leftSection={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.5 -0.5 16 16" id="Content-Paper-Edit--Streamline-Ultimate" pathLength={20} width={20} ><desc>{"Content Paper Edit Streamline Icon: https://streamlinehq.com"}</desc><path stroke="#000000" strokeLinecap="round" strokeLinejoin="round" d="M5.1537500000000005 12.65625h-3.75c-0.2486375 0 -0.48709375 -0.09875 -0.6629125 -0.27456250000000004 -0.17581437500000002 -0.17581249999999998 -0.27458625000000003 -0.41431250000000003 -0.27458625000000003 -0.6629375V1.40625c0 -0.2486375 0.09877187500000001 -0.48710000000000003 0.27458625000000003 -0.6629125C0.91665625 0.5675218750000001 1.1551125 0.46875 1.40375 0.46875h9.375c0.24862499999999998 0 0.487125 0.09877187500000001 0.6629375 0.2745875 0.17581249999999998 0.17581249999999998 0.27456250000000004 0.414275 0.27456250000000004 0.6629125V5.625m-6.5625 -2.34375h3.75m-5.625 2.8125h5.625m-5.625 2.8125h4.6875m6.175625 0.3875L9.375 14.0625l-2.34375 0.46875 0.46875 -2.34375 4.769375 -4.76875c0.1226875 -0.122875 0.26837500000000003 -0.22037500000000002 0.42875 -0.2869375 0.160375 -0.0665 0.33231249999999996 -0.10075 0.5059375 -0.10075 0.173625 0 0.3455625 0.03425 0.5059375 0.10075 0.160375 0.0665625 0.3060625 0.1640625 0.42875 0.2869375l0.005625 0.005c0.24762499999999998 0.2483125 0.3864375 0.5848125 0.38593750000000004 0.9355 -0.0004375 0.35068750000000004 -0.1401875 0.6868125 -0.38843750000000005 0.9345000000000001Z" strokeWidth={1} /></svg>}
        />

      </NavLink>
      <NavLink
        href="#cv"
        active={selectedTab === "cv"}
        label="Quản lý CV"
        onClick={() => setSelectedTab("cv")}
        leftSection={<IconFileCv stroke={1}/>}

      />

    <NavLink
    
        label="Quản lý công việc"
        leftSection={<IconBriefcase stroke={1} />}
        childrenOffset={28}
        defaultOpened
      >
      <NavLink
        href="#yeu-thich"
        label="Việc đã lưu"
        active={selectedTab === "yeu-thich"}
        onClick={() => setSelectedTab("yeu-thich")}
        leftSection={<IconHeartSpark stroke={1} />}

      />
      <NavLink
        active={selectedTab === "lich-su"}
        onClick={() => setSelectedTab("lich-su")}
        leftSection={<IconApps stroke={1} />}
        href="#lich-su"
        label="Lịch sử ứng tuyển"
      />
      </NavLink>
    </Box>
  );
  const sidebarCollapedU = (
    <Box>
      <NavLink
        active={selectedTab === "thong-tin"}
        href="#thong-tin"
        label={<IconSettings stroke={1} />}
        onClick={() => {
          setSelectedTab("thong-tin");
          
        }}

      />
      <NavLink
        active={selectedTab === "nhu-cau-cong-viec"}
        href="#thong-tin"
        label={<Box pl={"3px"}><svg id="Folder-Settings--Streamline-Atlas" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" pathLength={20} width={20} ><desc>{"Folder Settings Streamline Icon: https://streamlinehq.com"}</desc><defs /><path d="M9.375 2.6640625 7.8828125 1.171875H1.171875v14.9140625a1.484375 1.484375 0 0 0 1.4921875 1.4921875h13.421875a1.484375 1.484375 0 0 0 1.4921875 -1.4921875V2.6640625Z" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="M7.140625 11.609375a2.234375 2.234375 0 1 0 4.46875 0 2.234375 2.234375 0 1 0 -4.46875 0" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 9.375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 15.34375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 9.375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m9.375 15.34375 0 -1.4921875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m7.4375 10.4921875 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m12.6015625 13.4765625 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m7.4375 10.4921875 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m12.6015625 13.4765625 -1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m11.3125 10.4921875 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m6.1484375 13.4765625 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m11.3125 10.4921875 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m6.1484375 13.4765625 1.2890625 -0.7421875" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /><path d="m1.171875 5.6484375 16.40625 0" fill="none" stroke="#000000" strokeMiterlimit={10} strokeWidth={1} /></svg></Box>}
        onClick={() => setSelectedTab("nhu-cau-cong-viec")}

      />
      <NavLink

        href="#cv"
        active={selectedTab === "cv"}
        onClick={() => setSelectedTab("cv")}
        label={<IconFileCv stroke={1} />}
      />
      <NavLink
        href="#nhu-cau-cong-viec"
        active={selectedTab === "nhu-cau-cong-viec"}
        label="Quản lý CV"
        onClick={() => setSelectedTab("nhu-cau-cong-viec")}
        leftSection={<IconGauge stroke={1.5} />}
      />
      <NavLink
        href="#yeu-thich"
        active={selectedTab === "yeu-thich"}
        onClick={() => setSelectedTab("yeu-thich")}
        label={<IconHeartSpark stroke={1} />}

      />
      <NavLink
        active={selectedTab === "lich-su"}
        onClick={() => setSelectedTab("lich-su")}
        label={<IconApps stroke={1} />}
        href="#lich-su"
      />
    </Box>
  );

  const main = (
    <>
      {selectedTab === "thong-tin" && <Profile />}
      {selectedTab === "cv" && <CvManage />}
      {selectedTab === "yeu-thich" && <FavoriteJobs />}
      {selectedTab === "lich-su" && <ApplyJobHistory />}
      {selectedTab === "nhu-cau-cong-viec" && <JobDemand />}
    </>
  );

  return (
    <>
      <LeftSidebarLayout
        sidebar={
        <Flex direction={'row'} pos={"relative"}>
         <Transition
          mounted={collapsed}
          transition="pop-top-left"
          duration={300}
          enterDelay={0}
          timingFunction="ease"
          
        >
          {(styles) => <div style={styles}> {sidebarCollapedU}</div>}
        </Transition>
        <Transition
          mounted={!collapsed}
          transition="pop-top-left"
          duration={200}
          timingFunction="ease"
          enterDelay={300}
        >
          {(styles) => <div style={styles}> {sidebar}</div>}
        </Transition>
        </Flex>
        }
        main={main}
      />
    </>
  );
}