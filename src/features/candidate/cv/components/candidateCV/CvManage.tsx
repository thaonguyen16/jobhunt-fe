import { CvLib } from "@features/candidate/setting";
import { MainSectionContainer } from "@components/ui";

export default function CvManage() {
  return (
    <MainSectionContainer>
      <div className="m-auto p-5">
        <CvLib />
      </div>
    </MainSectionContainer>
  );
}
