import {
  uploadBytes,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "@services/firebaseService";
import { Group, Button, LoadingOverlay, ActionIcon } from "@mantine/core";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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
  Referer,
  RefererType,
} from "@features/candidate/cv";

import { FaSave } from "react-icons/fa";

import LanguageSection from "@features/candidate/cv/components/generateCV/LanguageSection";
import { IoMdDownload } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { CvPersonalInfomationProps } from "@features/candidate/cv/components/generateCV/CvPersonalInfomation";
import {
  WorkHistoryItemType,
  EducationItemType,
  LanguageItemType,
} from "@features/candidate/cv";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { createResume, getResumeDetail } from "@/api/resume";
import { notifications } from "@mantine/notifications";
import { useLocation } from "react-router-dom";

export type CreateCVBody = {
  name?: string;
  url: string;
  avatarUrl: string;
  phone?: string;
  title?: string;
  email?: string;
  address?: string;
  birthday?: string;
  firstName: string;
  lastName?: string;
  description?: string;
  skills: { name: string }[];
  workHistories?: WorkHistoryItemType[];
  educationHistories?: EducationItemType[];
  languages: LanguageItemType[];
  projects: ProjectItemType[];
  referencePerson?: string;
};

const initCvDescription =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";

const initWorkHistoryList: WorkHistoryItemType[] = [
  {
    position: "Developer",
    companyName: "FPT Software",
    startDate: "02/2023",
    endDate: "08/2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    position: "Developer",
    companyName: "Công ty TNHH Bosch",
    startDate: "02/2023",
    endDate: "08/2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const initLanguageItems: LanguageItemType[] = [
  {
    name: "Tiếng anh",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    level: "B2",
  },
];

const initProjectItems: ProjectItemType[] = [
  {
    name: "Project 1",
    startDate: "02/2023",
    endDate: "08/2023",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

const initPersonalInfo: CvPersonalInfomationProps = {
  firstName: "Duy",
  lastName: "Tran",
  avatar: "/src/assets/img/template_avatar.png",
  email: "thanhduy@gmail.com",
  phone: "0987654321",
  address: "Hanoi",
  jobTitle: "Java Developer",
};

const initReferer: RefererType = {
  fullName: "Nguyễn Văn A",
  email: "nva@gmail.com",
  phone: "0987654321",
  contactLink: "https://www.facebook.com/",
};

export default function GenerateCVPage() {
  const location = useLocation();
  const { id } = location.state || {};
  const resumeQuery = useQuery({
    queryKey: ["resume", id],
    queryFn: () => getResumeDetail(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (resumeQuery.data) {
      const {
        title,
        avatarUrl,
        phone,
        email,
        address,
        firstName,
        lastName,
        description,
        skills,
        workHistories,
        educationHistories,
        languages,
        projects,
      } = resumeQuery.data.data;

      setPersonalInfo({
        jobTitle: title,
        avatar: avatarUrl,
        phone,
        email,
        address,
        firstName,
        lastName,
      });

      setCvDescription(description);
      setSkills(skills?.map((skill: { name: string }) => skill.name));
      setWorkHistoryList(workHistories);
      setEducationProcess(educationHistories);
      setLanguageItems(languages);
      setProjectItems(projects);
    }
  }, [resumeQuery.data]);

  const [personalInfo, setPersonalInfo] =
    useState<CvPersonalInfomationProps>(initPersonalInfo);
  const [cvDescription, setCvDescription] = useState<string>(initCvDescription);
  const [skills, setSkills] = useState<string[]>(["React", "HTML, CSS, JS"]);
  const [workHistoryList, setWorkHistoryList] =
    useState<WorkHistoryItemType[]>(initWorkHistoryList);
  const [educationProcess, setEducationProcess] = useState<EducationItemType[]>(
    []
  );
  const [languageItems, setLanguageItems] = useState<LanguageItemType[]>(
    initLanguageItems || []
  );
  const [projectItems, setProjectItems] = useState<ProjectItemType[]>(
    initProjectItems || []
  );
  const [referer, setReferer] = useState<RefererType>(initReferer);
  const templateRef = useRef<HTMLDivElement | null>(null);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);

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

  const onTextInputRefererChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    // Set a new timeout to update the state after 0.5 seconds
    debounceTimeout.current = setTimeout(() => {
      setReferer((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      console.log("Referer:", referer);
    }, 300);
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      setAvatar(file);

      // Create a temporary URL for the file to display the image or for further use
      const fileURL = URL.createObjectURL(file);

      setPersonalInfo((prevState) => ({
        ...prevState,
        avatar: fileURL, // Temporary URL for display
      }));
    }
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

  const addCvMutation = useMutation<PostResponse, Error, CreateCVBody>({
    mutationFn: createResume,
    onError: (error) => {
      console.error("Error creating CV:", error);
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Thành công",
        message: data.message,
        autoClose: 5000,
        color: "green",
      });
    },
  });

  const handleAvatarUpload = async () => {
    if (!avatar) {
      return;
    }

    try {
      // Create a reference for the file in Firebase Storage
      const fileName = `avatars/${avatar.name}-${Date.now()}`;
      const storageRef = ref(storage, fileName);

      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, avatar);

      // Get the download URL
      const url = await getDownloadURL(snapshot.ref);

      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDownloadCv = async () => {
    const element = templateRef.current;

    if (!element) {
      console.error("Template reference not found");
      return;
    }

    try {
      const url = await handleAvatarUpload();

      // Capture the component using html2canvas
      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      // Create a new PDF document using jsPDF
      const pdf = new jsPDF("portrait", "px", "a4");

      // Get dimensions of the page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Add the captured image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Generate the PDF as a data URL
      const pdfData = pdf.output("datauristring");

      const fileName = `CV-${Date.now()}.pdf`;
      const storageRef = ref(storage, `cvs/${fileName}`);

      // Upload the PDF data to Firebase
      const snapshot = await uploadString(storageRef, pdfData, "data_url");

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      const cvData: CreateCVBody = {
        name: `${personalInfo.firstName} ${personalInfo.lastName}`,
        title: personalInfo.jobTitle || "",
        url: downloadURL,
        avatarUrl: url || "",
        phone: personalInfo.phone || "",
        email: personalInfo.email || "",
        address: personalInfo.address || "",
        birthday: "2002-07-20",
        firstName: personalInfo.firstName || "",
        lastName: personalInfo.lastName || "",
        description: cvDescription,
        languages: languageItems.map(({...rest }) => rest),
        skills: skills.map((skill) => {
          return {
            name: skill,
          };
        }),
        workHistories: workHistoryList.map(({...rest }) => rest),
        educationHistories: educationProcess.map(({ ...rest }) => rest),
        projects: projectItems.map(({...rest }) => rest),
      };

      console.log("CV Data:", cvData);

      addCvMutation.mutate(cvData);

      setPersonalInfo((prevState) => ({
        ...prevState,
        avatar: url || "", // Temporary URL for display
      }));
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className="flex gap-0 h-[100vh] overflow-hidden">
      <div className="flex flex-col gap-2 px-4 w-1/2 bg-white h-[100vh] overflow-y-auto pb-10">
        <LoadingOverlay
          visible={addCvMutation.isPending || resumeQuery.isLoading}
        />
        <CvPersonalInfomation
          {...personalInfo}
          onTextInputChange={onTextInputChangeHandler}
          setFile={handleAvatarChange}
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
        <Referer
          {...referer}
          onTextInputChange={onTextInputRefererChangeHandler}
        />
      </div>

      <div className="bg-gray-200  h-[100vh] w-[50%] sticky top-0 overflow-auto">
        <Group gap="sm" mt="sm">
          <Button
            size="xs"
            ml="auto"
            onClick={handleDownloadCv}
            leftSection={<FaSave />}
          >
            Lưu CV
          </Button>
          <ActionIcon mr="lg" variant="subtle" color="white">
            <IoMdDownload />
          </ActionIcon>
        </Group>

        <TemplateCv
          ref={templateRef}
          educationProcess={educationProcess}
          referer={referer}
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