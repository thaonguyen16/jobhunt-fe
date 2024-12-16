import Typography from "@mui/material/Typography";
import HtmlContent from "@features/jobDetails/components/HTMLContent";

type LongDescriptionBoxProps = {
  content?: React.ReactNode;
  label?: string;
};

export default function LongDescriptionBox(props: LongDescriptionBoxProps) {
  return (
    <div>
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {props.label}
      </Typography>
      <div className="rounded-md border-2 border-gray-150 text-gray-200">
        <HtmlContent />
      </div>
    </div>
  );
}
