import {
  Modal,
  Stack,
  Textarea,
  Grid,
  Group,
  TextInput,
  Checkbox,
  Select,
  MultiSelect,
  Loader,
  Text,
  Button,
  Alert,
  LoadingOverlay,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { QuillTextEditor } from "@features/recruiter";

import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { IAddJob } from "../interface";
import { notifications } from "@mantine/notifications";
import { addJob, getRecruiterJob, updateJob, changeStatusJob } from "@/api/job";
import { getIndustries } from "@/api/industry";
import { getAllSubIndustries } from "@/api/subIndustry";
import { getAllWorkModes } from "@/api/workMode";
import { getAllLocations } from "@/api/location";
import { Controller, useForm } from "react-hook-form";
import { getCompanyProfile } from "@/api/company";
import { useEffect } from "react";
import { getExperienceOptions } from "@/api/experience";
import { IoWarning } from "react-icons/io5";

type JobEditModalProps = {
  opened: boolean;
  onClose: () => void;
  jobId: number | null;
  refetch: () => void;
};

export type UpdateType = {
  id: number;
  reqBody: IAddJob;
};

export default function JobEditModal(props: JobEditModalProps) {
  const initQuery = useQueries({
    queries: [
      { queryKey: ["locations"], queryFn: getAllLocations },
      { queryKey: ["workModes"], queryFn: getAllWorkModes },
      { queryKey: ["industries"], queryFn: getIndustries },
      { queryKey: ["subIndustries"], queryFn: getAllSubIndustries },
      { queryKey: ["company-profile"], queryFn: getCompanyProfile },
      { queryKey: ["experienceRange"], queryFn: getExperienceOptions },
    ],
    combine: (result) => {
      return {
        data: {
          locations: result[0].data?.data.locations.map((item) => ({
            label: item.name,
            value: item.id + "",
          })),
          workModes: result[1].data?.data.work_modes.map((item) => ({
            label: item.name,
            value: item.id + "",
          })),
          industries: result[2].data?.data.industries.map((item) => ({
            label: item.name,
            value: item.id + "",
          })),
          subIndustries: result[3].data?.data.listData.map((item) => ({
            label: item.name,
            value: item.id + "",
          })),
          company: result[4].data?.data.company,
          experienceRanges: result[5].data?.data.map((item) => ({
            label: item.name,
            value: item.id + "",
          })),
        },
        isLoading: result.some((item) => item.isLoading),
      };
    },
  });

  const {
    locations,
    workModes,
    industries,
    subIndustries,
    company,
    experienceRanges,
  } = initQuery.data;

  const updateJobQuery = useQuery({
    queryKey: ["initJob", props.jobId],
    queryFn: () => getRecruiterJob(props.jobId),
    enabled: props.jobId !== null,
  });

  const addJobMutation = useMutation<PostResponse, Error, IAddJob>({
    mutationFn: addJob,
    onSuccess: () => {
      props.onClose();
      props.refetch();
      notifications.show({
        title: "Thành công",
        message: "Thêm công việc thành công",
        color: "teal",
      });
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (error) => {
      notifications.show({
        title: "Thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const updateJobMutation = useMutation<PostResponse, Error, UpdateType>({
    mutationFn: updateJob,
    onSuccess: () => {
      props.onClose();
      props.refetch();
      notifications.show({
        title: "Thành công",
        message: "Cập nhật công việc thành công",
        color: "teal",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    onError: (error) => {
      notifications.show({
        title: "Thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const reOpenMutation = useMutation<
    PostResponse,
    Error,
    { id: number; status: string }
  >({
    mutationFn: changeStatusJob,
    onSuccess: (data) => {
      notifications.show({
        title: "Thông báo",
        message: data.message,
        color: "teal",
      });
      props.refetch && props.refetch();
      props.onClose();
    },
    onError: (error) => {
      notifications.show({
        title: "Lỗi",
        message: error.message,
        color: "red",
      });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<IAddJob>({
    mode: "onChange",
    shouldFocusError: false,
  });

  useEffect(() => {
    if (props.jobId === null) {
      reset();
    }

    if (updateJobQuery.data) {
      const job = updateJobQuery.data?.job;
      setValue("title", job.title);
      setValue("workLocation", job.workLocation);
      setValue("workTime", job.workTime);
      setValue("is_hot", job.isHot);
      setValue("slots", job.slots);
      setValue("location_id", job.location.id);
      setValue("minSalary", job.minSalary);
      setValue("maxSalary", job.maxSalary);
      setValue("experience_id", job?.experience?.id || -1);
      setValue("work_mode_id", job.workMode.id);
      setValue("industry_id", job.industry.id);
      setValue("deadline", new Date(job.deadline));
      setValue(
        "sub_industry_ids",
        job.subIndustries.map((item) => item.id)
      );
      setValue("description", job.description);
      setValue("requirement", job.requirement);
      setValue("benefit", job.benefit);
      setValue("status", job.status);
      setValue("rejectReason", job.rejectReason);
    }
  }, [props.jobId, reset, setValue, updateJobQuery.data]);

  useEffect(() => {
    if (props.jobId !== null) {
      updateJobQuery.refetch();
    }
  }, [props.jobId, updateJobQuery]);

  const onSubmit = (data: IAddJob) => {
    if (props.jobId !== null) {
      updateJobMutation.mutate({
        id: props.jobId,
        reqBody: {
          ...data,
          status: watch("status") === "REJECTED" ? "PENDING" : watch("status"),
        },
      });
    } else {
      addJobMutation.mutate(data);
    }
  };

  return (
    <>
      <Modal.Root opened={props.opened} onClose={props.onClose} size="xl">
        <Modal.Content>
          <LoadingOverlay
            visible={initQuery.isLoading || updateJobQuery.isLoading}
          />
          <Modal.Header bg="blue.8">
            <Modal.Title color="white">
              {!props.jobId ? (
                <Text style={{ color: "#fff" }} fw="500">
                  Thêm công việc
                </Text>
              ) : (
                <Text style={{ color: "#fff" }} fw="500">
                  Cập nhật công việc
                </Text>
              )}
            </Modal.Title>
            <Modal.CloseButton color="white" />
          </Modal.Header>
          <Modal.Body px="xl">
            {watch("status") === "REJECTED" && watch("rejectReason") && (
              <Alert
                my="lg"
                variant="light"
                color="red"
                title="Công việc bị từ chối"
                icon={<IoWarning />}
              >
                <Text size="sm" fw="500">
                  {" "}
                  {`Công việc bị từ chối vì: ${watch(
                    "rejectReason"
                  )}. Vui lòng chỉnh sửa thông tin và gửi lại`}
                </Text>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid>
                <Grid.Col span={6}>
                  <Textarea
                    size="xs"
                    label="Tên công việc"
                    {...register("title", {
                      required: "Tên công việc không được để trống",
                    })}
                    error={errors.title?.message}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Textarea
                    label="Công ty"
                    readOnly
                    size="xs"
                    value={company?.name}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <Textarea
                    size="xs"
                    label="Địa điểm làm việc chi tiết"
                    {...register("workLocation", {
                      required: "Địa điểm làm việc không được để trống",
                    })}
                    error={errors.workLocation?.message}
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <Textarea
                    size="xs"
                    label="Thời gian làm việc"
                    {...register("workTime", {
                      required: "Mô tả thời gian làm việc không được để trống",
                    })}
                    error={errors.workTime?.message}
                  />
                </Grid.Col>
              </Grid>
              <Group grow mt="lg">
                <Controller
                  control={control}
                  name="deadline"
                  render={({ field, fieldState }) => (
                    <DateTimePicker
                      size="xs"
                      label="Hạn ứng tuyển"
                      {...field}
                      error={fieldState.error ? fieldState.error.message : null}
                    />
                  )}
                ></Controller>

                <TextInput
                  {...register("slots", {
                    min: {
                      value: 0,
                      message: "Số lượng tuyển phải lớn hơn hoặc bằng 0",
                    },
                    validate: (value) =>
                      value >= 0 || "Số lượng tuyển phải lớn hơn hoặc bằng 0",
                  })}
                  size="xs"
                  label="Số lượng tuyển"
                  type="number"
                  error={errors.slots?.message}
                />
                <Controller
                  control={control}
                  name="location_id"
                  rules={{ required: "Chọn địa điểm làm việc" }}
                  render={({ field, fieldState }) => (
                    <Select
                      label="Địa điểm"
                      size="xs"
                      placeholder="Chọn địa điểm"
                      searchable
                      data={locations}
                      {...field}
                      value={field.value + ""}
                      error={fieldState.error ? fieldState.error.message : null}
                    />
                  )}
                />
                <Checkbox
                  size="xs"
                  {...register("is_hot")}
                  label="Tuyển gấp"
                  mt="auto"
                  mb="xs"
                  ml="lg"
                />
              </Group>

              <Group grow mt="lg">
                <TextInput
                  {...register("minSalary", {
                    validate: {
                      isPositive: (value) =>
                        value === undefined ||
                        value >= 0 ||
                        "Lương tối thiểu phải lớn hơn hoặc bằng 0",
                    },
                  })}
                  size="xs"
                  label="Lương tối thiểu"
                  type="number"
                  error={errors.minSalary?.message}
                />
                <TextInput
                  {...register("maxSalary", {
                    validate: {
                      isPositive: (value) =>
                        value === undefined ||
                        value >= 0 ||
                        "Lương tối đa phải lớn hơn hoặc bằng 0",

                      isGreaterThanMin: (value) => {
                        const minSalary = watch("minSalary");

                        if (minSalary + "" === "") return true;

                        if (value + "" === "") return true;

                        return (
                          value > minSalary ||
                          "Lương tối đa phải lớn hơn lương tối thiểu"
                        );
                      },
                    },
                  })}
                  size="xs"
                  label="Lương tối đa"
                  type="number"
                  error={errors.maxSalary?.message}
                />

                <Controller
                  control={control}
                  name="experience_id"
                  render={({ field }) => (
                    <Select
                      label="Mức kinh nghiệm"
                      size="xs"
                      searchable
                      data={experienceRanges}
                      {...field}
                      value={field.value + ""}
                    />
                  )}
                />
              </Group>

              <Group grow mt="lg">
                <Controller
                  control={control}
                  name="work_mode_id"
                  rules={{ required: "Hình thức làm việc không được để trống" }}
                  render={({ field, fieldState }) => (
                    <Select
                      label="Hình thức làm việc"
                      size="xs"
                      searchable
                      data={workModes}
                      {...field}
                      value={field.value + ""}
                      error={fieldState.error ? fieldState.error.message : null}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="industry_id"
                  rules={{ required: "Lĩnh vực không được để trống" }}
                  render={({ field, fieldState }) => (
                    <Select
                      label="Lĩnh vực"
                      size="xs"
                      searchable
                      data={industries}
                      {...field}
                      value={field.value + ""}
                      error={fieldState.error ? fieldState.error.message : null}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="sub_industry_ids"
                  rules={{ required: "Lĩnh vực không được để trống" }}
                  render={({ field, fieldState }) => (
                    <MultiSelect
                      label="Chọn chuyên môn"
                      size="xs"
                      searchable
                      data={subIndustries}
                      {...field}
                      value={field.value?.map((item) => item + "")}
                      error={fieldState.error ? fieldState.error.message : null}
                    />
                  )}
                />
              </Group>

              <Stack mt="lg">
                <Stack gap="1">
                  <Text size="xs" fw={500}>
                    Mô tả công việc
                  </Text>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: "Mô tả công việc không được để trống" }}
                    render={({ field }) => (
                      <QuillTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  {errors.description && (
                    <Text color="red" size="xs">
                      {errors.description.message}
                    </Text>
                  )}
                </Stack>
                <Stack gap="1">
                  <Text size="xs" fw={500}>
                    Yêu cầu công việc
                  </Text>
                  <Controller
                    name="requirement"
                    control={control}
                    rules={{
                      required: "Yêu cầu công việc không được để trống",
                    }}
                    render={({ field }) => (
                      <QuillTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  {errors.requirement && (
                    <Text color="red" size="xs">
                      {errors.requirement.message}
                    </Text>
                  )}
                </Stack>
                <Stack gap="1">
                  <Text size="xs" fw={500}>
                    Phúc lợi
                  </Text>
                  <Controller
                    name="benefit"
                    control={control}
                    rules={{ required: "Quyền lợi không được trống" }}
                    render={({ field }) => (
                      <QuillTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  />
                  {errors.benefit && (
                    <Text color="red" size="xs">
                      {errors.benefit.message}
                    </Text>
                  )}
                </Stack>
              </Stack>

              <Group mt="lg" justify="end">
                <Button
                  size="xs"
                  color="gray"
                  variant="outline"
                  onClick={() => {
                    props.onClose();
                  }}
                >
                  Hủy
                </Button>
                {watch("status") === "STOPPED" && (
                  <Button
                    size="xs"
                    color="green"
                    onClick={() => {
                      reOpenMutation.mutate({
                        id: props.jobId!,
                        status: "ACTIVE",
                      });
                    }}
                  >
                    {reOpenMutation.isPending ? (
                      <Loader size="xs" color="white"></Loader>
                    ) : (
                      "Mở lại"
                    )}
                  </Button>
                )}

                {props.jobId === null ? (
                  <Button size="xs" type="submit">
                    {addJobMutation.isPending ? (
                      <Loader size="xs" color="white"></Loader>
                    ) : (
                      "Thêm"
                    )}
                  </Button>
                ) : (
                  <Button size="xs" type="submit">
                    {updateJobMutation.isPending ? (
                      <Loader size="xs" color="white"></Loader>
                    ) : watch("status") === "REJECTED" ? (
                      "Gửi lại"
                    ) : (
                      "Cập nhật"
                    )}
                  </Button>
                )}
              </Group>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
