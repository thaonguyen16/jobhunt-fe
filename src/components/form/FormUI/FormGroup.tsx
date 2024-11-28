type FormGroupProps = {
  children: React.ReactNode;
};

export default function FormGroup(props: FormGroupProps) {
  return <div className="px-6 flex flex-col pt-8 gap-6">{props.children}</div>;
}
