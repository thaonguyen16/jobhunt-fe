import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";

type SettingMenuItemProps = {
  onLogout?: () => void;
  icon?: React.ReactNode;
  text: string;
};
export default function SettingMenuItem(props: SettingMenuItemProps) {
  return (
    <MenuItem
      onClick={props.onLogout && props.onLogout}
      sx={{
        fontSize: "16px",
        "&:hover": {
          color: "#0581e6",
        },
      }}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      {props.text}
    </MenuItem>
  );
}
