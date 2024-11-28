import { Header } from "./header";
import { Footer } from "./footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const location = useLocation();

  return !location.pathname.includes("quan-ly") ? (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  ) : (
    <Outlet />
  );
}
