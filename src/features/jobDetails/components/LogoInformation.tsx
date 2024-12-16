import { Tooltip } from "@mantine/core";

type LogoInformationProps = {
  icon?: React.ReactNode;
  label?: string;
  content?: string;
  small?: boolean;
  color?: string;
};

export default function LogoInformation(props: LogoInformationProps) {
  return (
    <div className="flex items-center gap-3 ">
      <div
        className={`flex items-center justify-center  ${
          props.small
            ? "text-sm text-gray-200"
            : "rounded-full bg-gradient-to-r from-primary-600 to-primary-300 p-2 text-white"
        }`}
      >
        {props.icon}
      </div>
      <div
        className={`flex  ${
          props.small
            ? "flex-row gap-2 items-center text-xs"
            : "flex-col text-sm"
        }`}
      >
        <span className="text-gray-400 flex-none">{props.label}</span>
        {!props.small && (
          <span className="text-gray-400 font-semibold flex-1 overflow-ellipsis">
            {props.content}
          </span>
        )}
        {props.small && (
          <Tooltip label={props.content} position="top">
            <span className="text-gray-400 font-semibold flex-1 overflow-ellipsis">
              {props.content || "Không xác định"}
            </span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
