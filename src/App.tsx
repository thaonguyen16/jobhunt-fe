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
} from "@pages";
import { Dashboard } from "@pages/admin";
import { UserRoot } from "@components/layouts";
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
import FindJob from "@pages/candidate/FindJob";
import Payment from "@pages/Payment";
import PaymentCallback from "@pages/PaymentCallback";
import PlanContainer from "@features/plan/PlanContainer";
import { Header } from "@components/layouts/header";
import { Footer } from "@components/layouts/footer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Các route chung, không yêu cầu phân quyền */}
      <Route
        path=""
        element={<UserRoot />}
        id="root"
        loader={tokenLoader}
        errorElement={<ErrorBoundary />}
      >
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
          <Route path="nang-cap" element={<PlanPrice />} />
          <Route path="quan-ly" element={<UserSetting />} />
          <Route path="tao-cv" element={<GenerateCVPage />} />
          <Route path="thanh-toan" element={<Payment />} />
          <Route path="thanh-toan/callback" element={<PaymentCallback />} />
          <Route path="goi-vip" element={<PlanContainer type={"CANDIDATE_PLAN"}/>} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowRole="RECRUITER" />}>
        <Route path="/tuyen-dung">
          <Route path="quan-ly" element={<RecruiterManagementPage />} />
        </Route>

        <Route path="goi-dich-vu" element={<>
          <Header />
          <PlanContainer type={"RECRUITER_PLAN"}/>
          <Footer />
          </>} />
        <Route path="thanh-toan" element={<Payment />} />
        <Route path="thanh-toan/callback" element={<PaymentCallback />} />

      </Route>


      {/* Admin root */}
      <Route
        element={<ProtectedRoute allowRole="ADMIN" />}
        errorElement={<ErrorBoundary />}
      >
        <Route path="/admin">
          <Route path="" element={<Dashboard />} />
        </Route>
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;