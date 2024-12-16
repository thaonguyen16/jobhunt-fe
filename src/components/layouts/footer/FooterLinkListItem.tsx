import { Link } from "react-router-dom";

type FooterListItemProps = {
  content: string;
  key?: string;
};

export default function FooterListItem(props: FooterListItemProps) {
  return (
    <li>
      <Link to="/home">
        <span className="text-sm text-gray-200 transition duration-75 hover:text-primary-500">
          {props.content}
        </span>
      </Link>
    </li>
  );
}
