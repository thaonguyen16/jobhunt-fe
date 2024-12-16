/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionIcon,
  Button,
  Combobox,
  Flex,
  RangeSlider,
  rem,
  Text,
  useCombobox,
} from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconMoneybag,
  IconPointFilled,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { decorSalary } from "@utils/regular";

export default function ComboBoxSalaryFJ({
  getMobile,
  value,
  setValue,
}: {
  getMobile: boolean;
  value: [number, number];
  setValue: (value: any) => void;
}) {
  const [selectedSalary, setSelectedSalary] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const marks = [
    { value: 10, label: "10 triệu" },
    { value: 50, label: "50 triệu" },
    { value: 100, label: "100 triệu" },
  ];

  useEffect(() => {
    setSelectedSalary(decorSalary(value[0] * 1000000, value[1] * 1000000));
  }, [value]);


  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setIsOpen(false);
    },
    onDropdownOpen: () => {
      setIsOpen(true);
    },
  });

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
        setSelectedSalary(val);
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
          <IconMoneybag size={20} color="rgb(120,120,120)" />
          <Text
            fw={500}
            lineClamp={1}
            size="14px"
            h={"46%"}
            c={"rgba(0,0,0,.6)"}
          >
            {selectedSalary.length !== 0 ? selectedSalary : "Mức lương"}
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
          overflowX: "hidden",
        }}
      >
        <Combobox.Options>
          <Combobox.Header>
            <Text fw={700} size="sm">
              Mức lương công việc
            </Text>
          </Combobox.Header>
          <Flex
            direction={"column"}
            w={"100%"}
            justify={"center"}
            align={"center"}
          >
            <RangeSlider
              w={"80%"}
              mt={"xs"}
              mb={"xl"}
              min={0}
              max={100}
              step={5}
              styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
              color="green"
              showLabelOnHover
              defaultValue={[0, 10]}
              thumbSize={18}
              thumbChildren={[
                <IconPointFilled size="1rem" key="1" />,
                <IconPointFilled size="1rem" key="2" />,
              ]}
              marks={marks}
              value={value}
              onChange={setValue}
            />
            <Button
              variant="light"
              w={"80%"}
              mb={"1rem"}
              onClick={() => {
                combobox.closeDropdown();
                setSelectedSalary(
                  decorSalary(value[0] * 1000000, value[1] * 1000000)
                );
              }}
            >
              Áp dụng
            </Button>
          </Flex>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
