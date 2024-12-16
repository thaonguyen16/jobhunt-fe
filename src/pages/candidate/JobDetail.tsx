import Container from "@mui/material/Container";
import { Buttons, JobDescription, JobDetailHeader } from "@features/jobDetails";
import { useParams } from "react-router-dom";

import {
  AsideChildContainer,
  GeneralInfo,
  KeyInfo,
} from "@features/jobDetails";
import { CompanyShortProfile } from "@features/jobDetails";
import { useQuery } from "@tanstack/react-query";
import { getJobById } from "@/api/job";
import { useEffect, useState } from "react";
import { Option } from "@data/interface/option";
import { CompanyInfo } from "@data/interface";
import { LoadingOverlay } from "@mantine/core";
import ScrollToTop from "@components/ui/ScrollToTop";

type JobDetailType = {
  id: string;
  title: string;
  description: string;
  benefit: string;
  requirement: string;
  salary: string;
  minSalary: number;
  maxSalary: number;
  location: Option;
  industry: Option;
  company: CompanyInfo;
  experienceRange: string;
  slots: number;
  isHot: boolean;
  workMode: Option;
  createdAt: string;
  applyCount: number;
  saved: boolean;
  applied: boolean;
  expired: boolean;
  deadline: string;
  locationId: number;
  updatedAt: string;
  status: string;
  workTime: string;
  workLocation: string;
  subIndustries: Option[];
};

export default function JobDetail() {
  const [job, setJob] = useState<JobDetailType | null>(null);

  const { id } = useParams<{ id: string }>();

  const getJobQuery = useQuery({
    queryKey: ["jobDetail", id],
    queryFn: () => getJobById(Number(id)),
  });

  useEffect(() => {
    if (getJobQuery.data) {
      setJob(getJobQuery.data.job);
    }
  }, [getJobQuery.data]);

  return (
    <Container
      style={{
        backgroundColor: "#ffffff",
        marginBottom: "2.4rem",
        marginTop: "0.6rem",
        position: "relative",
        padding: 0,
      }}
    >
      <ScrollToTop />
      <LoadingOverlay visible={getJobQuery.isLoading} />

      <div className="flex">
        <div className="flex-1 w-2/3 flex flex-col bg-gray-50">
          <JobDetailHeader
            id={job?.id}
            title={job?.title}
            expired={job?.expired}
            saved={job?.saved}
            salary={job?.salary || "Đang cập nhật"}
            experience={job?.experienceRange || "Chưa cập nhật"}
            location={job?.location?.name || "Không xác định"}
            dueDate={job?.deadline}
            isApplied={job?.applied || false}
            applyNumber={job?.applyCount}
            isHot={job?.isHot}
          />
          <div className="bg-white mt-4 mr-4 rounded-md p-4">
            <JobDescription
              description={job?.description}
              benefit={job?.benefit}
              requirement={job?.requirement}
              workingTime={job?.workTime}
              workingLocation={job?.workLocation}
            />
            <div className="w-3/4 flex items-center ml-auto gap-2 my-8">
              <Buttons
                isSaved={job?.saved}
                isExpired={job?.expired}
                isApplied={job?.applied}
              />
            </div>
          </div>
        </div>
        <aside className="flex-none w-1/3 bg-gray-50 text-gray-400">
          <div className="flex flex-col gap-4">
            <AsideChildContainer>
              <CompanyShortProfile
                avatarUrl={job?.company?.image}
                companyName={job?.company?.name}
                companySize={job?.company?.scale}
                companyAddress={job?.company?.address}
              />
            </AsideChildContainer>

            <AsideChildContainer>
              <GeneralInfo
                candidateNumber={job?.slots}
                workModeName={job?.workMode?.name}
              />
            </AsideChildContainer>

            <AsideChildContainer>
              <KeyInfo
                industry={job?.industry.name}
                subIndustries={[
                  ...(job?.subIndustries?.map((item) => item?.name) || []),
                ]}
              />
            </AsideChildContainer>
          </div>
        </aside>
      </div>
    </Container>
  );
}
