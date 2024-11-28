import {
  Group,
  Progress,
  Box,
  Text,
  Badge,
  Grid,
  Button,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import "@mantine/tiptap/styles.css";
import {
  CvDescription,
  CvPersonalInfomation,
  EducationProcess,
  WorkHistoryList,
  CvSkill,
  TemplateCv,
  ProjectSection,
  ProjectItemType,
} from "@features/candidate/cv";
import LanguageSection from "@features/candidate/cv/components/generateCV/LanguageSection";
import { IoMdDownload } from "react-icons/io";
import { HiOutlineAdjustments } from "react-icons/hi";
import { BiSolidCertification } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { MdVolunteerActivism } from "react-icons/md";
import { FaHeadphonesAlt } from "react-icons/fa";
import { useRef, useState } from "react";
import { CvPersonalInfomationProps } from "@features/candidate/cv/components/generateCV/CvPersonalInfomation";
import {
  WorkHistoryItemType,
  EducationItemType,
  LanguageItemType,
} from "@features/candidate/cv";
import CreateCVPagination from "./CreateCVPagination";

export default function GenerateCVPage() {
  const [personalInfo, setPersonalInfo] = useState<CvPersonalInfomationProps>(
    {}
  );
  const [cvDescription, setCvDescription] = useState<string>("");
  const [skills, setSkills] = useState<string[]>(["React", "HTML, CSS, JS"]);
  const [workHistoryList, setWorkHistoryList] = useState<WorkHistoryItemType[]>(
    []
  );
  const [educationProcess, setEducationProcess] = useState<EducationItemType[]>(
    []
  );
  const [languageItems, setLanguageItems] = useState<LanguageItemType[]>([]);
  const [projectItems, setProjectItems] = useState<ProjectItemType[]>([]);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const onTextInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Set a new timeout to update the state after 0.5 seconds
    debounceTimeout.current = setTimeout(() => {
      setPersonalInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }, 500);
  };

  const onSetSkillsHandler = (skills: string[]) => {
    setSkills(skills);
  };

  const handleDeleteWorkHistoryItem = (id: number) => {
    setWorkHistoryList((prevState) =>
      prevState.filter((item) => item.id !== id)
    );
  };

  const handleDeleteEducationItem = (id: number) => {
    setEducationProcess((prevState) =>
      prevState.filter((item) => item.id !== id)
    );
  };

  const handleDeleteProjectItem = (id: number) => {
    setProjectItems((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div className="flex gap-0 h-[100vh] overflow-hidden">
      <div className="flex flex-col gap-2 px-4 w-1/2 bg-white h-[100vh] overflow-y-auto pb-10">
        <div className="sticky top-0 z-10 bg-white py-4 ">
          <Group gap="xs">
            <Badge>45%</Badge>
            <Text style={{ color: "#444444" }} size="sm" fw={500}>
              CV của bạn đã hoàn thiện
            </Text>
          </Group>
          <Progress value={50} size={"xs"} mt="sm" />
        </div>
        <CvPersonalInfomation
          {...personalInfo}
          onTextInputChange={onTextInputChangeHandler}
        />
        <CvDescription
          description={cvDescription}
          onCvDescriptionChange={(value) => setCvDescription(value)}
        />
        <WorkHistoryList
          setWorkHistory={setWorkHistoryList}
          workHistory={workHistoryList}
          onDeletedWorkHistoryItem={handleDeleteWorkHistoryItem}
        />
        <EducationProcess
          educationProcess={educationProcess}
          setEducationProcess={setEducationProcess}
          onDeletedEducationItem={handleDeleteEducationItem}
        />
        <CvSkill skills={skills} onSetSkills={onSetSkillsHandler} />
        <LanguageSection items={languageItems} setItems={setLanguageItems} />
        <ProjectSection
          items={projectItems}
          setItems={setProjectItems}
          onDeletedProjectItem={handleDeleteProjectItem}
        />
        <Box>
          <Text size="lg" fw={500} mb="xs">
            Thêm thông tin khác
          </Text>
          <Grid>
            <Grid.Col span={6}>
              <Button
                color="gray"
                leftSection={
                  <HiOutlineAdjustments className="h-4 w-4 text-primary-500" />
                }
                variant="subtle"
              >
                Mục tùy chỉnh
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                color="gray"
                leftSection={
                  <BiSolidCertification className="h-4 w-4 text-primary-500" />
                }
                variant="subtle"
              >
                Khóa học, chứng chỉ
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                disabled
                leftSection={
                  <IoLanguage className="h-4 w-4 text-primary-500" />
                }
                variant="subtle"
              >
                Các ngôn ngữ khác
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                leftSection={
                  <MdVolunteerActivism className="h-4 w-4 text-primary-500" />
                }
                variant="subtle"
                color="gray"
              >
                Hoạt động xã hội
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                leftSection={
                  <FaHeadphonesAlt className="h-4 w-4 text-primary-500" />
                }
                color="gray"
                variant="subtle"
              >
                Sở thích
              </Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button
                color="gray"
                leftSection={<FaUserAlt className="h-4 w-4 text-primary-500" />}
                variant="subtle"
              >
                Người tham khảo
              </Button>
            </Grid.Col>
          </Grid>
        </Box>
      </div>

      <div className="bg-gray-200  h-[100vh] w-[50%] sticky top-0">
        <Group px="24" py="12">
          <CreateCVPagination count={2} page={1} onPageChange={() => {}} />
          <Tooltip label="Tải xuống">
            <ActionIcon variant="subtle" color="white" ml="auto">
              <IoMdDownload />
            </ActionIcon>
          </Tooltip>
        </Group>

        <TemplateCv
          educationProcess={educationProcess}
          personalInfo={personalInfo}
          cvDescription={cvDescription}
          skills={skills}
          workHistoryList={workHistoryList}
          languageItems={languageItems}
          projects={projectItems}
        />
      </div>
    </div>
  );
}
