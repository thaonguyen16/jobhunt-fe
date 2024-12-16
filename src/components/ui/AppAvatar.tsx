import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import { IconCamera } from "@tabler/icons-react";

type AppAvatarProps = {
  link?: string;
  openEditModal?: () => void;
};

export default function AvatarComponent({
  link,
  openEditModal,
}: AppAvatarProps) {
  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Tooltip title="Chỉnh sửa ảnh đại diện" placement="bottom">
            <IconButton
              onClick={openEditModal}
              size="small"
              sx={{
                border: "0px solid #0572cc",
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(5, 129, 230, .5)",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "rgba(5, 129, 230, 1)",
                  backdropFilter: "blur(5px)",
                },
              }}
              aria-label="upload picture"
              component="span"
            >
              <IconCamera />
            </IconButton>
          </Tooltip>
        }
      >
        <Avatar
          alt="User Profile"
          sx={{
            width: 100,
            height: 100,
            border: "none",
          }}
          src={link}
        />
      </Badge>
    </>
  );
}
