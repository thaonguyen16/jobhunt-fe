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
  RefererType,
} from "@features/candidate/cv";
import { forwardRef } from "react";

type TemplateCvProps = {
  personalInfo?: CvPersonalInfomationProps;
  cvDescription?: string;
  skills?: string[];
  workHistoryList?: WorkHistoryItemType[];
  educationProcess?: EducationItemType[];
  languageItems?: LanguageItemType[];
  projects?: ProjectItemType[];
  referer?: RefererType;
};

const TemplateCv = forwardRef<HTMLDivElement, TemplateCvProps>(
  (
    {
      educationProcess,
      personalInfo,
      cvDescription,
      skills,
      workHistoryList,
      languageItems,
      projects,
      referer,
    },
    ref
  ) => {
    const isShowPersonalInfo =
      personalInfo?.email ||
      personalInfo?.phone ||
      personalInfo?.address ||
      personalInfo?.birthday;

    const isShowReferer =
      referer?.email ||
      referer?.phone ||
      referer?.contactLink ||
      referer?.fullName;

    return (
      <div
        className={`${styles["cv-container"]} bg-white flex gap-2 mx-auto`}
        ref={ref}
      >
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
              src={personalInfo?.avatar || ""}
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
                <p className="text-[10px] text-white ">
                  {personalInfo?.phone
                    ? `Điện thoại: ${personalInfo?.phone}`
                    : ""}
                </p>
              </li>
              <li>
                <p className="text-[10px] text-white ">
                  {personalInfo?.email ? `Email: ${personalInfo?.email}` : ""}
                </p>
              </li>
              <li>
                <p className="text-[10px] text-white ">
                  {personalInfo?.address
                    ? `Địa chỉ: ${personalInfo?.address}`
                    : ""}
                </p>
              </li>
              <li>
                <p className="text-[10px] text-white ">
                  {personalInfo?.birthday
                    ? `Địa chỉ: ${personalInfo?.birthday}`
                    : ""}
                </p>
              </li>
            </ul>
          </Stack>

          <Stack gap="2" align="start" pl="sm" mt="sm">
            {skills && skills?.length > 0 && (
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
              {skills?.map((skill) => (
                <li>
                  <p className="text-[10px] text-white font-semibold">
                    {skill}
                  </p>
                </li>
              ))}
            </ul>
          </Stack>

          <Stack gap="2" align="start" pl="sm" mt="sm">
            {isShowReferer && (
              <Text
                style={{ color: "#ffffff", textAlign: "center" }}
                fw={500}
                size="xs"
                mb="xs"
              >
                Người giới thiệu
              </Text>
            )}

            <ul className="flex flex-col gap-2 px-1">
              <li>
                <p className="text-[10px] text-white ">
                  {referer?.fullName ? `Tên: ${referer?.fullName}` : ""}
                </p>
              </li>
              <li>
                <p className="text-[10px] text-white ">
                  {referer?.email ? `Email: ${referer?.email}` : ""}
                </p>
              </li>
              <li>
                <p className="text-[10px] text-white ">
                  {referer?.phone ? `Điện thoại: ${referer?.phone}` : ""}
                </p>
              </li>
              <li>
                <p className="text-[10px] text-white ">
                  {referer?.contactLink
                    ? `Link liên hệ: ${referer?.contactLink}`
                    : ""}
                </p>
              </li>
            </ul>
          </Stack>
        </div>
        <Stack bg="white" w="60%" pt="sm" gap="xs">
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

          {workHistoryList && workHistoryList?.length > 0 && (
            <>
              <div>
                <Text size="sm" fw={500} mb="4">
                  Kinh nghiệm làm việc
                </Text>
                <ul className="flex flex-col gap-4">
                  {workHistoryList?.map((item) => (
                    <li className="flex flex-col gap-2">
                      <Group>
                        <div className="w-[60%]">
                          <Text size="11px" fw="500" mb="4">
                            {item.position}
                          </Text>
                          <Text size="xs">{`${item.companyName}`}</Text>
                        </div>
                        <Text style={{ color: "#7c7c7c" }} size={"9px"}>
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

          {educationProcess && educationProcess?.length > 0 && (
            <>
              <Text size="sm" fw={500} mb="4">
                Học vấn
              </Text>
              <ul className="flex flex-col gap-2">
                {educationProcess?.map((item) => (
                  <li className="flex flex-col ">
                    <Stack gap="0">
                      <Group>
                        <div className="text-[12px] font-semibold w-[65%] break-words">
                          <p>{item.schoolName}</p>
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

          {languageItems && languageItems?.length > 0 && (
            <>
              <div>
                <Text size="sm" fw={500} mb="4">
                  Ngôn ngữ
                </Text>
                <ul className="flex flex-col gap-4">
                  {languageItems?.map((item) => (
                    <li className=" text-xs flex flex-col gap-2">
                      <div className="flex justify-between items-center ">
                        <div className="text-[11px] font-bold flex gap-1">
                          <p>{item.name}</p>
                        </div>
                        <Text style={{ color: "#7c7c7c" }} size={"11px"}>
                          {item.level}
                        </Text>
                      </div>
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

          {projects && projects?.length > 0 && (
            <div>
              <Text size="sm" fw={500} mb="4">
                Dự án đã tham gia
              </Text>
              <ul className="flex flex-col gap-4">
                {projects?.map((item) => (
                  <li className="flex flex-col gap-2">
                    <div className="flex justify-between items-center ">
                      <div className="text-[12px] font-semibold flex gap-1">
                        <p>{item.name}</p>
                      </div>
                      <Text style={{ color: "#7c7c7c" }} size={"10px"}>
                        {item.startDate} - {item.endDate}
                      </Text>
                    </div>
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
          )}
        </Stack>
      </div>
    );
  }
);

export default TemplateCv;
