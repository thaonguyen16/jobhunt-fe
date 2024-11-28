type DataRowContainerProps = {
  children?: React.ReactNode;
  isHead?: boolean;
};

export default function DataRowContainer({
  children,
  isHead,
}: DataRowContainerProps) {
  return (
    <div
      className={`flex items-center gap-8 px-4 ${
        isHead ? "font-semibold" : ""
      }`}
    >
      {children}
    </div>
  );
}
