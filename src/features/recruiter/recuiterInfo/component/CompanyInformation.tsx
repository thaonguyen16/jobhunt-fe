import { NewUpdateCompanyModal } from "..";
import { AppAvatar } from "@components/ui";
import AvatarModal from "@features/recruiter/recuiterInfo/component/AvatarModal";
import { useEffect, useRef, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Text,
  Stack,
  Container,
  Flex,
  Button,
  Indicator,
  ActionIcon,
  Space,
  Spoiler,
  Box,
} from "@mantine/core";
import { fetchCompanyProfile } from "@services/companyService";
import { CompanyProfile } from "@data/interface/company";
import {
  IconEdit,
  IconCircleCheckFilled,
  IconBuildingSkyscraper,
  IconMailbox,
  IconPhoneRinging,
  IconMapPin,
  IconWorldWww,
  IconBriefcase,
  IconMap2,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import "../setting-recruiter.scss";

type CompanyInformationProps = {
  loading: (status: boolean) => void;
  setBusinessLicense: (license: string) => void;
};
export default function CompanyInformation({
  loading,
  setBusinessLicense,
}: CompanyInformationProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [showMore, setShowmore] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [companyInfo, setCompanyInfo] = useState<CompanyProfile | undefined>(
    undefined
  );

  const [isUpdate, setIsUpdate] = useState(false);
  const [
    avatarModalOpened,
    { open: openAvatarModal, close: closeAvatarModal },
  ] = useDisclosure(false);
  const [isRecall, setRecall] = useState(true);

  const handleUpdateData = () => {
    setIsUpdate(!isUpdate);
    setRecall(true);
  };

  const setImageUpload = () => {
    setRecall(!isRecall);
  };

  useEffect(() => {
    if (isRecall) {
      const fetchData = async () => {
        await fetchCompanyProfile().then((pro) => {
          //Set data of recruiter profile
          setCompanyInfo(pro);
          setBusinessLicense(pro?.businessLicense || "");
          contentRef.current;
        });
      };
      fetchData().then(() => {
        loading(false);
        setRecall(false);
      });
    }
  }, [loading, isRecall]);

  useEffect(() => {
    if (avatarModalOpened) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [avatarModalOpened]);

  const uploadLoaingStatus = (status: boolean) => {
    loading(status);
    if (!status) {
      setRecall(!isRecall);
    }
  };

  return (
    companyInfo && (
      <>
        <AvatarModal
          opened={avatarModalOpened}
          onClose={closeAvatarModal}
          setIAvatar={setImageUpload}
          title="Thay đổi logo công ty"
        />

        <NewUpdateCompanyModal
          closeModal={close}
          opened={opened}
          openModal={open}
          companyInfo={companyInfo}
          isUpdate={handleUpdateData}
          isLoading={uploadLoaingStatus}
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
              Thông tin công ty
            </Text>

            <Flex
              w={"100%"}
              mt={"20px"}
              gap="md"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap"
            >
              {!companyInfo.isVerified ? (
                <Indicator
                  className="unverfied"
                  label="Chưa xác thực"
                  size={18}
                  style={{
                    zIndex: "1",
                    color: "gray",
                  }}
                >
                  <AppAvatar
                    openEditModal={openAvatarModal}
                    link={companyInfo.image}
                  />
                </Indicator>
              ) : (
                <Indicator
                  className="verfied"
                  label="Đã xác thực"
                  size={18}
                  style={{
                    zIndex: "1",
                  }}
                >
                  <AppAvatar
                    openEditModal={openAvatarModal}
                    link={companyInfo.image}
                  />
                </Indicator>
              )}
              <Stack align="flex-start" justify="flex-end" gap="xs" ml={"30px"}>
                <Text fw={500} mt={"20px"}>
                  {companyInfo.name.toUpperCase()}
                </Text>
                <Flex>
                  <IconBuildingSkyscraper
                    color="gray"
                    size={"1rem"}
                  ></IconBuildingSkyscraper>
                  <Text size="0.9rem" c={"gray"} ml={"10px"}>
                    {companyInfo.scale}
                  </Text>
                </Flex>
                <Flex>
                  <IconMailbox color="gray" size={"1rem"}></IconMailbox>
                  <Text size="0.9rem" c={"gray"} ml={"10px"}>
                    {companyInfo.email}
                  </Text>
                </Flex>
                <Flex>
                  <IconPhoneRinging
                    color="gray"
                    size={"1rem"}
                  ></IconPhoneRinging>
                  <Text size="0.9rem" c={"gray"} ml={"10px"}>
                    {companyInfo.phone}
                  </Text>
                </Flex>
              </Stack>
            </Flex>

            <Flex
              gap="xs"
              mb={"20px"}
              w={"100%"}
              justify={"space-between"}
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Button
                variant="light"
                color="green"
                leftSection={
                  <IconCircleCheckFilled size={"1rem"}></IconCircleCheckFilled>
                }
                onClick={() => {}}
              >
                Doanh nghiệp
              </Button>
              <Button
                variant="light"
                color="blue"
                leftSection={<IconEdit size={"14px"}></IconEdit>}
                onClick={() => {
                  open();
                }}
              >
                Chỉnh sửa
              </Button>
            </Flex>

            <Flex
              gap={"md"}
              justify={"flex-start"}
              align={"center"}
              wrap={"wrap"}
            >
              <IconMapPin color="gray" size={"1.2rem"}></IconMapPin>
              <Text size="0.9rem" fw={500}>
                Địa chỉ:
              </Text>
              <Text size="0.9rem">{companyInfo.address}</Text>
              <ActionIcon
                variant="light"
                color="orange"
                aria-label="Settings"
                onClick={() => {
                  window.open(
                    "https://maps.app.goo.gl/prctgV8giY7MBMfr5",
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                <IconMap2 stroke={1.5} />
              </ActionIcon>
            </Flex>
            <Flex gap={"md"} justify={"flex-start"} align={"center"}>
              <IconWorldWww color="gray" size={"1.5rem"}></IconWorldWww>
              <Text size="0.9rem" fw={500}>
                Website:
              </Text>
              <Text
                c={"blue"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.open(companyInfo.webUrl);
                }}
              >
                {companyInfo.webUrl}
              </Text>
            </Flex>
            <Flex gap={"md"} justify={"flex-start"} align={"center"}>
              <IconBriefcase color="gray" size={"1.2rem"}></IconBriefcase>
              <Text size="0.9rem" fw={500}>
                Mô tả:
              </Text>
            </Flex>

            <Flex pos={"relative"}>
              {!showMore &&
                contentRef.current &&
                contentRef.current.scrollHeight >= 200 && (
                  <Box
                    pos={"absolute"}
                    style={{
                      zIndex: 10,
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.9))",
                    }}
                    w={"100%"}
                    h={"1.5rem"}
                    bottom={"1.5rem"}
                  />
                )}

              <Spoiler
                w={"100%"}
                className="rich-text"
                maxHeight={200}
                showLabel={
                  <Flex
                    direction={"row"}
                    justify={"flex-start"}
                    align={"center"}
                    gap={"xs"}
                    mt={"1rem"}
                    w={"100%"}
                  >
                    <Text>Xem thêm</Text>
                    <IconChevronDown size={16} />
                  </Flex>
                }
                hideLabel={
                  <Flex
                    direction={"row"}
                    justify={"flex-start"}
                    align={"center"}
                    gap={"xs"}
                    mt={"1rem"}
                  >
                    <Text>Thu gọn</Text>
                    <IconChevronUp size={16} />
                  </Flex>
                }
                transitionDuration={2000}
                onExpandedChange={(expanded) => setShowmore(expanded)}
              >
                <div
                  ref={contentRef}
                  className="rich-text"
                  dangerouslySetInnerHTML={{ __html: companyInfo.description }}
                />
              </Spoiler>
            </Flex>

            <Space></Space>
          </Stack>
        </Container>
      </>
    )
  );
}
