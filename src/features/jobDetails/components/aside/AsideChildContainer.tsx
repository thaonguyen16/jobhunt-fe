type AsideChildContainerProps = {
  children?: React.ReactNode;
};
export default function AsideChildContainer(props: AsideChildContainerProps) {
  return <div className="bg-white rounded-md p-4 pb-8">{props.children}</div>;
}
