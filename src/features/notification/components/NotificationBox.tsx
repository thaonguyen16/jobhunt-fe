import Popover from "@mui/material/Popover";
import { Notification } from "..";
import { Text, Divider } from "@mantine/core";
import { Message } from "@data/interface/message";

type NotificationBoxProps = {
  id?: string;
  open: boolean;
  data: Message[];
  anchorEl?: HTMLButtonElement | null;
  handleClose?: () => void;
};

export default function NotificationBox(props: NotificationBoxProps) {
  return (
    <Popover
      id={props.id}
      open={props.open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <div className="min-w-[200px] max-w-[300px] flex flex-col gap-2 p-2">
        <Text size="md" fw={500}>
          Thông báo
        </Text>
        <Divider />
        <div className="flex flex-col gap-2 max-h-[700px] lg:max-h-[500px] overflow-y-auto">
          {props.data.map((noti) => (
            <Notification
              key={noti.id}
             data={noti}
            />
          ))}
        </div>
      </div>
    </Popover>
  );
}
