import { Box, Text, Accordion, Button } from "@mantine/core";
import { EducationItem, EducationItemType } from "@features/candidate/cv";
import { IoIosAdd } from "react-icons/io";

type EducationProcessProps = {
  onDeletedEducationItem?: (id: number) => void;
  educationProcess: EducationItemType[];
  setEducationProcess: (educationProcess: EducationItemType[]) => void;
};

export default function EducationProcess(props: EducationProcessProps) {
  const deleteItemHandler = (id: number) => {
    props.onDeletedEducationItem?.(id);
  };

  const hanleOnItemChange = (item: EducationItemType) => {
    const newEducationProcess = props.educationProcess.map((educationItem) =>
      educationItem.id === item.id ? item : educationItem
    );
    props.setEducationProcess(newEducationProcess);
  };

  const educations = props.educationProcess.map((item) => (
    <EducationItem
      onItemChange={hanleOnItemChange}
      educationItem={item}
      deleteEducationItem={deleteItemHandler}
    />
  ));

  return (
    <Box>
      <Text size="lg" fw={500} mb="xs">
        Quá trình học vấn
      </Text>
      <Accordion chevronPosition="left" mx="auto" mb="sm" variant="contained">
        {educations}
      </Accordion>
      <Button
        onClick={() =>
          props.setEducationProcess([
            ...props.educationProcess,
            { id: props.educationProcess.length + 1 },
          ])
        }
        leftSection={<IoIosAdd fontWeight={500} className="h-4 w-4" />}
        variant="subtle"
        w="100%"
      >
        Thêm quá trình học vấn
      </Button>
    </Box>
  );
}
