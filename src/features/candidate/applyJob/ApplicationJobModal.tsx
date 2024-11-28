import DescriptionIcon from "@mui/icons-material/Description";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useEffect, useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Group,
  Text,
  Select,
  LoadingOverlay,
  Divider,
  ComboboxItem,
  Loader,
} from "@mantine/core";
import { UploadForm } from ".";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCandidateProfile } from "@/api/user";
import { getResumeOptions } from "@/api/resume";
import { PostResponse } from "@data/interface";
import { applyJob } from "@/api/application";
import { notifications, showNotification } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";

type ApplicationJobModalProps = {
  closeModal: () => void;
  opened: boolean;
  jobTitle?: string;
};

export type ApplyJobReq = {
  jobId: string;
  cvId: string;
  name: string;
  phone: string;
  email: string;
  file?: File | null;
};

export default function ApplicationModal(props: ApplicationJobModalProps) {
  const [value, setValue] = useState(1);
  const [CVs, setCVs] = useState<ComboboxItem[]>([]);
  const [chosenCVId, setChosenCVId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const { id } = useParams();

  const userProfile = useQuery({
    queryKey: ["profile"],
    queryFn: () => getCandidateProfile(),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ApplyJobReq>({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      email: userProfile.data?.data.email || "",
      phone: userProfile.data?.data.phone || "",
      name: userProfile.data?.data.fullName || "",
      jobId: id,
    },
  });

  const applyMutation = useMutation<PostResponse, Error, ApplyJobReq>({
    mutationFn: applyJob,
    onSuccess: (data) => {
      notifications.show({
        title: "Thành công",
        message: data.message,
        color: "teal",
      });
      props.closeModal();
      setFile(null);
      reset();
    },
    onError: (data) => {
      showNotification({
        title: "Lỗi",
        message: data.message,
        color: "red",
      });
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(+event.target.value);
  };

  const useCV = useQuery({
    queryKey: ["CVs"],
    queryFn: () => getResumeOptions(),
  });

  useEffect(() => {
    if (useCV.data) {
      setCVs(
        useCV.data.data.map((cv) => ({
          value: cv.id.toString(),
          label: cv.name || "CV không tên",
        }))
      );
      setChosenCVId(useCV.data.data[0].id.toString());
    }
  }, [useCV.data]);

  const onSubmit: SubmitHandler<ApplyJobReq> = (data) => {
    if (value === 2) {
      applyMutation.mutate({ ...data, cvId: chosenCVId, file: null });
    } else if (value === 3) {
      applyMutation.mutate({ ...data, file: file });
    }
  };

  return (
    <Modal.Root opened={props.opened} onClose={props.closeModal} size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Text fw={500}>Ứng tuyển cho: {props.jobTitle} </Text>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body px="xl">
          <Text size="sm">
            Điền các thông tin sau. <span className="text-error-400">(*)</span>{" "}
            là bắt buộc
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LoadingOverlay visible={userProfile.isLoading} />
            <Group justify="center" grow>
              <TextInput
                size="xs"
                label="Tên đầy đủ"
                type="text"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Tên là bắt buộc",
                  },
                })}
                error={errors.name && <p>{errors.name.message}</p>}
              />

              <TextInput
                size="xs"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Số điện thoại là bắt buộc",
                  },
                  pattern: {
                    value:
                      /^\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
                label="Số điện thoại"
                type="phone"
                error={errors.phone && <p>{errors.phone.message}</p>}
              />
              <TextInput
                size="xs"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email là bắt buộc",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Email không hợp lệ",
                  },
                })}
                label="Email"
                type="email"
                error={errors.email && <p>{errors.email.message}</p>}
              />
            </Group>

            <Divider size="sm" my="sm" />
            <Group mb="sm" gap="xs">
              <DescriptionIcon color="primary" />
              <Text fw={500} size="sm">
                Chọn CV để ứng tuyển
              </Text>
            </Group>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <div
                className={`relative border-2 rounded-md px-2 mb-2 ${
                  value === 2 ? "border-primary-400" : "border-gray-150"
                }`}
              >
                <FormControlLabel
                  value={2}
                  control={<Radio />}
                  label={<Text size="sm">Chọn CV có sẵn</Text>}
                />
                {value === 2 && (
                  <Group mb="md">
                    <Select
                      size="sm"
                      data={CVs}
                      defaultValue={CVs[0].value}
                      onChange={(value) => {
                        setChosenCVId(value || "");
                      }}
                    />
                  </Group>
                )}
              </div>

              <div
                className={`relative border-2 border-dashed rounded-md px-2 mb-2 flex flex-col ${
                  value === 3 ? "border-primary-400" : "border-gray-150"
                }`}
              >
                <FormControlLabel
                  value={3}
                  control={<Radio />}
                  label={<Text size="sm">Tải CV lên</Text>}
                />
                {value === 3 && <UploadForm file={file} setFile={setFile} />}
              </div>
            </RadioGroup>
            <Group justify="end">
              <Button variant="outline" onClick={props.closeModal} size="xs">
                Huỷ
              </Button>
              <Button type="submit" size="xs" disabled={!isValid}>
                {!applyMutation.isPending ? (
                  "Ứng tuyển"
                ) : (
                  <Loader size="xs" color="white" />
                )}
              </Button>
            </Group>
          </form>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
