type FormContainerProps = {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormContainer(props: FormContainerProps) {
  return (
    <form style={{
      width: "100%",
      height: "100%"
    }}

      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
}
