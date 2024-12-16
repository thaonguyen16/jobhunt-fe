import { Card, Grid, Stack, Text, Avatar, Flex, ActionIcon, Tooltip,Loader, Overlay, Center, Button } from "@mantine/core";
import {
  IconBriefcase,
  IconCalendarDue,
  IconChecks,
  IconMapPin,
  IconPaperclip,
  IconPlus,
  IconRotateClockwise2,

} from "@tabler/icons-react";
import { CandidateCV } from "@data/interface/cv";
import { useEffect, useState } from "react";
import { removeCandidateRequest, saveCandidateRequest } from "../../../../api/resume";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { ViewCvModal } from "@features/candidate/cv";

export default function CandidateCard({ resumData }: { resumData: CandidateCV[] }) {
  console.log(resumData);

  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [loadingOverlay, setLoadingOverlay] = useState(false);
  const [saveList, setSaveList] = useState(resumData.filter(e => e.saveCandidate === true));


  useEffect(() => {
    if (opened) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [opened]);

  const saveCandidate = async (id: number, cv: CandidateCV) => {
    await saveCandidateRequest(id).then((data) => {
      console.log(data);
      setLoadingOverlay(false);
      loading;

      if (data.status === "success") {

        const list = saveList;
        list.push(cv);
        setSaveList(list);


        notifications.show({
          title: "Lưu ứng Viên",
          message: data.message,
          color: "green",
        })
      }

      else {
        notifications.show({
          title: "Lưu ứng Viên thất bại",
          message: data.message,
          color: "red",
        })
      }


    })
  }

  const removeCandidate = async (id: number, cv: CandidateCV) => {
    await removeCandidateRequest(id).then((data) => {
      console.log(data);
      setLoadingOverlay(false);

      if (data.status === "success") {

        const list = saveList.filter(e => e !== cv);

        setSaveList(list);


        notifications.show({
          title: "Xóa ứng viên",
          message: data.message,
          color: "green",
        })
      }
      else {
        notifications.show({
          title: "Xóa ứng viên thất bại",
          message: data.message,
          color: "red",
        })
      }
    })
  }

  const [idCurrent, setIdCurent] = useState(0);

  return (
    <>

      {/* <Modal
        opened={opened}
        onClose={close}
        fullScreen
        radius={0}
        transitionProps={{ transition: 'fade', duration: 500 }}
      >
        {!loading ? <>
          {cvCurrent.map((data, index) => <Flex key={data + "" + index} direction={"column"} gap={"md"}>
            <Image mt={"0.5rem"} src={data} /> 
            <Divider >Trang {index + 1} / {cvCurrent.length}</Divider>
          </Flex>)}
        </> : <Flex w={"100%"} pt={"20%"} align={"center"} justify={"center"}>
          <Loader color="green" type="dots" />
        </Flex>}
      </Modal> */}

      <ViewCvModal opened={opened} onClose={close} id={idCurrent} />
        
    

      {loadingOverlay && <Overlay w="100%" h="100%" pos="fixed" blur={2} zIndex={10000}>
        <Center w="100%" h="100%">
          <Loader color="white" type="dots" />
        </Center>
      </Overlay>}

      {Array.isArray(resumData) && resumData.map((cv: CandidateCV, index: number) => (
        <Card key={index} bg={"rgba(255,255,255,.6"} bd={"2px solid white"} radius={"7px"} pos={"relative"}>
          {!saveList.includes(cv) && <Tooltip label="Lưu ứng viên">
            <ActionIcon size={"sm"} variant="light" color="red" pos={"absolute"} right={50} top={10} onClick={() => {
              if (cv.candidate?.id !== undefined)
                setLoadingOverlay(true);
              saveCandidate(cv.candidate.id, cv);
            }}>
              <IconPlus stroke={1.5} />
            </ActionIcon>
          </Tooltip>}
          {saveList.includes(cv) && <Tooltip label="Bỏ lưu ứng viên">
            <ActionIcon size={"sm"} variant="light" color="red" pos={"absolute"} right={50} top={10} onClick={() => {
              if (cv.candidate?.id !== undefined)
                setLoadingOverlay(true);
              removeCandidate(cv.candidate.id, cv);
            }}>
              <IconChecks stroke={1.5} />
            </ActionIcon>
          </Tooltip>}
          <Tooltip label="Xem CV">
            <ActionIcon size={"sm"} variant="light" pos={"absolute"} right={10} top={10} onClick={() => {
              setIdCurent(cv.id);
              open();
              setLoading(true);

              // if(cv.image?.length != 0) {
              //   if(cv.image) {
              //     setLoading(false);
              //     setCVCurrent(cv.image);
              //   }
              // }
              // else {
              //   showCv(cv.id)
              // }
            }}>
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
                    <Button variant="light" color="green" size="xs"radius={"xl"} mt={"0.5rem"}>
                      Đang tìm việc
                    </Button>
                  </Tooltip>}
                </Flex>
                <Stack gap="xs" w={"100%"}>
                  <Flex align={"center"} justify={"flex-start"} gap={"xs"}>
                    <IconBriefcase size={20} stroke={1} />

                    <Text size="sm" >
                      {cv.title}
                    </Text>
                  </Flex>
                  <Flex align={"center"} gap={"xs"}>
                    <IconMapPin size={20} stroke={1} />
                    <Text size="sm" lineClamp={1}>
                      {cv.address}
                    </Text>
                  </Flex>
                  <Flex align={"center"} gap={"xs"}>
                    <IconCalendarDue size={20} stroke={1} />
                    <Text size="sm">
                      {cv.birthday}
                    </Text>
                  </Flex>
                  <Flex align={"center"} gap={"xs"}>
                    <IconRotateClockwise2 stroke={1} />
                    <Text size="sm" >
                      {cv.updatedAt} trước
                    </Text>
                  </Flex>
                </Stack>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 7, xs: 12 }}>
              <Stack>
                {cv.education?.length !== 0 && <><Text size="sm" fw={600}>
                  Học vấn
                </Text>
                <Text lineClamp={5}>
                {cv.education?.map((e) => (
                  <Text component="span" display={"block"} mb={"xs"} size="13px" w={"100%"} ml={"10px"}>
                  {e}
                </Text>
                ))}
                </Text>
                </>}

                {cv.experience?.length !== 0 && <><Text size="sm" fw={600}>
                  Kinh nghiệm
                </Text>
                <Text lineClamp={5}>
                {cv.experience?.map((e) => (
                  <Text component="span" display={"block"} mb={"xs"} size="13px" w={"100%"} ml={"10px"}>
                  {e}
                </Text>
                ))}
                </Text></>}

                {cv.objective?.length !== 0 && <>
                  <Text size="sm" fw={600}>
                  Mục tiêu nghề nghiệp
                </Text>
                <Text lineClamp={5}>
                {cv.objective?.map((e) => (
                  <Text component="span" display={"block"} mb={"xs"} size="13px" w={"100%"} ml={"10px"}>
                  {e}
                </Text>
                ))}
                </Text>
</>}
                {cv.skill?.length !== 0 && <><Text size="sm" fw={600}>
                  Kĩ năng
                </Text>
                <Text lineClamp={5}>
                {cv.skill?.map((e) => (
                  <Text component="span" display={"block"} mb={"xs"} size="13px" w={"100%"} ml={"10px"}>
                  {e}
                </Text>
                ))}
                </Text></>}
                {cv.degree?.length !== 0 && <> <Text size="sm" fw={600}>
                  Bằng cấp
                </Text>
                <Text lineClamp={5}>
                {cv.degree?.map((e) => (
                  <Text component="span" display={"block"} mb={"xs"} size="13px" w={"100%"} ml={"10px"}>
                  {e}
                </Text>
                ))}
                </Text></>}
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>


      ))}
    </>
  );
}
