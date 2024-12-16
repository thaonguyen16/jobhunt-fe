import { Box, Text, Grid, TextInput, FileInput } from "@mantine/core";
import { RxAvatar } from "react-icons/rx";
import "@mantine/tiptap/styles.css";

export type CvPersonalInfomationProps = {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  jobTitle?: string;
  phone?: string;
  email?: string;
  address?: string;
  birthday?: string;
  onTextInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFile?: (file: File | null) => void;
};

export default function CvPersonalInfomation(props: CvPersonalInfomationProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    phone,
    email,
    address,
    birthday,
    onTextInputChange,
  } = props;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTextInputChange && onTextInputChange(e);
  };

  return (
    <Box>
      <Text size="lg" fw={500} mb="lg">
        Thông tin cá nhân
      </Text>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Chức danh mong muốn"
            size="sm"
            name="jobTitle"
            variant="filled"
            onChange={(e) => onChangeInput(e)}
            defaultValue={jobTitle}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <FileInput
            size="sm"
            onChange={props.setFile}
            leftSection={<RxAvatar></RxAvatar>}
            label="Tải ảnh đại diện"
            placeholder="Chọn ảnh đại diện"
            leftSectionPointerEvents="none"
            variant="filled"
            w="70%"
            fileInputProps={{
              accept: ".jpg,.jpeg,.png",
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="firstName"
            label="Tên"
            size="sm"
            type="text"
            onChange={(e) => onChangeInput(e)}
            variant="filled"
            defaultValue={firstName}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="lastName"
            label="Họ"
            type="text"
            size="sm"
            onChange={(e) => onChangeInput(e)}
            variant="filled"
            defaultValue={lastName}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="phone"
            label="Số điện thoại"
            size="sm"
            type="phone"
            onChange={(e) => onChangeInput(e)}
            variant="filled"
            defaultValue={phone}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="email"
            label="Email"
            type="email"
            size="sm"
            variant="filled"
            onChange={(e) => onChangeInput(e)}
            defaultValue={email}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="address"
            label="Địa chỉ"
            size="sm"
            onChange={(e) => onChangeInput(e)}
            variant="filled"
            defaultValue={address}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="birthday"
            label="Ngày sinh"
            size="sm"
            onChange={(e) => onChangeInput(e)}
            variant="filled"
            defaultValue={birthday}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}