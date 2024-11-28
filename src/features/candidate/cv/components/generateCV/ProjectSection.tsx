import { Box, Text, Accordion, Button } from "@mantine/core";
import { IoIosAdd } from "react-icons/io";
import { ProjectItem, ProjectItemType } from "@features/candidate/cv";

type ProjectSectionProps = {
  onDeletedProjectItem?: (id: number) => void;
  items: ProjectItemType[];
  setItems: (projectItems: ProjectItemType[]) => void;
};

export default function ProjectSection(props: ProjectSectionProps) {
  const { items, setItems, onDeletedProjectItem } = props;

  const hanleOnItemChange = (updatedItem: ProjectItemType) => {
    const newProjectItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(newProjectItems);
  };

  const projects = items.map((item) => (
    <ProjectItem
      item={item}
      deleteProjectItem={onDeletedProjectItem}
      onItemChange={hanleOnItemChange}
    />
  ));

  return (
    <Box>
      <Text size="lg" fw={500} mb="xs">
        Dự án tham gia
      </Text>
      <Accordion chevronPosition="left" mx="auto" mb="sm" variant="contained">
        {projects}
      </Accordion>
      <Button
        onClick={() => setItems([...items, { id: items.length + 1 }])}
        leftSection={<IoIosAdd fontWeight={500} className="h-4 w-4" />}
        variant="subtle"
        w="100%"
      >
        Thêm dự án
      </Button>
    </Box>
  );
}
