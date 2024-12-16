import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@store/auth";
import { NotiButton } from "@components/ui/button";
import { RootState } from "@store";
import Cookies from "js-cookie";
import { Avatar, Flex, Indicator, Menu } from "@mantine/core";
import {
  IconBriefcase,
  IconLogout,
  IconSettings,
  IconUserFilled,
} from "@tabler/icons-react";

export default function UserSettingMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roles = useSelector((state: RootState) => state.auth.roles);
  const avatarImage = useSelector((state: RootState) => state.userAvatar);

  const handleLogout = () => {
    console.log("Log out");
    dispatch(logout());
    Cookies.remove("access_token");
    navigate("/dang-nhap");
  };

  return (
    <Flex
      direction={"row"}
      wrap={"nowrap"}
      w={"100%"}
      justify={"flex-end"}
      pos={"relative"}
      gap={"md"}
    >
      <NotiButton />
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
          {roles && roles.includes("CANDIDATE") && (
            <Menu.Item
              component="a"
              href="/quan-ly"
              onClick={() => navigate("/quan-ly")}
              leftSection={<IconSettings size={"1.2rem"} />}
            >
              Quản lý hồ sơ cá nhân
            </Menu.Item>
          )}

          {roles && roles.includes("RECRUITER") && (
            <Menu.Item
              component="a"
              href="/tuyen-dung/quan-ly"
              onClick={() => navigate("/tuyen-dung/quan-ly")}
              leftSection={<IconBriefcase size={"1.2rem"} />}
            >
              Quản lý tuyển dụng
            </Menu.Item>
          )}

          {roles && roles.includes("ADMIN") && (
            <Menu.Item
              component="a"
              href="/admin"
              onClick={() => navigate("/admin")}
              leftSection={<IconUserFilled size={"1.2rem"} />}
            >
              Trang chủ Admin
            </Menu.Item>
          )}

          <Menu.Divider></Menu.Divider>

          <Menu.Item
            onClick={() => {
              Cookies.remove("access_token");
              Cookies.remove("expiration");
              handleLogout();
            }}
            leftSection={<IconLogout size={"1.2rem"} />}
          >
            Đăng xuất
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
}
