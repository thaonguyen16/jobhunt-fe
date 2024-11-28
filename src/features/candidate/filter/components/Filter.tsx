import { TextInput, Select, Button, Group, Text } from "@mantine/core";
import { IoIosSearch } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "@store";

export default function Filter() {
  const paginationData = useSelector(
    (state: RootState) => state.paginationData.paginationData
  );

  return (
    <div className="flex flex-col gap-1 bg-white  p-4 rounded-md">
      <Group>
        <TextInput
          w={300}
          variant="filled"
          leftSection={<IoIosSearch></IoIosSearch>}
          placeholder="Search jobs.."
        ></TextInput>

        <Select
          variant="filled"
          placeholder="Chọn nơi làm việc"
          data={["1-2 năm", "3-4 năm", "5 - 10 năm", "Trên 10 năm"]}
        />

        <Select
          variant="filled"
          placeholder="Hình thức làm việc"
          data={["1-2 năm", "3-4 năm", "5 - 10 năm", "Trên 10 năm"]}
        />

        <Select
          variant="filled"
          placeholder="Chọn mức lương"
          data={[
            "5 - 10 triệu",
            "10 - 15 triệu",
            "15 - 20 triệu",
            "Trên 20 triệu",
          ]}
        />
        <Button>Tìm</Button>
      </Group>
      <Text size="sm" component="span" mt="sm" mr="auto">
        Tìm thấy{" "}
        <span className="text-primary-600 font-bold text-lg">
          {paginationData.totalItems}
        </span>{" "}
        việc làm phù hợp với yêu cầu của bạn
      </Text>
    </div>
  );
}

