type CompanyInfoRowProps = {
  label?: string;
  value?: string;
};

export default function CompanyInfoRow(props: CompanyInfoRowProps) {
  return (
    <div className="grid grid-cols-3 text-gray-400">
      <div className="col-span-1">
        <span className="font-semibold text-sm">{props.label}</span>
      </div>
      <div className="col-span-2 text-sm">
        <span>{props.value}</span>
      </div>
    </div>
  );
}
