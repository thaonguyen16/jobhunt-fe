import { LargeContainer } from "@components/ui";
type HeaderWrapperProps = {
  children?: React.ReactNode;
};
export default function HeaderWrapper({ children }: HeaderWrapperProps) {
  return (
    <header className="bg-white shadow-md sticky top-0 left-0 right-0 z-40">
      <LargeContainer>{children}</LargeContainer>
    </header>
  );
}
