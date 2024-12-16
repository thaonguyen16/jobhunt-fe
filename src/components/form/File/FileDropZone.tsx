import { FileWithPath, useDropzone } from "react-dropzone";
import { useMemo, CSSProperties } from "react";
import { FormControlLabel } from "@components/form/FormUI";
import { Avatar, Tooltip } from "@mui/material";
import { ActionIcon, Flex, Text } from "@mantine/core";
import { IconCloudUpload, IconTrash } from "@tabler/icons-react";

const baseStyle: CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "100%",
};

const focusedStyle: CSSProperties = {
  borderColor: "#2196f3",
};

const acceptStyle: CSSProperties = {
  borderColor: "#00e676",
};

const rejectStyle: CSSProperties = {
  borderColor: "#ff1744",
};

type FileDropZoneProps = {
  label?: string;
  content?: string;
  description?: string;
  labelBold?: boolean;
  statusF: boolean;
  exts?: string[];
  isPapers?: boolean;
  onSelectFile: (file: FileWithPath | null) => void;
};

export default function FileDropZone(props: FileDropZoneProps) {
  const { label, description, onSelectFile,statusF, isPapers } = props;
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    open,
    isDragReject,
  } = useDropzone({
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": props.exts || [".png", ".jpg", ".jpeg"],
    },
    onDrop: (files) => onSelectFile(files[0]),
    onFileDialogCancel: () => onSelectFile(null)
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const renderFiles = () => {
    if (isPapers) {
      return acceptedFiles.map((file: FileWithPath) => (
        <p
          key={file.path}
          className="text-sm text-primary-600 font-thin bg-gray-100 w-full py-2 px-4"
        >
          {file.path} - {file.size} bytes
        </p>
      ));
    } else {
      return (
        acceptedFiles[0] && <Avatar
          src={URL.createObjectURL(acceptedFiles[0])}
          sx={{ width: "200px", height: "200px" }}
        />
      );
    }
  };

  return (
    <section className="w-full max-w-[700px] h-full mx-auto">
      {label && <FormControlLabel label={label} bold={props.labelBold} />}
      <div {...getRootProps({ style })} className="min-h-[150px] h-fu m-auto">
        <input {...getInputProps()} />
        {statusF && (
          <div className="m-auto w-full flex flex-col items-center gap-2">
            {renderFiles()}
          </div>
        )}
        {!statusF && (
          <Flex justify="center"
          align="center"
          direction="column"
          wrap="wrap">
            <ActionIcon onClick={open} variant="transparent" aria-label="Settings" size={"3rem"}>
            <IconCloudUpload size={"3rem"} stroke={1.5} />
        </ActionIcon>
        <Text size="0.9rem" mt={"5px"}>Tải lên</Text>
          </Flex>
          
        )}
        {statusF && (
          <Tooltip title="Tải lại ảnh">
            <ActionIcon mt={"20px"} onClick={open} variant="filled" color="red" radius="xl" aria-label="Settings">
      <IconTrash size={"1rem"} stroke={1.5} />
    </ActionIcon>
            
          </Tooltip>
        )}
      </div>
      <Text w={"100%"} size="0.8rem" ta={"center"} c={"grey"} mt={"20px"}>{description}</Text>
      {/* <p className="text-xs text-gray-200 my-2">{description}</p> */}
    </section>
  );
}
