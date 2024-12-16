/* eslint-disable @typescript-eslint/no-unused-vars */
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Notifications from "@mui/icons-material/Notifications";
import { NotificationBox } from "@features/notification";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMessage } from "@/api/user";
import { Message } from "@data/interface/message";
import { Indicator } from "@mantine/core";

const notiBtnStyles = {
  backgroundColor: "#f0f0f0",
  "&hover": {
    backgroundColor: "#f7f7f7",
  },
};
export default function NotiButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [messageData, setMessageData] = useState<Message[]>([]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const notific = useQuery({
    queryKey: ["get_notific"],
    queryFn: () => getMessage(),
  });

  useEffect(() => {
    if(notific.data) {
      console.log(notific.data.data);

      setMessageData(notific.data.data.listData);
    }
  },[notific.data]);

  return (
    <>
      <Tooltip title="Thông báo">
      {messageData.length !== 0 ? <Indicator inline label={messageData.length} size={16} offset={6} color="red.9">
        <IconButton
          sx={notiBtnStyles}
          aria-describedby={id}
          onClick={handleClick}
        >
          <Notifications className="text-primary-500" />
        </IconButton>
        </Indicator>
        :
        <IconButton
          sx={notiBtnStyles}
          aria-describedby={id}
          onClick={handleClick}
        >
          <Notifications className="text-primary-500" />
        </IconButton>
        }
      </Tooltip>
      <NotificationBox
        open={open}
        data = {messageData}
        id={id}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
}
