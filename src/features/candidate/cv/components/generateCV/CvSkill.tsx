import { Box, Text, TagsInput } from "@mantine/core";

type CvSkillProps = {
  skills?: string[];
  onSetSkills?: (skills: string[]) => void;
};

export default function CvSkill(props: CvSkillProps) {
  const onSkillsChangeHandler = (skills: string[]) => {
    props.onSetSkills?.(skills);
  };

  return (
    <Box pb="5">
      <Text size="lg" fw={500} mb="xs">
        Kỹ năng
      </Text>
      <Text size="sm" style={{ color: "#acacac" }} mb="sm">
        Thêm các kỹ năng quan trọng của bạn để thể hiện trình độ của bạn. Đảm
        bảo các kỹ năng phù hợp với công việc bạn muốn ứng tuyển. (Nhập tên kỹ
        năng rồi enter)
      </Text>
      <TagsInput
        name="skills"
        value={props.skills}
        onChange={onSkillsChangeHandler}
        size="sm"
        placeholder="Nhập tên kỹ năng"
        variant="filled"
      />
    </Box>
  );
}
