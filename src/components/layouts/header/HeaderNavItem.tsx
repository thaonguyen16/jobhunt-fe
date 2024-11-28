type HeaderNavItemProps = {
  name?: string;
};

export default function HeaderNavItem(props: HeaderNavItemProps) {
  return (
    <li className="trasitioin duration-100 font-semibold px-4 py-2">
      {props.name}
    </li>
  );
}
