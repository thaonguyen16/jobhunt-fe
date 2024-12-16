import { Box, Text, Grid, TextInput } from "@mantine/core";
import "@mantine/tiptap/styles.css";

type RefererProps = {
  fullName?: string;
  email?: string;
  phone?: string;
  contactLink?: string;
  onTextInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Referer(props: RefererProps) {
  const { fullName, email, phone, contactLink } = props;

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onTextInputChange?.(e);
  };

  return (
    <Box>
      <Text size="lg" fw={500} mb="lg">
        Thông tin người giới thiệu
      </Text>
      <Grid>
        <Grid.Col span={6}>
          <TextInput
            label="Tên"
            size="sm"
            name="fullName"
            variant="filled"
            onChange={(e) => onChangeInput(e)}
            defaultValue={fullName}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Đường dẫn liên hệ"
            size="sm"
            name="contactLink"
            variant="filled"
            onChange={(e) => onChangeInput(e)}
            defaultValue={contactLink}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="phone"
            label="Số điện thoại"
            size="sm"
            type="text"
            onChange={(e) => onChangeInput(e)}
            variant="filled"
            defaultValue={phone}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            name="email"
            label="Email"
            type="text"
            size="sm"
            onChange={(e) => onChangeInput(e)}
            variant="filled"
            defaultValue={email}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
