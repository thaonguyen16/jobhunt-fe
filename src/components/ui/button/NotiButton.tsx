import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Notifications from "@mui/icons-material/Notifications";
import { NotificationBox } from "@features/notification";
import { useState } from "react";

const notiBtnStyles = {
  backgroundColor: "#f0f0f0",
  "&hover": {
    backgroundColor: "#f7f7f7",
  },
};
export default function NotiButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Thông báo">
        <IconButton
          sx={notiBtnStyles}
          aria-describedby={id}
          onClick={handleClick}
        >
          <Notifications className="text-primary-500" />
        </IconButton>
      </Tooltip>
      <NotificationBox
        open={open}
        id={id}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
}
