import { Text, FileInput } from "@mantine/core";

type UploadFormProps = {
  file: File | null;
  setFile: (file: File | null) => void;
};

export default function UploadForm(props: UploadFormProps) {
  return (
    <div className="px-4 py-4 flex flex-col gap-2">
      <FileInput
        label="Upload files"
        placeholder="Tải CV lên"
        size="sm"
        value={props.file}
        onChange={props.setFile}
      />

      <Text size="xs" style={{ color: "#008055" }}>
        Hỗ trợ định dạng pdf có kích thước dưới 5MB
      </Text>
    </div>
  );
}
