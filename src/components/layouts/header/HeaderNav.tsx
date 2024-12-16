import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store";
import { AppDispatch } from "@data/interface";
import { fetchUserProfile } from "@store/auth";
import { Button, em, Flex, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import "./header.scss";
import { UserSettingMenu } from "@features/candidate/setting";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "@mantine/hooks";

export default function HeaderNav() {
  const [showNav, setShowNav] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, roles } = auth;
  const dispatch: AppDispatch = useDispatch();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  useEffect(() => {
    if (isAuthenticated && roles?.length === 0) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, roles, dispatch]);
  const location = useLocation();

  const dataNav = [
    {
      label: "Việc làm",
      link: "/tim-cong-viec",
    },
    {
      label: "Doanh nghiệp",
      link: "/cong-ty",
    },
  ];

  return (
    <>
      {!isMobile && (
        <Flex
          w={"100%"}
          align={"center"}
          justify={"flex-start"}
          direction={"row"}
          className="custom-header"
          ml={"3rem"}
        >
          {dataNav.map((data) => (
            <NavLink
              fw={"500"}
              w={"fit-content"}
              onClick={() => console.log(location.pathname)}
              href={data.link}
              label={data.label}
              key={data.label}
              active={location.pathname == data.link}
            />
          ))}
        </Flex>
      )}
      {!isAuthenticated && !isMobile && (
        <Flex gap={"md"}>
          <Link to="/dang-nhap">
            <Button
              size="xs"
              color="cyan.6"
              variant="outline"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              Đăng nhập
            </Button>
          </Link>
          <Link to="/dang-ky">
            <Button
              size="xs"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
            >
              Đăng ký
            </Button>
          </Link>
          <Link to="/tuyen-dung-dang-ky">
            <Button
              size="xs"
              variant="gradient"
              gradient={{ from: "#3B1C32", to: "#A64D79", deg: 90 }}
            >
              Bạn là nhà tuyển dụng
            </Button>
          </Link>
        </Flex>
      )}
      {isAuthenticated && !isMobile && <UserSettingMenu />}
      {isMobile && (
        <div className="lg:hidden ml-2 self-end z-20">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setShowNav(!showNav)}
            sx={{ borderRadius: "8px" }}
          >
            {showNav ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
      )}
    </>
  );
}