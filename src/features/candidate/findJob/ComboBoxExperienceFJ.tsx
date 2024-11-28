import {
  ActionIcon,
  Combobox,
  Flex,
  Group,
  Radio,
  Text,
  useCombobox,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSparkles,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getExperienceOptions } from "@/api/experience";
import { Option } from "@data/interface/option";
export default function ComboBoxExperienceFJ({
  selectedExp,
  setSelectedExp,
  getMobile,
}: {
  selectedExp: string;
  setSelectedExp: (value: any) => void;
  getMobile: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expOptions, setExpOptions] = useState<Option[]>([]);
  const [expName, setExpName] = useState("Kinh nghiệm");

  const expQuery = useQuery({
    queryKey: ["experience"],
    queryFn: () => getExperienceOptions(),
  });

  useEffect(() => {
    if (expQuery.data) {
      setExpOptions([{ id: "", name: "Tất cả" }, ...expQuery.data.data]);
    }
  }, [expQuery.data]);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setIsOpen(false);
    },
    onDropdownOpen: () => {
      setIsOpen(true);
    },
  });

  const optionsExp = expOptions.map((item) => (
    <Combobox.Option value={item.name} key={item.name}>
      <Group gap="sm">
        <Radio
          variant="outline"
          color="teal"
          className="checkbox-styles"
          checked={selectedExp.includes(item.name)}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: "none" }}
        />
        <span>{item.name}</span>
      </Group>
    </Combobox.Option>
  ));

  return (
    <Combobox
      key={"Exp"}
      transitionProps={{ duration: 500, transition: "slide-down" }}
      store={combobox}
      width={300}
      position="bottom-start"
      withinPortal={true}
      positionDependencies={[]}
      onOptionSubmit={(val) => {
        setSelectedExp(val);
      }}
    >
      <Combobox.Target>
        <Flex
          pl={"xs"}
          pr={"xs"}
          h={"2.1rem"}
          w={!getMobile ? "15%" : "50%"}
          direction={"row"}
          wrap={"nowrap"}
          align={"center"}
          justify={"space-between"}
          gap={"xs"}
          bg={"rgba(200,200,200,.3)"}
          style={{ borderRadius: "7px" }}
        >
          <IconSparkles size={20} color="rgb(120,120,120)" />
          <Text
            fw={500}
            lineClamp={1}
            size="14px"
            h={"46%"}
            c={"rgba(0,0,0,.6)"}
          >
            {selectedExp.length !== 0 ? selectedExp : "Kinh nghiệm"}
          </Text>
          <ActionIcon
            size={"xs"}
            variant="filled"
            color="rgba(255,255,255)"
            radius="xs"
            style={{ boxShadow: "0 2px 4px 4px rgba(120,120,120,.1)" }}
            onClick={() => {
              combobox.toggleDropdown();
            }}
          >
            {!isOpen && (
              <IconChevronDown
                color="rgba(120,120,120,1)"
                style={{ width: "90%", height: "90%" }}
                stroke={2}
              ></IconChevronDown>
            )}
            {isOpen && (
              <IconChevronUp
                color="black"
                style={{ width: "90%", height: "90%" }}
                stroke={2}
              ></IconChevronUp>
            )}
          </ActionIcon>
        </Flex>
      </Combobox.Target>

      <Combobox.Dropdown
        key={"locationD"}
        mah={"25rem"}
        style={{
          overflow: "auto",
        }}
      >
        <Combobox.Options>
          <Combobox.Header>
            <Text fw={700} size="sm">
              Kinh nghiệm làm việc
            </Text>
          </Combobox.Header>
          {optionsExp}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
