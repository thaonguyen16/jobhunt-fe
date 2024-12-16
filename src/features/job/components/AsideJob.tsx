import Typography from "@mui/material/Typography";
import { RecommendJobCard } from "@features/job";

import { useState } from "react";
import { CandidateJob } from "@data/interface";

export default function AsideJob() {
  const [jobs] = useState<CandidateJob[]>([]);

  return (
    <>
      <Typography
        sx={{ fontWeight: 600, fontSize: "1rem" }}
        className="text-gray-400"
        variant="h6"
        component="h6"
      >
        Có thể bạn quan tâm
      </Typography>
      <div className="flex flex-col gap-2 mt-4">
        {jobs?.map((job) => (
          <RecommendJobCard
            key={job.id}
            id={job.id}
            title={job.title}
            companyName={job.companyName}
            location={job.location?.id}
            salary={job.textSalary}
            logo={job.companyImage}
          />
        ))}
      </div>
    </>
  );
}
