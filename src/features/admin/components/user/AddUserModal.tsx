import {
  Stack,
  Button,
  TextInput,
  Modal,
  Group,
  Switch,
  Text,
  ComboboxItem,
  MultiSelect,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { IAddUserFormInput } from "../../interface";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { MdOutlineTextFields, MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserCog, FaBuilding, FaPhone, FaGlobe } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";

import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";
import { addUser } from "@/api/user";

type AddUserModalProps = {
  opened: boolean;
  closeAddUserModal: () => void;
  refetch: () => void;
};

const roles: ComboboxItem[] = [
  { value: "CANDIDATE", label: "Ứng viên" },
  { value: "RECRUITER", label: "Nhà tuyển dụng" },
  { value: "ADMIN", label: "Admin" },
];

export default function AddUserModal(props: AddUserModalProps) {
  const { opened, closeAddUserModal, refetch } = props;
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IAddUserFormInput>({
    mode: "onChange", // Validate on every keystroke
    shouldFocusError: false,
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: [],
      companyName: "",
      companyAddress: "",
      companyEmail: "",
      companyPhone: "",
      companyWebsite: "",
    },
  });

  const addUserMutation = useMutation<PostResponse, Error, IAddUserFormInput>({
    mutationFn: addUser,
    onSuccess: () => {
      closeAddUserModal();
      notifications.show({
        title: "Thành công",
        message: "Thêm người dùng thành công",
        color: "green",
      });
      refetch();
    },
    onError: (error) => {
      notifications.show({
        title: "Thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const [isCompany, setIsCompany] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  // Watch the roles field
  const watch_roles = watch("roles", []);

  useEffect(() => {
    // Update isCompany based on the roles watched
    setIsCompany(watch_roles.includes("RECRUITER"));
  }, [watch_roles]); // Dependency array includes roles

  const onSubmit: SubmitHandler<IAddUserFormInput> = (data) => {
    const payload = {
      ...data,
      companyWebUrl: data.companyWebsite,
      isCompanyVerified: isVerified,
    };
    addUserMutation.mutate(payload);
  };

  const validateConfirmPassword = (value: string) => {
    const password = watch("password");
    return value === password || "Mật khẩu không khớp";
  };

  return (
    <Modal
      opened={opened}
      size={isCompany ? "xl" : "sm"}
      onClose={closeAddUserModal}
      title={<Text fw="500">Thêm người dùng</Text>}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Group
          grow
          preventGrowOverflow={false}
          wrap="nowrap"
          align="flex-start"
          gap="lg"
        >
          <LoadingOverlay visible={addUserMutation.isPending} />
          <Stack>
            <TextInput
              variant="filled"
              label="Họ và tên"
              {...register("fullName", {
                required: "Họ và tên không được để trống",
              })} // Validation rules
              placeholder="Nhập họ và tên"
              leftSection={<MdOutlineTextFields />} // Icon on the left side of input
              required
              error={errors.fullName?.message} // Display error message
            />

            <TextInput
              variant="filled"
              label="Email"
              required
              leftSection={<MdAlternateEmail />}
              placeholder="Nhập email của bạn"
              {...register("email", {
                required: "Email không được để trống",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email không hợp lệ",
                },
              })}
              error={errors.email?.message} // Display error message
            />

            <TextInput
              variant="filled"
              label="Mật khẩu"
              required
              type="password"
              leftSection={<RiLockPasswordFill />}
              {...register("password", {
                required: "Mật khẩu không được để trống",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                  message:
                    "Mật khẩu phải chứa ít nhất một chữ cái hoa, một chữ cái thường, và một chữ số.",
                },
                minLength: {
                  value: 8,
                  message: "Mật khẩu phải có ít nhất 8 ký tự.",
                },
              })}
              error={errors.password?.message} // Display error message
            />
            <TextInput
              variant="filled"
              label="Nhập lại mật khẩu"
              required
              type="password"
              leftSection={<RiLockPasswordFill />}
              {...register("confirmPassword", {
                required: "Mật khẩu không được để trống",
                validate: validateConfirmPassword, // Custom validation function
              })}
              error={errors.confirmPassword?.message} // Display error message
            />

            <Controller
              name="roles" // Specify the name for the controller
              control={control} // Pass the control prop from useForm
              render={({ field }) => (
                <MultiSelect
                  {...field}
                  leftSection={<FaUserCog />}
                  variant="filled"
                  label="Role"
                  data={roles}
                  error={errors.roles?.message} // Display error message
                />
              )}
            />
          </Stack>
          {isCompany && (
            <Stack w={"50%"} justify="flex-start">
              <TextInput
                {...register("companyName", {
                  required: "Tên công ty không được để trống",
                })} // Validation rules
                leftSection={<FaBuilding />}
                label="Tên công ty"
                required
                error={errors.companyName?.message}
                variant="filled"
              />
              <TextInput
                {...register("companyAddress")}
                leftSection={<IoLocation />}
                variant="filled"
              ></TextInput>
              <Group grow>
                <TextInput
                  {...register("companyEmail")}
                  label="Email công ty"
                  type="email"
                  leftSection={<MdAlternateEmail />}
                  variant="filled"
                />
                <TextInput
                  leftSection={<FaPhone />}
                  {...register("companyPhone")}
                  label="Số điện thoại"
                  type="phone"
                  variant="filled"
                />
              </Group>
              <TextInput
                label="Địa chỉ website"
                leftSection={<FaGlobe />}
                {...register("companyWebsite")}
                variant="filled"
              ></TextInput>
              <Switch
                defaultChecked={isVerified}
                onChange={() => setIsVerified(!isVerified)}
                label="Công ty đã xác thực"
              />
            </Stack>
          )}
        </Group>
        <Group justify="end" mt="lg">
          <Button
            color="gray"
            onClick={closeAddUserModal}
            size="xs"
            type="submit"
          >
            Hủy
          </Button>
          <Button color="blue" size="xs" type="submit">
            Thêm
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
