import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getTokenDuration } from "@utils/authUtils";
import { useRouteLoaderData } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "@store/auth";

export default function UserRoot() {
  const token = useRouteLoaderData("root");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
   if (token === "EXPIRED") {
      Cookies.remove("access_token");
      if(location.pathname.includes("quan-ly"))
        navigation("/");
      dispatch(logout());
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      Cookies.remove("access_token");
      if(location.pathname.includes("quan-ly"))
        navigation("/");
      dispatch(logout());
    }, tokenDuration);
  }, [token, navigation, dispatch, location.pathname]);

  return <Outlet />;
}