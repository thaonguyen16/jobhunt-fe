import { RootState } from "@store";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import NotFoundPage from "./NotFoundPage";
import { useEffect } from "react";
import { Loader } from "./";
import { fetchUserProfile } from "@store/auth";
import { AppDispatch } from "@data/interface";

type ProtectedRoutesProps = {
  allowRole: string;
};

export default function ProtectedRoutes({ allowRole }: ProtectedRoutesProps) {
  const auth = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { isAuthenticated, roles } = auth;

  // Ensure user profile is fetched if roles haven't been loaded yet
  useEffect(() => {
    if (isAuthenticated && roles?.length === 0) {
      dispatch(fetchUserProfile());
    }
  }, [isAuthenticated, roles, dispatch]);

  // React Router's `navigate` should be used imperatively within `useEffect`
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/dang-nhap"); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  // Loader is shown while roles are being fetched
  if (isAuthenticated && roles?.length === 0) {
    return <Loader />; // Wait for roles to be fetched
  }

  // If user has the required role, allow access to route, otherwise show 404 page
  return roles?.includes(allowRole) ? <Outlet /> : <NotFoundPage />;
}
