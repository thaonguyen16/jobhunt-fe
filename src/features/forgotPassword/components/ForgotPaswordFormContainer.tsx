type FormContainerProps = {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ForgotPasswordFormContainer(props: FormContainerProps) {
  return (
    <form
      className="m-auto w-full md:w-2/5 p-6 mt-10 bg-white rounded-md shadow-md"
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
}
