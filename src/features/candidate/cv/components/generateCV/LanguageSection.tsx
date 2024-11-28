import { Box, Text, Accordion, Button } from "@mantine/core";
import { IoIosAdd } from "react-icons/io";
import { LanguageItem } from "@features/candidate/cv";
import { LanguageItemType } from "@features/candidate/cv";

type LanguageSectionProps = {
  items?: LanguageItemType[];
  setItems?: (items: LanguageItemType[]) => void;
};

export default function LanguageSection(props: LanguageSectionProps) {
  const deleteLanguageItemHandler = (id: number) => {
    if (!props.items || !props.setItems) return;

    const newLanguages = props.items.filter((item) => item.id !== id);
    props.setItems(newLanguages);
  };

  const handleOnItemChange = (item: LanguageItemType) => {
    if (!props.items || !props.setItems) return;

    const newLanguages = props.items.map((language) =>
      language.id === item.id ? item : language
    );
    props.setItems(newLanguages);
  };

  const languageList = props.items?.map((item) => (
    <LanguageItem
      languageItem={item}
      deleteLanguageItem={deleteLanguageItemHandler}
      onItemChange={handleOnItemChange}
    />
  ));

  const handleAddlanguage = () => {
    if (!props.items || !props.setItems) return;
    const newId = props.items.length + 1;
    props.setItems([
      ...props.items,
      {
        id: newId,
        name: "",
        description: "",
      },
    ]);
  };

  return (
    <Box>
      <Text size="lg" fw={500} mb="xs">
        Ngoại ngữ
      </Text>
      <Accordion chevronPosition="left" mx="auto" mb="sm" variant="contained">
        {languageList}
      </Accordion>
      <Button
        onClick={handleAddlanguage}
        leftSection={<IoIosAdd fontWeight={500} className="h-4 w-4" />}
        variant="subtle"
        w="100%"
      >
        Thêm ngoại ngữ
      </Button>
    </Box>
  );
}
