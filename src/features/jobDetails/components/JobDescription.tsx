import { Text } from "@mantine/core";
import { InformationSection } from "@features/jobDetails";
import { HTMLContent } from "@features/jobDetails";
type JobDescriptionProps = {
  description?: string;
  requirement?: string;
  benefit?: string;
  workingTime?: string;
  workingLocation?: string;
};

export default function JobDescription(props: JobDescriptionProps) {
  return (
    <>
      <Text fw={500} style={{ textAlign: "center", color: "#1864ab" }}>
        Thông tin chi tiết
      </Text>
      <InformationSection
        html
        header="Mô tả công việc"
        Htmlcontent={<HTMLContent htmlContent={props.description} />}
      />
      <InformationSection
        header="Yêu cầu công việc"
        html
        Htmlcontent={<HTMLContent htmlContent={props.requirement} />}
      />
      <InformationSection
        header="Quyền lợi"
        html
        Htmlcontent={<HTMLContent htmlContent={props.benefit} />}
      />
      <InformationSection
        header="Thời gian làm việc"
        textContent={props.workingTime}
      ></InformationSection>
      <InformationSection
        header="Địa điểm làm việc"
        textContent={props.workingLocation}
      />
    </>
  );
}
