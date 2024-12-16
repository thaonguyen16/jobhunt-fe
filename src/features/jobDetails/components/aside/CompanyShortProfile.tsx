import { LogoInformation } from "@features/jobDetails";
import { CompanyLogo } from "@features/company";
import { Typography } from "@mui/material";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";

type CompanyShortProfileProps = {
  avatarUrl?: string;
  companyName?: string;
  companySize?: string;
  companyAddress?: string;
};
export default function CompanyShortProfile(props: CompanyShortProfileProps) {
  return (
    <>
      <div className="flex gap-4">
        <div className="w-1/4 flex-none">
          {" "}
          <CompanyLogo src={props.avatarUrl} />
        </div>
        <div className="w-3/4">
          <Typography
            variant="subtitle2"
            sx={{
              textTransform: "uppercase",
            }}
          >
            {props.companyName}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <LogoInformation
          small
          label="Quy mô: "
          icon={<PeopleAltRoundedIcon sx={{ width: "1rem", height: "1rem" }} />}
          content={props.companySize || "1000 nhân viên"}
        />
        <LogoInformation
          small
          label="Địa chỉ: "
          icon={<FmdGoodRoundedIcon sx={{ width: "1rem", height: "1rem" }} />}
          content={props.companyAddress || "Hà Nội"}
        />
      </div>
    </>
  );
}
