type CvLibContainerProps = {
  children?: React.ReactNode;
};
export default function CvLibContainer(props: CvLibContainerProps) {
  return <div className="grid grid-cols-2 gap-4 mt-2">{props.children}</div>;
}
