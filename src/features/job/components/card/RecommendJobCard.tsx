import Typography from "@mui/material/Typography";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { RecommendJobDetail } from "../..";
import { Tooltip } from "@mui/material";
import { CompanyLogo } from "@features/company";
import { Link } from "react-router-dom";

type RecommendJobCardProps = {
  id?: string;
  title?: string;
  companyName?: string;
  location?: string;
  salary?: string;
  jobType?: string;
  logo?: string;
};

export default function RecommendedJobCard(props: RecommendJobCardProps) {
  const locationName = "Hà Nội";

  const limitedCompanyName =
    props.companyName && props.companyName.length > 40
      ? props.companyName.substring(0, 40) + "..." // Nếu độ dài lớn hơn 100, cắt chuỗi và thêm dấu "..."
      : props.companyName;

  const limitedTitle =
    props.title && props.title.length > 50
      ? props.title.substring(0, 50) + "..."
      : props.title;

  return (
    <Link to={`/job-detail/${props.id}`}>
      <div className="flex flex-col p-2 pl-3 border border-gray-100 rounded-md">
        <div className="mb-5 flex gap-2">
          <CompanyLogo sm src={`${props.logo}`} />

          <div className="font-semibold">
            <Tooltip
              title="Fresher React Developer tại Thành phố Hồ Chí Minh"
              placement="top"
            >
              <Typography
                className="text-gray-400"
                variant="subtitle1"
                component="p"
                sx={{ fontSize: "0.8rem", fontWeight: 600 }}
              >
                {limitedTitle}
              </Typography>
            </Tooltip>
            <Tooltip title={props.companyName} placement="top">
              <Typography
                className="text-gray-300"
                variant="subtitle1"
                component="p"
                sx={{ fontSize: "0.7rem" }}
              >
                {limitedCompanyName}
              </Typography>
            </Tooltip>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-200">
          <RecommendJobDetail
            text={props.salary === null ? "Thỏa thuận" : props.salary + " VNĐ"}
            tooltip="Mức lương"
            icon={<MonetizationOnIcon fontSize="small" />}
          />
          <RecommendJobDetail
            text={`${locationName}`}
            tooltip={`${locationName}`}
            icon={<LocationOnIcon fontSize="small" />}
          />
        </div>
      </div>
    </Link>
  );
}
