import { Link } from "react-router-dom";
import { JobCard } from "..";

export default function NearJobSection() {
  return (
    <div className="bg-white py-10 my-2 rounded-md shadow-sm">
      <div className="mx-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Công việc phù hợp gần bạn
          </h2>

          <Link to="/find-job" className="text-primary-600 hover:underline">
            Xem thêm
          </Link>
        </div>

        <div className="job-card-container grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-4 mt-4">
          <JobCard
            isSaved
            title="Kiểm toán ngân hàng"
            companyName="Công ty TNHH Wisdom Square Vietnam"
            companyLogo="https://media.licdn.com/dms/image/C4E0BAQEK2Eq3_aOutA/company-logo_200_200/0/1673257468927/isb_vietnam_co_limited_logo?e=2147483647&v=beta&t=5F1Bv7MWfuPlYC2QCNo5g15Bs3HA2PGzUmVcjtAk7R0"
          />
          <JobCard
            companyLogo="https://media.licdn.com/dms/image/C4E0BAQEK2Eq3_aOutA/company-logo_200_200/0/1673257468927/isb_vietnam_co_limited_logo?e=2147483647&v=beta&t=5F1Bv7MWfuPlYC2QCNo5g15Bs3HA2PGzUmVcjtAk7R0"
            isSaved
            title="Kiểm toán ngân hàng"
            companyName="Công ty TNHH Wisdom Square Vietnam"
          />
          <JobCard
            isSaved
            title="Kiểm toán ngân hàng"
            companyName="Công ty TNHH Wisdom Square Vietnam"
            companyLogo="https://media.licdn.com/dms/image/C4E0BAQEK2Eq3_aOutA/company-logo_200_200/0/1673257468927/isb_vietnam_co_limited_logo?e=2147483647&v=beta&t=5F1Bv7MWfuPlYC2QCNo5g15Bs3HA2PGzUmVcjtAk7R0"
          />
          <JobCard
            isSaved
            title="Kiểm toán ngân hàng"
            companyName="Công ty TNHH Wisdom Square Vietnam"
            companyLogo="https://media.licdn.com/dms/image/C4E0BAQEK2Eq3_aOutA/company-logo_200_200/0/1673257468927/isb_vietnam_co_limited_logo?e=2147483647&v=beta&t=5F1Bv7MWfuPlYC2QCNo5g15Bs3HA2PGzUmVcjtAk7R0"
          />
        </div>
      </div>
    </div>
  );
}
