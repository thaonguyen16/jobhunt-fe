import {
  Stack,
  Text,
  Avatar,
  Divider,
  TypographyStylesProvider,
  Group,
} from "@mantine/core";
import { CvPersonalInfomationProps } from "./CvPersonalInfomation";
import styles from "./TemplateCv.module.css";
import {
  EducationItemType,
  LanguageItemType,
  WorkHistoryItemType,
  ProjectItemType,
} from "@features/candidate/cv";

type TemplateCvProps = {
  personalInfo?: CvPersonalInfomationProps;
  cvDescription?: string;
  skills?: string[];
  workHistoryList?: WorkHistoryItemType[];
  educationProcess?: EducationItemType[];
  languageItems?: LanguageItemType[];
  projects?: ProjectItemType[];
};

export default function TemplateCv(props: TemplateCvProps) {
  const { personalInfo, cvDescription } = props;

  const isShowPersonalInfo =
    personalInfo?.email || personalInfo?.phone || personalInfo?.address;

  return (
    <div className={`${styles["cv-wrapper"]}`}>
      <div className={`${styles["cv-container"]} bg-white flex gap-2 mx-auto`}>
        <div className="bg-primary-600 w-1/3 flex flex-col ">
          <Stack mt="xl" gap="xs" align="center" mb="sm">
            <Text
              style={{
                color: "#ffffff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
              fw={500}
              size="md"
            >
              {personalInfo?.firstName} {personalInfo?.lastName}
            </Text>
            <Avatar
              size="xl"
              src={
                personalInfo?.avatar ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg"
              }
              style={{ border: "2px solid #ffffff" }}
            />
            <Text
              style={{
                color: "#ffffff",
                textAlign: "center",
                textTransform: "uppercase",
              }}
              fw={500}
              size="xs"
            >
              {personalInfo?.jobTitle}
            </Text>
          </Stack>
          <Stack gap="2" align="start" pl="sm" mt="sm">
            {isShowPersonalInfo && (
              <Text
                style={{ color: "#ffffff", textAlign: "center" }}
                fw={500}
                size="xs"
                mb="xs"
              >
                Thông tin cá nhân
              </Text>
            )}

            <ul className="flex flex-col gap-2 px-1">
              <li>
                <p className="text-[9px] text-white ">
                  {personalInfo?.phone
                    ? `Điện thoại: ${personalInfo?.phone}`
                    : ""}
                </p>
              </li>
              <li>
                <p className="text-[9px] text-white ">
                  {personalInfo?.email ? `Email: ${personalInfo?.email}` : ""}
                </p>
              </li>
              <li>
                <p className="text-[9px] text-white ">
                  {personalInfo?.address
                    ? `Địa chỉ: ${personalInfo?.address}`
                    : ""}
                </p>
              </li>
            </ul>
          </Stack>

          <Stack gap="2" align="start" pl="sm" mt="sm">
            {props.skills && props.skills?.length > 0 && (
              <Text
                style={{ color: "#ffffff", textAlign: "center" }}
                fw={500}
                size="xs"
                mb="xs"
              >
                Kỹ năng
              </Text>
            )}
            <ul className="flex flex-col gap-2 px-1">
              {props.skills?.map((skill) => (
                <li>
                  <p className="text-[9px] text-white font-semibold">{skill}</p>
                </li>
              ))}
            </ul>
          </Stack>
        </div>
        <Stack bg="white" w="60%" pt="xl" gap="xs">
          {cvDescription !== "<p></p>" && (
            <>
              <div>
                <Text size="sm" fw={500} mb="4">
                  Mục tiêu nghề nghiệp
                </Text>
                <TypographyStylesProvider>
                  <div
                    className={`${styles["html-content"]} break-words whitespace-normal`}
                    dangerouslySetInnerHTML={{ __html: cvDescription || "" }}
                  />
                </TypographyStylesProvider>
              </div>
              <Divider />
            </>
          )}

          {props.workHistoryList && props.workHistoryList?.length > 0 && (
            <>
              <div>
                <Text size="sm" fw={500} mb="4">
                  Kinh nghiệm làm việc
                </Text>
                <ul className="flex flex-col gap-4">
                  {props.workHistoryList?.map((item) => (
                    <li className="flex flex-col gap-2">
                      <Group justify="space-between">
                        <div className="w-[65%]">
                          <Text size="xs" fw="500">
                            {item.position}
                          </Text>
                          <Text size="xs">{`${item.company}`}</Text>
                        </div>
                        <Text style={{ color: "#7c7c7c" }} size={"10px"}>
                          {item.startDate} - {item.endDate}
                        </Text>
                      </Group>
                      <TypographyStylesProvider>
                        <div
                          className={`${styles["html-content"]} text-[10px] break-words whitespace-normal`}
                          dangerouslySetInnerHTML={{
                            __html: item.description || "",
                          }}
                        />
                      </TypographyStylesProvider>
                    </li>
                  ))}
                </ul>
              </div>
              <Divider />
            </>
          )}

          {props.educationProcess && props.educationProcess?.length > 0 && (
            <>
              <Text size="sm" fw={500} mb="4">
                Học vấn
              </Text>
              <ul className="flex flex-col gap-2">
                {props.educationProcess?.map((item) => (
                  <li className="flex flex-col ">
                    <Stack gap="0">
                      <Group>
                        <div className="text-[12px] font-semibold w-[65%] break-words">
                          <p>{item.school}</p>
                        </div>
                        <Text
                          style={{ color: "#7c7c7c" }}
                          size={"10px"}
                          ml="auto"
                        >
                          {item.startDate} - {item.endDate}
                        </Text>
                      </Group>
                      {item.degree && (
                        <Text
                          size="xs"
                          style={{ color: "#7c7c7c", fontSize: "10px" }}
                        >
                          Bằng cấp: {item.degree}
                        </Text>
                      )}
                    </Stack>
                  </li>
                ))}
              </ul>
              <Divider />
            </>
          )}

          {props.languageItems && props.languageItems?.length > 0 && (
            <>
              <div>
                <Text size="sm" fw={500} mb="4">
                  Ngôn ngữ
                </Text>
                <ul className="flex flex-col gap-4">
                  {props.languageItems?.map((item) => (
                    <li className=" text-xs flex flex-col gap-2">
                      <div className="flex justify-between items-center ">
                        <div className="text-[12px] font-bold flex gap-1">
                          <p>{item.name}</p>
                        </div>
                        <Text style={{ color: "#7c7c7c" }} size={"12px"}>
                          {item.level}
                        </Text>
                      </div>
                      <span>{item.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Divider />
            </>
          )}

          {props.projects && props.projects?.length > 0 && (
            <div>
              <Text size="sm" fw={500} mb="4">
                Dự án đã tham gia
              </Text>
              <ul className="flex flex-col gap-4">
                {props.projects?.map((item) => (
                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center ">
                      <div className="text-[12px] font-semibold flex gap-1">
                        <p>{item.name}</p>
                      </div>
                      <Text style={{ color: "#7c7c7c" }} size={"10px"}>
                        {item.startDate} - {item.endDate}
                      </Text>
                    </div>
                  </li>
                ))}
                <li className="flex flex-col gap-2">
                  <div className="flex justify-between items-center ">
                    <div className="text-[12px] font-semibold flex gap-1">
                      <p>Dự án ABC</p>
                    </div>
                    <Text style={{ color: "#7c7c7c" }} size={"10px"}>
                      3/2021 - 6/2023
                    </Text>
                  </div>
                  <ul className="text-xs flex flex-col gap-1">
                    <li>
                      <span>Vai trò: </span>
                      <span>Backend developer</span>
                    </li>
                    <li>
                      <span>Mô tả: </span>
                      <span>
                        Thực hiện viết api cho web bán và quản lý bảo hiểm. Quản
                        lý team 10 thành viên.
                      </span>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}

          <Divider />
        </Stack>
      </div>
    </div>
  );
}
