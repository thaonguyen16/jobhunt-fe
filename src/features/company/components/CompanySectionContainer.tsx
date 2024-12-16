type CompanySectionContainerProps = {
  children: React.ReactNode;
};

export default function CompanySectionContainer({
  children,
}: CompanySectionContainerProps) {
  return <div className="mt-4 flex flex-col gap-4 px-4">{children}</div>;
}
