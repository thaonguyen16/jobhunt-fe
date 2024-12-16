import { DegreeData } from "@data/constants/DegreeData";
import { ActionIcon, Combobox,Flex,Group,Radio,Text, useCombobox } from "@mantine/core";
import { IconCertificate, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ComboBoxDegreeFJ({getMobile,resetFilter,degree} : {getMobile: boolean,resetFilter: boolean, degree: (data: string) => void}) {

  const [selectedDe, setSelectedDe] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    setSelectedDe("");
  },[resetFilter])

    const combobox = useCombobox({
        onDropdownClose: () => {
          combobox.resetSelectedOption();
          setIsOpen(false);
        },
        onDropdownOpen: () => {
          setIsOpen(true);
        }
      });

    const optionsLocation = DegreeData.map((item) => (
        <Combobox.Option value={item.name} key={item.name}>
          <Group gap="sm">
            <Radio
              variant="outline"
              color="teal"
              className="checkbox-styles"
              checked={selectedDe.includes(item.name)}
              onChange={() => {}}
              aria-hidden
              tabIndex={-1}
              style={{ pointerEvents: "none" }}
            />
            <span>{item.name}</span>
          </Group>
        </Combobox.Option>
      ));

      return (<Combobox
    
        key={"degreeFE"}
        transitionProps={{ duration: 500, transition: "slide-down" }}
        store={combobox}
        width={300}
        position="bottom-start"
        withinPortal={true}
        positionDependencies={[]}
        onOptionSubmit={(val) => {
          setSelectedDe(val);
          combobox.closeDropdown();
          degree(val)
        }}
      >
        <Combobox.Target>
          <Flex
          bd={selectedDe.length == 0 ? "0.5px solid gray" : "0.5px solid teal"}
            pl={"xs"}
            pr={"xs"}
            h={"2.1rem"}
            w={!getMobile ?  "100%" : "100%"}
            direction={"row"}
            wrap={"nowrap"}
            align={"center"}
            justify={"space-between"}
            gap={"xs"}
            bg={"rgba(200,200,200,.1)"}
            style={{ borderRadius: "7px" }}
          >
            <Group h={"100%"}>
            <IconCertificate size={20} color="rgb(120,120,120)" stroke={1} />
            <Text
            fw={500}
            lineClamp={1}
            size="14px"
            h={"46%"}
            
            c={"rgba(0,0,0,.6)"}
            >
              {selectedDe.length !== 0
                ? selectedDe
                : " Bằng cấp"}

            </Text>
            </Group>
            <ActionIcon
              size={"xs"}
              variant="filled"
              color="rgba(255,255,255)"
              radius="xs"
              style={{backgroundColor: "#ffffff" , 
                boxShadow:  "5px 5px 15px #e5e5e5,-5px -5px 15px #ffffff"}}
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
          key={"workModeFE"}
          mah={"25rem"}
          style={{
            overflow: "auto",
          }}
        >
          <Combobox.Options>
            <Combobox.Header>
              <Text fw={700} size="sm">
                Bằng cấp ứng viên
              </Text>
            </Combobox.Header>
            {optionsLocation}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>);
}