import { LogoInformation } from "@features/jobDetails";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import WcRoundedIcon from "@mui/icons-material/WcRounded";

import { Text } from "@mantine/core";

type GeneralInfoProps = {
  positionName?: string;
  candidateNumber?: number;
  workModeName?: string;
  genderName?: string;
};
export default function GeneralInfo(props: GeneralInfoProps) {
  return (
    <>
      <Text fw={500}>Thông tin chung</Text>
      <div className="flex flex-col gap-6 mt-6">
        <LogoInformation
          label="Cấp bậc"
          content={props.positionName || "Nhân viên"}
          icon={<StarsRoundedIcon />}
        />
        <LogoInformation
          label="Số lượng tuyển"
          content={
            props.candidateNumber
              ? `${props.candidateNumber} nhân viên`
              : "Không xác định"
          }
          icon={<PeopleAltRoundedIcon />}
        />
        <LogoInformation
          label="Hình thức làm việc"
          content={props.workModeName || "Không yêu cầu"}
          icon={<BusinessCenterRoundedIcon />}
        />
        <LogoInformation
          label="Giới tính"
          content={props.genderName || "Không yêu cầu"}
          icon={<WcRoundedIcon />}
        />
      </div>
    </>
  );
}
