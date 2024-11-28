type ScrollContainerProps = {
  children: React.ReactNode;
};

export default function ScrollContainer({ children }: ScrollContainerProps) {
  return (
    <div className="h-screen md:h-[500px] lg:h-[700px] overflow-y-scroll  rounded-md">
      {children}
    </div>
  );
}
