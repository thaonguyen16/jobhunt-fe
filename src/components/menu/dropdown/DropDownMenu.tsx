import List from "@mui/material/List";
import { DropDownItem } from "@components/menu";

type DropDownMenuProps = {
  children?: React.ReactNode;
  items?: string[];
};

export default function DropDownMenu(props: DropDownMenuProps) {
  return (
    <List>
      {props.items?.map((item) => (
        <DropDownItem key={item} name={item} />
      ))}
    </List>
  );
}
