import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

type RecommendJobDetailProps = {
  tooltip: string;
  text: string;
  icon: React.ReactNode;
};

export default function RecommendJobDetail(props: RecommendJobDetailProps) {
  return (
    <Tooltip title={props.tooltip} placement="top">
      <div className="flex items-center gap-1">
        {props.icon}
        <Typography
          className="text-gray-300"
          variant="subtitle2"
          component="span"
          sx={{ fontSize: "0.6rem" }}
        >
          {props.text}
        </Typography>
      </div>
    </Tooltip>
  );
}
