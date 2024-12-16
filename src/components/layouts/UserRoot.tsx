import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getTokenDuration } from "@utils/authUtils";
import { useRouteLoaderData } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@store/auth";
import { RootState } from "@store";
import { getStaticsData } from "@/api/user";
import { setDate } from "@store/date";

export default function Root() {
  const location = useLocation();
  const token = useRouteLoaderData("root");
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const date = useSelector((state: RootState) => state.dateState);

  useEffect(() => {
    if (token === "EXPIRED") {
      Cookies.remove("access_token");
      navigation("/");
      dispatch(logout());
      return;
    }

    const tokenDuration = getTokenDuration(); 

    setTimeout(() => {
      Cookies.remove("access_token");
      navigation("/");
      dispatch(logout());
    }, tokenDuration);
  }, [token, navigation, dispatch]);

  useEffect(() => {

    const newDate = new Date();
    const oldDate = new Date(date.date);

    newDate.setHours(0, 0, 0, 0);
    oldDate.setHours(0, 0, 0, 0);

    if(newDate.getTime() > oldDate.getTime()) {
      getStaticsData();
      dispatch(setDate());
    }

  },[date.date, dispatch]);

  if(location.pathname.includes("quan-ly") || location.pathname.includes("tuyen-dung") || location.pathname.includes("tao-cv")) {
    return (<>
     <Outlet />
    </>);
  }
  else {
    return (<>
     <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>);
  }
}