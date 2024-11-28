import { FooterList, FooterLinkListItem, FooterTextListItem } from ".";
import "./footer.scss"
import { ActionIcon, Image, Container, Flex, Group, rem, Text } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram, IconBrandTiktok, IconBrandTwitter, IconBrandYoutube, IconReceipt, IconStack } from "@tabler/icons-react";

const infomation = ["Trang chủ", "Việc làm", "Doanh nghiệp", "Bài viết"];
const cvSetting = [
  "Quản lý CV",
  "Hướng dẫn viết CV",
  "Quản lý profile CV",
  "CV mẫu",
];
const contactInfo = [
  "Địa chỉ: Số 1 Võ Văn Ngân",
  "Email: jobhunt.24h@btd.com",
  "Phone: +84 383314133",
];

export default function Footer() {
  return (
    <footer className="footer">
      <Container className="inner" maw={2000}>
        <Flex direction={"column"} w={"30%"} align={"center"} justify={"center"}>
          <Image w={"50px"} src="src/assets/img/logo-white.png" />
          <Text
            size="22px"
            fw="900"
            variant="gradient"
            gradient={{ from: "white", to: "white", deg: 90 }}
          >
            Jobhunt
          </Text>
          <Text size="md" c="dimmed" className="description" mt={"1rem"}>
            Tìm việc làm nhanh chóng và dễ dàng
          </Text>

          <Text size="18px"
            fw="500" c={"white"} mt={"3rem"} ta={"left"} w={'100%'}>Tải ứng dụng trên điện thoại</Text>
          <Flex w={"100%"} mt={"1rem"} justify={"flex-start"} align={"center"} gap={"sm"} wrap={"wrap"}>
            <Image src="https://vieclam24h.vn/img/mobile-entrypoint/apple-store.png" w={150} />
            <Image src="https://vieclam24h.vn/img/mobile-entrypoint/ch-play.png" w={150} />
          </Flex>

         
          <Text size="20px"
            fw="500" c={"white"} mt={"3rem"} ta={"left"} w={'100%'}>CÔNG TY CỔ PHẦN JOBHUNT</Text>

<Flex w={"100%"} justify={"center"} align={"center"} mt={"2rem"} gap={"md"}>

<IconReceipt color="gray" stroke={1.5}/>
            <Text size="sm"
             c={"dimmed"} ta={"left"} w={'100%'}>Mã số thuế: 999999</Text>
          </Flex>

          <Flex w={"100%"} justify={"center"} align={"center"} gap={"md"}>
            <IconStack color="gray"  stroke={1.5}/>
            <Text size="sm"

              c={"dimmed"} ta={"left"} w={'100%'}>Giấy phép kinh doanh: 0101010101</Text>
          </Flex>
          
          <Flex w={"100%"} justify={"center"} align={"center"} gap={"md"}>
            <IconStack color="gray" stroke={1.5}/>
            <Text size="sm"
              c={"dimmed"} ta={"left"} w={'100%'}>Giấy phép hoạt dộng dịch vụ số: 33/SLĐTBXH-GP</Text>
          </Flex>



        </Flex>
        <div className="groups">
          <FooterList name="Thông tin">
            {infomation.map((item) => (
              <FooterLinkListItem key={item} content={item} />
            ))}
          </FooterList>
          <FooterList name="Tiện ích CV">
            {cvSetting.map((item) => (
              <FooterLinkListItem key={item} content={item} />
            ))}
          </FooterList>
          <FooterList name="Liên hệ">
            {contactInfo.map((item) => (
              <FooterTextListItem key={item} content={item} />
            ))}
          </FooterList>
        </div>
      </Container>
      <Container className="afterFooter" maw={2000}>
        <Text c="dimmed" size="md">
          © 2023 jobhunt.vn. Bản quyền thuộc về Jobhunt
        </Text>
        <Image src={"https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/footer/bct.jpg"} w={100} />
        <Group gap={0} className="social" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTwitter style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandYoutube style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandInstagram style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandFacebook style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandTiktok style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle">
            <Image src="src/assets/svg/zalo.svg" />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
