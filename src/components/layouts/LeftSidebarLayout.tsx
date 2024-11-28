import { AppShell, Image, Text, Flex, ActionIcon, Group } from "@mantine/core";
import "/src/pages/employer/sidenav.scss";
import { RootState } from "@store";
import { useSelector } from "react-redux";
import { setSideBarCollapsed } from "@store/sidebar";
import { useDispatch } from "react-redux";
import { IconGridDots } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { UserSettingMenu } from "@features/candidate/setting";
import "../../pages/candidate/setting-user.scss"

type LeftSidebarLayoutProps = {
  sidebar: React.ReactNode;
  main: React.ReactNode;
};

export default function LeftSidebarLayout({
  sidebar,
  main,
}: LeftSidebarLayoutProps) {
  const sidebarCollapsed = useSelector(
    (state: RootState) => state.sidebarState
  );
  const { collapsed } = sidebarCollapsed;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <AppShell
      padding="0"
      m="0"
      header={{ height: "50px" }}
      w="100%"
      withBorder={false}
      navbar={{
        width: !collapsed ? "15rem" : "3.5rem",
        breakpoint: "xs",
      }}
    >
      <AppShell.Header p={"0px"} m={"0px"}>
        <Flex
          justify="flex-start"
          h={"50px"}
          align="center"
          direction="row"
          pl={"0.8rem"}
          wrap="nowrap"
        >
          <Group w={"100%"} gap={"xs"}>
            <ActionIcon
              variant="transparent"
              aria-label="Settings"
              onClick={() => dispatch(setSideBarCollapsed())}
            >
              <IconGridDots
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <Group
              gap={"xs"}
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            >
              <Image src="/src/assets/img/logo.png" h="40px" w="40px"></Image>
              <Text
                size="20px"
                m={"0"}
                p={"0"}
                fw="900"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan", deg: 90 }}
              >
                Jobhunt
              </Text>
            </Group>
          </Group>
          <Group pr={"1rem"}>
            <UserSettingMenu />
          </Group>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar className={!collapsed ? "nav-link" : "nav-link-collaped"}
        style={{
          padding: "10px",
          paddingTop: "10px",
          marginTop: "10px",
          backgroundColor: "rgba(255,255,255,.1)",
        }}
      >
        {sidebar}
      </AppShell.Navbar>

      <AppShell.Main>
        {main}
      </AppShell.Main>
      <AppShell.Aside></AppShell.Aside>
    </AppShell>
  );
}
