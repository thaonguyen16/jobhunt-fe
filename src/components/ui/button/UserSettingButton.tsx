import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { RootState } from "@store";

type UserSettingButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
};
export default function UserSettingButton(props: UserSettingButtonProps) {
  const userAvatar = useSelector((state: RootState) => state.userAvatar);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Tooltip title="Cài đặt tài khoản">
        <IconButton
          onClick={props.handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={props.open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={props.open ? "true" : undefined}
        >
          <Avatar src={userAvatar.url}></Avatar>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
