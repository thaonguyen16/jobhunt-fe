/* eslint-disable @typescript-eslint/no-explicit-any */
import { Option } from "@data/interface/option";
import {
  ActionIcon,
  Combobox,
  Flex,
  Group,
  Radio,
  Text,
  useCombobox,
} from "@mantine/core";
import { fetchWorkModes } from "@services/workModeService";
import {
  IconBriefcase2,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ComboBoxWorkModeFJ({
  selectedWorkMode,
  setSelectedWorkMode,
  getMobile,
}: {
  selectedWorkMode: string;
  setSelectedWorkMode: (value: any) => void;
  getMobile: boolean;
}) {
  const [workModeData, setWorkModeData] = useState<Option[]>([]);
  const [selectedWorkModeName, setSelectedWorkModeName] = useState(
    "Hình thức công việc"
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchWorkMode = async () => {
      await fetchWorkModes().then((data) => {
        if (data) {
          setWorkModeData([{ id: -1, name: "Tất cả ngành nghề" }, ...data]);
        }
      });
    };
    fetchWorkMode();
  }, []);

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setIsOpen(false);
    },
    onDropdownOpen: () => {
      setIsOpen(true);
    },
  });

  const optionsLocation = workModeData.map((item) => (
    <Combobox.Option value={item.id + ""} key={item.id + ""}>
      <Group gap="sm">
        <Radio
          variant="outline"
          color="teal"
          className="checkbox-styles"
          checked={selectedWorkMode === item.id + ""}
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
      key={"location"}
      transitionProps={{ duration: 500, transition: "slide-down" }}
      store={combobox}
      width={300}
      position="bottom-start"
      withinPortal={true}
      positionDependencies={[]}
      onOptionSubmit={(val) => {
        setSelectedWorkMode(val);
        const selected = workModeData.find((item) => item.id + "" === val);
        if (selected?.id === -1) {
          setSelectedWorkModeName("Hình thức công việc");
          return;
        }

        setSelectedWorkModeName(selected?.name || "Hình thức công việc");
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
          <IconBriefcase2 size={20} color="rgb(120,120,120)" />
          <Text
            fw={500}
            lineClamp={1}
            size="14px"
            h={"46%"}
            c={"rgba(0,0,0,.6)"}
          >
            {selectedWorkModeName}
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
              Hình thức công việc
            </Text>
          </Combobox.Header>
          {optionsLocation}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}