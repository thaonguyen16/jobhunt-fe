import { Card, Grid, Stack, Text, Avatar, Flex, ActionIcon, Tooltip, Image } from "@mantine/core";
import {
  IconBriefcase,
  IconCalendarDue,
  IconMapPin,
  IconPaperclip,
  IconPlus,
  IconRotateClockwise2,

} from "@tabler/icons-react";
import { CandidateCV } from "@data/interface/cv";

export default function CandidateCard({resumData}: {resumData: CandidateCV[]}) {
  console.log(resumData);
  return (
    <>
      {resumData.map((cv, index) => (
        <Card key={index} bg={"rgba(255,255,255,.6"} bd={"2px solid white"} radius={"7px"} pos={"relative"}>
          <Tooltip label="Lưu ứng viên">
          <ActionIcon size={"sm"} variant="subtle" color="red" pos={"absolute"} right={10} top={35}>
            <IconPlus stroke={1.5} />
          </ActionIcon>
          </Tooltip>
          <Tooltip label="Xem CV">
          <ActionIcon size={"sm"} variant="subtle" pos={"absolute"} right={10} top={10}>
            <IconPaperclip stroke={1.5} />
          </ActionIcon>
          </Tooltip>
          <Grid>
            <Grid.Col span={{ base: 12, sm: 5, xs: 12 }}>
              <Stack w={"100%"}>
                <Flex direction={"column"} align={"center"} justify={"flex-start"} w={"fit-content"} pos={"relative"}>
                <Avatar size={100} src={cv.avatarUrl} />
                <Text fw={700} ta={"left"} mt={"1rem"}>
                  {cv.name}
                </Text>
                {true && <Tooltip label="Đang tìm việc">
                <Image src="/src/assets/img/open.png" w={40} bottom={20} right={-20}  pos={"absolute"}/>
                </Tooltip>}
                </Flex>
                <Stack gap="xs" w={"100%"}>
                  <Flex align={"center"} justify={"flex-start"} gap={"xs"}>
                    <IconBriefcase size={20} stroke={1}/>

                    <Text size="sm" >
                      {cv.title}
                    </Text>
                  </Flex>
                  <Flex align={"center"} gap={"xs"}>
                    <IconMapPin size={20} stroke={1}/>
                    <Text size="sm" lineClamp={1}>
                      {cv.address}
                    </Text>
                  </Flex>
                  <Flex align={"center"} gap={"xs"}>
                    <IconCalendarDue size={20} stroke={1}/>
                    <Text size="sm">
                      {cv.birthday}
                    </Text>
                  </Flex>
                  <Flex align={"center"} gap={"xs"}>
                    <IconRotateClockwise2 stroke={1}/>
                    <Text size="sm" >
                      {cv.updatedAt} trước
                    </Text>
                  </Flex>
                </Stack>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 7, xs: 12 }}>
              <Stack>
                <Text size="sm" fw={600}>
                  Học vấn
                </Text>
                {/* {cv..map((e, index) => (
                  <Flex align={"center"} key={index}>
                    <IconSchool />
                    <Text size="13px" w={"100%"} ml={"10px"}>
                      {e}
                    </Text>
                  </Flex>
                ))} */}

                <Text size="sm" fw={600}>
                  Kinh nghiệm
                </Text>
                {/* {cv.experience.map((e, index) => (
                  <Flex align={"center"} key={index}>
                    <IconBriefcase2 />
                    <Text size="13px" w={"100%"} ml={"10px"}>
                      {e}
                    </Text>
                  </Flex>
                ))} */}

                <Text size="sm" fw={600}>
                  Mục tiêu nghề nghiệp
                </Text>
                {/* <Text size="13px" w={"100%"}>
                  {cv.objective}
                </Text> */}
              </Stack>
            </Grid.Col>
            {/* <Grid.Col span={{ base: 12, sm: 2, xs: 12 }} style={
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
            }>
              <Stack align="center">
                <Button
                  variant="light"
                >
                  Xem ứng viên
                </Button>
                <Button
                  variant="light"
                  color="green"
                >
                 Lưu ứng viên
                </Button>
              </Stack>
            </Grid.Col> */}
          </Grid>
        </Card>
      ))}
    </>
  );
}
