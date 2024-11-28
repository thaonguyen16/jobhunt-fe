import { FormContainer } from "@components/form";
import { AppAvatar } from "@components/ui";
import { PostResponse } from "@data/interface";
import {
  IRecruiterProfileUpdate,
  RecruiterProfile,
} from "@data/interface/profile";
import AvatarModal from "@features/recruiter/recuiterInfo/component/AvatarModal";
import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  fetchRecruiterProfile,
  sendUpdateRecruiterProfileRequest,
} from "@services/userService";
import { IconEdit, IconPointFilled } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function UserInformation({ loading }) {
  const [isRecall, setRecall] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [
    avatarModalOpened,
    { open: openAvatarModal, close: closeAvatarModal },
  ] = useDisclosure(false);

  useEffect(() => {
    if (avatarModalOpened) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [avatarModalOpened]);

  const [recruiterProfile, setRecruiterProfile] = useState<
    RecruiterProfile | undefined
  >(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<IRecruiterProfileUpdate>({
    mode: "onChange",
    shouldFocusError: true,
  });

  const changeValue = () => {
    if (!recruiterProfile) {
      return false;
    }

    const { fullName, phoneNumber } = recruiterProfile;

    // Check if the fields have changed
    const isFullNameChanged = watch("fullName").trim() !== fullName;
    const isPhoneNumberChanged = watch("phoneNumber") !== phoneNumber;

    return isFullNameChanged || isPhoneNumberChanged;
  };

  useEffect(() => {
    if (isRecall) {
      const fetchData = async () => {
        await fetchRecruiterProfile().then((pro) => {
          //Set data of recruiter profile
          setRecruiterProfile(pro);
          if (pro) {
            setValue("fullName", pro.fullName);
            setValue("phoneNumber", pro.phoneNumber);
          }
        });
      };
      fetchData().then(() => {
        loading(false);
        setRecall(false);
      });
    }
  }, [loading, isRecall, setValue]);

  const updateMutation = useMutation<
    PostResponse,
    Error,
    IRecruiterProfileUpdate
  >({
    mutationFn: sendUpdateRecruiterProfileRequest,
    onSuccess: () => {
      setEdit(false);
      setRecall(true);
      notifications.show({
        title: "Cập nhật thông tin",
        message: "Cập nhật thông tin thành công",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Cập nhật thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const onSubmit: SubmitHandler<IRecruiterProfileUpdate> = (data) => {
    loading(true);
    updateMutation.mutate(data);
  };

  const setImageUpload = () => {
    setRecall(!isRecall);
  };

  return (
    recruiterProfile && (
      <>
        <AvatarModal
          opened={avatarModalOpened}
          onClose={closeAvatarModal}
          setIAvatar={setImageUpload}
          title="Thay đổi ảnh đại diện"
        />
        <Container
          p={"0"}
          m={"0"}
          bg={"rgba(255,255,255,0.6"}
          style={{
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack w={"80%"}>
            <Text size="1rem" fw={"700"} c={"#0581e6"} mt={"20px"}>
              Thông tin cá nhân
            </Text>

            <Flex
              mt={"20px"}
              gap="md"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap"
            >
              <AppAvatar
                openEditModal={openAvatarModal}
                link={recruiterProfile.avatar}
              />
            </Flex>

            <Flex
              gap="md"
              mt={"20px"}
              w={"100%"}
              justify={"space-between"}
              align="center"
              direction="row"
              wrap="wrap"
            >
              {recruiterProfile.status == "ACTIVE" && (
                <Group>
                  <ActionIcon
                    variant="light"
                    color="green"
                    radius="xl"
                    aria-label="Active"
                  >
                    <IconPointFilled stroke={1.5} />
                  </ActionIcon>
                  <Text c={"green"} size="14px">
                    Đang hoạt động
                  </Text>
                </Group>
              )}

              {recruiterProfile.status == "INACTIVE" && (
                <Group>
                  <ActionIcon
                    variant="light"
                    color="gray"
                    radius="xl"
                    aria-label="Active"
                  >
                    <IconPointFilled size={"14px"} stroke={1.5} />
                  </ActionIcon>
                  <Text c={"green"} size="14px">
                    Dừng hoạt động
                  </Text>
                </Group>
              )}

              {!isEdit && (
                <Button
                  variant="light"
                  color="blue"
                  leftSection={<IconEdit size={"14px"}></IconEdit>}
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  Chỉnh sửa
                </Button>
              )}
            </Flex>

            <FormContainer onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                mb="10px"
                label="Họ và tên"
                defaultValue={recruiterProfile.fullName}
                disabled={!isEdit}
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "Tên là bắt buộc",
                  },
                  pattern: {
                    value: /^[\p{L}\s]+$/u,
                    message: "Tên không hợp lệ",
                  },
                  maxLength: {
                    value: 50,
                    message: "Tên không được quá 50 ký tự",
                  },
                })}
                error={
                  errors.fullName && <span>{errors.fullName.message}</span>
                }
              />
              <TextInput
                mb="10px"
                label="Email"
                value={recruiterProfile.email}
                disabled
              />
              <TextInput
                mb="10px"
                label="Số điện thoại"
                defaultValue={recruiterProfile.phoneNumber}
                disabled={!isEdit}
                {...register("phoneNumber", {
                  maxLength: {
                    value: 10,
                    message: "Số điện thoại gồm 10 số",
                  },
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Số điện thoại không hợp lệ",
                  },
                })}
                error={
                  errors.phoneNumber && (
                    <span>{errors.phoneNumber.message}</span>
                  )
                }
              />

              {isEdit && (
                <Flex
                  gap="md"
                  justify="center"
                  align="center"
                  direction="row"
                  wrap="wrap"
                  w={"100%"}
                  mb={"30px"}
                  mt={"20px"}
                >
                  <Button
                    type="submit"
                    size="sm"
                    variant="gradient"
                    gradient={{ from: "blue", to: "teal", deg: 90 }}
                    disabled={!changeValue()}
                  >
                    Cập nhật
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    type="reset"
                    onClick={() => {
                      setEdit(false);
                      reset();
                    }}
                  >
                    Hủy cập nhật
                  </Button>
                </Flex>
              )}
            </FormContainer>
          </Stack>
        </Container>
      </>
    )
  );
}
