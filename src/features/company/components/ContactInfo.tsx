import { LogoInformation } from "@features/jobDetails";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PlaceIcon from "@mui/icons-material/Place";
import { Text, Stack } from "@mantine/core";

type CompanyContactInfoProps = {
  email?: string;
  phone?: string;
  address?: string;
};

export default function ContactInfo({
  email,
  phone,
  address,
}: CompanyContactInfoProps) {
  return (
    <Stack>
      <Text fw="500">Thông tin liên hệ</Text>
      <LogoInformation label="Email" content={email} icon={<EmailIcon />} />
      <LogoInformation
        label="Điện thoại"
        content={phone}
        icon={<LocalPhoneIcon />}
      />
      <LogoInformation
        label="Trụ sở chính"
        content={address || "Không có thông tin"}
        icon={<PlaceIcon />}
      />
    </Stack>
  );
}
