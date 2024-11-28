import { useEffect, useState } from "react";
import {
  Modal,
  Text,
  Button,
  Stack,
  Group,
  TextInput,
  Avatar,
  Loader,
} from "@mantine/core";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getJobApplicationDetail,
  updateJobApplicationStatus,
} from "@/api/application";
import { FaCalendarCheck } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";

type JobApplicationProps = {
  id: string;
  closeModal: () => void;
  opened: boolean;
};

type JobApplicationData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  job: {
    id: string;
    title: string;
  };
  resume: {
    id: string;
    name: string;
    url: string;
  };
  status: string;
};

export default function JobApplicationModal(props: JobApplicationProps) {
  const [jobApplication, setJobApplication] =
    useState<JobApplicationData | null>(null);
  const queryClient = useQueryClient();

  const applyDetailQuery = useQuery({
    queryKey: ["job-application-detail", props.id],
    queryFn: () => getJobApplicationDetail(props.id),
  });

  useEffect(() => {
    if (applyDetailQuery.data) {
      setJobApplication(applyDetailQuery.data.data);
    }
  }, [applyDetailQuery.data]);

  const statusMutation = useMutation<
    PostResponse,
    Error,
    { id: string; status: string }
  >({
    mutationFn: updateJobApplicationStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Thành công",
        message: data.message,
        color: "blue",
      });
      props.closeModal();
      queryClient.invalidateQueries({
        queryKey: ["recruiter-job-applications"],
      });
    },
  });

  return (
    <Modal.Root
      opened={props.opened}
      onClose={props.closeModal}
      size="xl"
      fullScreen
    >
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header bg={"blue.9"}>
          <Modal.Title>
            <Text fw="500" style={{ color: "white" }}>
              Đơn ứng tuyển cho:{" "}
              <span className="text-primary-white font-semibold ">
                {jobApplication?.job.title}
              </span>{" "}
            </Text>
          </Modal.Title>
          <Modal.CloseButton
            variant="outline"
            style={{ color: "white", fontWeight: "500" }}
          />
        </Modal.Header>

        <Modal.Body px="50" mt="20">
          <Group align="start" mx="auto" gap="lg">
            <Stack w={"30%"} mr="lg">
              <Text size="sm" fw="500">
                Thông tin ứng viên
              </Text>
              <Avatar
                mt="lg"
                size="xl"
                radius={"sm"}
                variant="transparent"
                src={jobApplication?.avatar}
                mx="auto"
              ></Avatar>
              <TextInput
                readOnly
                label="Họ tên"
                size="xs"
                value={jobApplication?.name}
              />
              <TextInput
                readOnly
                label="Email liên hệ"
                size="xs"
                value={jobApplication?.email}
              />
              <TextInput
                readOnly
                label="Số Điện thoại"
                size="xs"
                value={jobApplication?.phone}
              />
              <Group mt="lg" justify="end">
                {statusMutation.isPending && <Loader size="xs"></Loader>}
                {jobApplication?.status === "PENDING" ||
                  (jobApplication?.status === "SEEN" && (
                    <Button
                      size="xs"
                      leftSection={<FaCalendarCheck />}
                      color="green.7"
                      onClick={() => {
                        statusMutation.mutate({
                          id: props.id,
                          status: "APPROVED",
                        });
                      }}
                      variant="outline"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Phù hợp
                    </Button>
                  ))}

                {jobApplication?.status !== "SEEN" && (
                  <Button
                    size="xs"
                    variant="outline"
                    color="gray"
                    fw={500}
                    leftSection={<IoCloseCircle />}
                    onClick={() => {
                      statusMutation.mutate({
                        id: props.id,
                        status: "SEEN",
                      });
                    }}
                  >
                    Không phù hợp
                  </Button>
                )}
                {jobApplication?.status === "APPROVED" && (
                  <Text style={{ color: "green", fontWeight: 500 }} size="sm">
                    Ứng viên phù hợp
                  </Text>
                )}
                {jobApplication?.status === "SEEN" && (
                  <Text style={{ color: "red", fontWeight: 500 }} size="sm">
                    Ứng viên không phù hợp
                  </Text>
                )}
              </Group>
            </Stack>
            <Stack gap="sm" w="60%">
              <Text size="md" fw="500" style={{ textAlign: "center" }}>
                CV ứng tuyển
              </Text>
              <iframe
                className="border border-gray-150 w-full h-screen  min-w-full"
                src={jobApplication?.resume.url}
              />
            </Stack>
          </Group>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
