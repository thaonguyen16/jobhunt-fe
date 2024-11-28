type FormControlLabelProps = {
  label?: string;
  htmlFor?: string;
  bold?: boolean;
  strict?: boolean;
};

export default function FormControlLabel(props: FormControlLabelProps) {
  return (
    <label
      className={`text-gray-600 text-sm ${
        props.bold ? "font-semibold" : "font-medium"
      }`}
      htmlFor={props.htmlFor}
    >
      {props.label}{" "}
      {props.strict && <span className="text-error-400">(*)</span>}
    </label>
  );
}
