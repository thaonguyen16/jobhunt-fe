import { LogoInformation, Buttons } from "..";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import PunchClockRoundedIcon from "@mui/icons-material/PunchClockRounded";
import { Text, Badge} from "@mantine/core";

type JobDetailHeaderProps = {
  id?: string;
  title?: string;
  location?: string;
  salary?: string;
  experience?: string;
  saved?: boolean;
  expired?: boolean;
  dueDate?: string;
  disabled?: boolean;
  isApplied?: boolean;
  isHot?: boolean;
  applyNumber?: number;
};

export default function JobDetailHeader(props: JobDetailHeaderProps) {
  return (
    <>
      <div className="job-detail-head p-6 flex flex-col gap-4 bg-white mr-4 rounded-md">
        <Text fw={500} size="lg">
          {props.title}
        </Text>
        <div className="flex items-center justify-between">
          <LogoInformation
            label="Địa điểm:"
            content={props.location || "Chưa cập nhật"}
            icon={<LocationOnIcon />}
          />
          <LogoInformation
            label="Mức lương:"
            content={props.salary || `20 - 25 triệu`}
            icon={<MonetizationOnRoundedIcon />}
          />
          <LogoInformation
            label="Kinh nghiệm:"
            content={props.experience}
            icon={<PunchClockRoundedIcon />}
          />
        </div>
        <div className="max-w-fit inline-block mt-4">
          <Badge
            size="md"
            variant="light"
            mr={"sm"}
            style={{ textTransform: "none" }}
            color={props.expired ? "red" : ""}
          >
            {props.expired
              ? "Hết hạn ứng tuyển"
              : `Hạn ứng tuyển: ${props.dueDate}`}
          </Badge>
          <Badge
            size="md"
            mr={"sm"}
            variant="light"
            style={{ textTransform: "none" }}
            color={"orange"}
          >
            Đơn ứng tuyển: {props.applyNumber || 0}
          </Badge>
          <Badge
            size="md"
            variant="light"
            style={{ textTransform: "none" }}
            color={"green.8"}
          >
            Việc làm khẩn cấp
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Buttons
            id={props.id}
            isSaved={props.saved}
            isExpired={props.expired}
            isApplied={props.isApplied}
            jobTitle={props.title}
          />
        </div>
      </div>
    </>
  );
}
