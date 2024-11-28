import { getCompany } from "@/api/company";
import { RightAsideLayout } from "@components/layouts";
import { MediumContainer } from "@components/ui";
import { CompanyInfo } from "@data/interface";
import {
  CompanyDescription,
  CompanyHeader,
  CompanyJobs,
  ContactInfo,
} from "@features/company";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

export default function CompanyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [company, setCompany] = useState<CompanyInfo | null>(null);

  const companyInfoQuery = useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(Number(id)),
    enabled: !!id && Number(id) > 0,
  });

  useEffect(() => {
    if (companyInfoQuery.data) {
      setCompany(companyInfoQuery.data.data.company);
    }
  }, [companyInfoQuery.data]);

  const main = (
    <>
      <CompanyHeader
        companyLogo={company?.image}
        companySize={company?.scale}
        companyName={company?.name}
        companyWebsite={company?.webUrl}
      />
      <CompanyDescription description={company?.description} />

      <CompanyJobs id={id + ""} />
    </>
  );
  const aside = (
    <ContactInfo
      email={company?.email || "Chưa cập nhật"}
      phone={company?.phone || "Chưa cập nhật"}
      address={company?.address}
    />
  );

  return (
    <MediumContainer>
      <RightAsideLayout main={main} aside={aside}></RightAsideLayout>
    </MediumContainer>
  );
}
