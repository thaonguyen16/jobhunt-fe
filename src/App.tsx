/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Login,
  Register,
  Job,
  UserSetting,
  JobDetail,
  ConfirmPage,
  CompanyPage,
  CompanyDetailPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  GenerateCVPage,
  ResumeGalleryPage,
} from "@pages";
import { Dashboard } from "@pages/admin";
import { AuthRoot, UserRoot } from "@components/layouts";
import { ErrorBoundary, ProtectedRoute } from "@components/auth";
import { RecruiterManagementPage, EmployerRegisterPage } from "@pages/employer";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import tokenLoader from "@services/tokenLoader";
import PlanPrice from "@pages/PlanPrice";
import PlanPriceRe from "@pages/employer/PlanPrice";
import FindJob from "@pages/candidate/FindJob";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root chung xử lý authentication */}
      <Route
        path="/"
        element={<AuthRoot />} // Root chính có thể là nơi kiểm tra token hoặc xử lý auth
        loader={tokenLoader} // Loader để lấy token xác thực
        errorElement={<ErrorBoundary />}
      >
        {/* Các route chung, không yêu cầu phân quyền */}
        <Route path="" element={<UserRoot />}>
          <Route index path="" element={<Job />} />
          <Route path="dang-nhap" element={<Login />} />
          <Route path="tim-cong-viec" element={<FindJob />} />
          <Route path="dang-ky" element={<Register />} />
          <Route path="tuyen-dung-dang-ky" element={<EmployerRegisterPage />} />
          <Route path="xac-nhan-tai-khoan" element={<ConfirmPage />} />
          <Route path="quen-mat-khau" element={<ForgotPasswordPage />} />
          <Route path="khoi-phuc" element={<ResetPasswordPage />} />

          <Route
            path="chi-tiet-cong-viec/:id"
            element={<JobDetail />}
            id="jobDetail"
          />
          <Route path="cong-ty" element={<CompanyPage />} />
          <Route
            path="cong-ty/:id"
            element={<CompanyDetailPage />}
            id="companyDetail"
          />
          {/* protected routes */}
          <Route element={<ProtectedRoute allowRole="CANDIDATE" />}>
            <Route path="kho-cv" element={<ResumeGalleryPage />} />
            <Route path="nang-cap" element={<PlanPrice />} />
            <Route path="quan-ly" element={<UserSetting />} />
            <Route path="tao-cv" element={<GenerateCVPage />} />
          </Route>
        </Route>

        <Route path="/tuyen-dung">
          <Route path="nang-cap" element={<PlanPriceRe />} />
          <Route path="quan-ly" element={<RecruiterManagementPage />} />
        </Route>

        {/* Admin root */}
        <Route element={<ProtectedRoute allowRole="ADMIN" />}>
          <Route path="/admin">
            <Route path="" element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
