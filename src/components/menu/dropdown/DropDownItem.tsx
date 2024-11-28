import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

type DropDownItemProps = {
  name: string;
};

export default function DropDownItem(props: DropDownItemProps) {
  return (
    <ListItem style={{ margin: 0, padding: 0 }}>
      <ListItemButton>
        <ListItemText style={{ fontSize: "14px" }} primary={props.name} />
      </ListItemButton>
    </ListItem>
  );
}
