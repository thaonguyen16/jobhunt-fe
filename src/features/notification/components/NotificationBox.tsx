import Popover from "@mui/material/Popover";
import { Notification } from "..";
import { Text, Divider } from "@mantine/core";

type NotificationBoxProps = {
  id?: string;
  open: boolean;
  anchorEl?: HTMLButtonElement | null;
  handleClose?: () => void;
};

const notifications = [
  {
    id: 1,
    title: "Tìm thấy một công việc phù hợp với bạn",
    content:
      "Công ty abc đăng tuyển vị trí Fresher React JS, nhanh tay ứng tuyển nàoCông ty abc đăng tuyển vị trí Fresher React JS, nhanh tay ứng tuyển nào Công ty abc đăng tuyển vị trí Fresher React JS, nhanh tay ứng tuyển nào Công ty abc đăng tuyển vị trí Fresher React JS, nhanh tay ứng tuyển nào",
  },
  {
    id: 2,
    title: "Tìm thấy một công việc phù hợp với bạn",
    content:
      "Công ty abc đăng tuyển vị trí Fresher React JS, nhanh tay ứng tuyển nào",
  },
  {
    id: 3,
    title: "Tìm thấy một công việc phù hợp với bạn",
    content:
      "Công ty abc đăng tuyển vị trí Fresher React JS, nhanh tay ứng tuyển nào",
  },
  {
    id: 4,
    title: "Tìm thấy một công việc phù hợp với bạn",
    content:
      "Công ty abc đăng tuyển vị trí Fresher React JS, nhanh tay ứng tuyển nào",
  },
];

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
          {notifications.map((noti) => (
            <Notification
              key={noti.id}
              title={noti.title}
              content={noti.content}
            />
          ))}
        </div>
      </div>
    </Popover>
  );
}
