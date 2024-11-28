import { Box, Text, Accordion, Button } from "@mantine/core";
import { WorkHistoryItem } from "@features/candidate/cv";
import { IoIosAdd } from "react-icons/io";

import { WorkHistoryItemType } from "@features/candidate/cv/components/generateCV/WorkHistoryItem";

type WorkHistoryProps = {
  onChangeWorkHistoryList?: (workHistoryList: WorkHistoryItemType[]) => void;
  onDeletedWorkHistoryItem?: (id: number) => void;
  workHistory: WorkHistoryItemType[];
  setWorkHistory: (workHistory: WorkHistoryItemType[]) => void;
};

export default function WorkHistory(props: WorkHistoryProps) {
  const deleteItemHandler = (id: number) => {
    props.onDeletedWorkHistoryItem?.(id);
  };

  const handleItemChange = (item: WorkHistoryItemType) => {
    const newWorkHistory = props.workHistory.map((work) =>
      work.id === item.id ? item : work
    );
    props.setWorkHistory(newWorkHistory || []);
    props.onChangeWorkHistoryList?.(newWorkHistory || []);
  };

  const workHistoryList =
    props.workHistory &&
    props.workHistory.map((item) => (
      <WorkHistoryItem
        item={item}
        deleteWorkHistoryItem={deleteItemHandler}
        onItemChange={handleItemChange}
      />
    ));

  return (
    <Box>
      <Text size="lg" fw={500} mb="xs">
        Lịch sử làm việc
      </Text>
      <Accordion chevronPosition="left" mx="auto" mb="sm" variant="contained">
        {workHistoryList}
      </Accordion>
      <Button
        onClick={() =>
          props.setWorkHistory &&
          props.setWorkHistory([
            ...props.workHistory,
            { id: props.workHistory.length + 1 },
          ])
        }
        leftSection={<IoIosAdd fontWeight={500} className="h-4 w-4" />}
        variant="subtle"
        w="100%"
      >
        Thêm lịch sử làm việc
      </Button>
    </Box>
  );
}
