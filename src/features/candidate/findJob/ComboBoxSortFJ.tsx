/* eslint-disable @typescript-eslint/no-unused-vars */
import { Combobox, Flex, InputBase, useCombobox } from "@mantine/core";
import { useState } from "react";
import "./combobox-fj.scss";
import {
  IconChevronDown,
  IconChevronUp,
  IconSortAscending2Filled,
} from "@tabler/icons-react";

export default function ComboBoxSortFJ({
  getMobile,
  groceries,
  setValue,
}: {
  getMobile: boolean;
  groceries: any;
  value: string;
  setValue: (value: any) => void;
}) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption(), setOpen(false);
    },
    onDropdownOpen: () => setOpen(true),
  });

  const [isOpen, setOpen] = useState(false);
  const [label, setLabel] = useState("Mặc định");

  const options = groceries.map((item) => (
    <Combobox.Option value={item.value} key={item.value}>
      {item.label}
    </Combobox.Option>
  ));

  const getLabelName = (value: string) => {
    const item = groceries.find((item) => item.value === value);
    return item ? item.label : "Sắp xếp";
  };

  return (
    <Flex
      style={{ borderRadius: "10px" }}
      className="combox-location"
      direction={"row"}
      justify={"center"}
      align={"center"}
      w={!getMobile ? "22%" : "50%"}
    >
      <Combobox
        transitionProps={{ duration: 500, transition: "slide-down" }}
        position="bottom"
        width={300}
        store={combobox}
        withinPortal={true}
        onOptionSubmit={(val) => {
          setValue(val);
          setLabel(getLabelName(val));
          setOpen(false);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            w={"100%"}
            variant="transparent"
            readOnly
            pointer
            leftSection={<IconSortAscending2Filled size={"1.2rem"} />}
            onClick={() => combobox.toggleDropdown()}
            rightSection={
              !isOpen ? (
                <IconChevronDown
                  onClick={() => combobox.openDropdown()}
                  size={"1.2rem"}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <IconChevronUp
                  onClick={() => combobox.closeDropdown()}
                  size={"1.2rem"}
                  style={{ cursor: "pointer" }}
                />
              )
            }
            value={"Sắp xếp :  " + label}
            onChange={() => {}}
            placeholder="Sắp xếp"
          />
        </Combobox.Target>

        <Combobox.Dropdown
          key={"locationD"}
          className="dropdowm-location"
          mt={"sm"}
          style={{ overflow: "hidden" }}
        >
          <Combobox.Options>
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Flex>
  );
}
