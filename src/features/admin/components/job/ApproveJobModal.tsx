import {
  Flex,
  TextInput,
  Group,
  Modal,
  Stack,
  Textarea,
  Button,
  MultiSelect,
  LoadingOverlay,
} from "@mantine/core";
import HtmlContent from "@components/ui/HtmlContent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { approveJob, getJobById } from "@/api/job";
import { useEffect, useState } from "react";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";

type ApproveJobModalProps = {
  approvalModalOpened: boolean;
  closeApprovalModal: () => void;
  openRejectModal: () => void;
  status: string;
  jobId: number | null;
};

export default function ApproveJobModal(props: ApproveJobModalProps) {
  const query = useQuery({
    queryKey: ["adminJobDetails", props.jobId],
    queryFn: () => getJobById(props.jobId),
    enabled: !!props.jobId,
  });

  const useClient = useQueryClient();

  const approveMutation = useMutation<PostResponse, Error, number>({
    mutationFn: approveJob,
    onSuccess: (data) => {
      props.closeApprovalModal();
      useClient.invalidateQueries({ queryKey: ["adminFilterJob"] });
      notifications.show({
        title: "Thành công",
        message: data.message,
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "red",
      });
      console.error(error);
    },
  });

  const [job, setJob] = useState<any>();
  const [subIndustries, setSubIndustries] = useState<string[]>([]);

  useEffect(() => {
    if (query.data) {
      setJob(query.data?.job);
      setSubIndustries(job?.subIndustries.map((item: any) => item.name));
    }
  }, [query.data]);

  return (
    <Modal
      zIndex={50}
      size={"70%"}
      opened={props.approvalModalOpened}
      onClose={props.closeApprovalModal}
      title="Phê duyệt công việc"
    >
      <LoadingOverlay visible={query.isLoading || approveMutation.isPending} />
      <Flex direction="column" gap="md">
        <Group justify="space-between" wrap="nowrap" grow>
          <Textarea label="Tên công việc" readOnly value={job?.title} />
          <Textarea label="Tên công ty" value={job?.company?.name} readOnly />
        </Group>
        <Group justify="space-between" wrap="nowrap" grow>
          <Textarea
            label="Địa điểm làm việc"
            readOnly
            value={job?.workLocation}
          />
          <Textarea label="Thời gian làm việc" readOnly value={job?.workTime} />
        </Group>
        <Group justify="space-between" wrap="nowrap" grow>
          <TextInput label="Ngày tạo" value={job?.createdAt} readOnly />
          <TextInput label="Ngày hết hạn" value={job?.deadline} />
          <TextInput
            label="Số lượng cần tuyển"
            readOnly
            type="number"
            value={job?.slots}
          />
        </Group>
        <Group justify="space-between" wrap="nowrap" grow>
          <TextInput label="Địa điểm" readOnly value={job?.location?.name} />
          <TextInput label="Lĩnh vực" readOnly value={job?.industry?.name} />
          <TextInput label="Lương tối đa" readOnly value={job?.maxSalary} />
        </Group>
        <Group justify="space-between" wrap="nowrap" grow>
          <MultiSelect label="Ngành nghề" readOnly value={subIndustries} />
        </Group>
        <Stack>
          <HtmlContent htmlContent={job?.description} label="Mô tả công việc" />
          <HtmlContent
            htmlContent={job?.requirement}
            label="Yêu cầu công việc"
          />
          <HtmlContent htmlContent={job?.benefit} label="Quyền lợi" />
        </Stack>
      </Flex>
      <Flex mt="md" justify="end" gap="xs">
        <Button
          color="gray"
          size="xs"
          type="submit"
          onClick={props.closeApprovalModal}
        >
          Đóng
        </Button>

        {props.status !== "ACTIVE" && (
          <Button
            color="blue"
            size="xs"
            onClick={() => {
              if (props.jobId) {
                approveMutation.mutate(props.jobId);
              }
            }}
          >
            Duyệt
          </Button>
        )}
        {props.status !== "REJECTED" && (
          <Button color="red" size="xs" onClick={props.openRejectModal}>
            Từ chối
          </Button>
        )}
      </Flex>
    </Modal>
  );
}
