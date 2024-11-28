/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionIcon, Button, Combobox,Flex,Group,Radio,RangeSlider,rem,Text, useCombobox } from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconMoneybag, IconPointFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { SalaryData } from "../../../../data/constants/SalaryData"
import { decorSalary } from "@utils/regular";

export default function ComboBoxSalaryFJ({getMobile,resetFilter,salary} : {salary: (min: number, max: number) => void; getMobile: boolean ; resetFilter: boolean}) {

  const [selectedSalary, setSelectedSalary] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<[number, number]>([10, 30]);

  const marks = [
    { value: 10, label: '10 triệu' },
    { value: 50, label: '50 triệu' },
    { value: 100, label: '100 triệu' },
  ];

    const combobox = useCombobox({
      onDropdownClose: () => {
        combobox.resetSelectedOption();
        setIsOpen(false);
      },
      onDropdownOpen: () => {
        setIsOpen(true);
      }
    });

    useEffect(() => {
      setSelectedSalary("");
    },[resetFilter])

      const optionsSal = SalaryData.map((item) => (
        <Combobox.Option value={decorSalary(item.min , item.max)} key={item.id + "S"} onClick={() => {
          salary(item.min, item.max);
        }}>
          <Group gap="sm">
            <Radio
              variant="outline"
              color="teal"
              className="checkbox-styles"
              checked={selectedSalary == decorSalary(item.min , item.max)}
              onChange={() => {}}
              aria-hidden
              tabIndex={-1}
              style={{ pointerEvents: "none" }}
            />
            <span>{decorSalary(item.min , item.max)}</span>
          </Group>
        </Combobox.Option>
      ));


      return (<Combobox
        key={"Exp"}
        transitionProps={{ duration: 500, transition: "slide-down" }}
        store={combobox}
        width={300}
        position="top"
        withinPortal={false}
        positionDependencies={[]}
        onOptionSubmit={(val) => {
          setSelectedSalary(val);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <Flex
          bd={selectedSalary.length == 0 ? "0.5px solid gray" : "0.5px solid teal"}
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
            <Group h={"100%"} m={0} p={0}>
            <IconMoneybag size={20} color="rgb(120,120,120)" stroke={1}/>
            <Text
            fw={500}
            lineClamp={1}
            size="14px"
            h={"46%"}
            
            c={"rgba(0,0,0,.6)"}
            >
              {selectedSalary.length !== 0
                ? selectedSalary
                : "Mức lương"}

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
          key={"locationD"}
          mah={"25rem"}
          style={{
            overflow: "auto",
            overflowX: "hidden"
          }}
        >
          <Combobox.Options>
            <Combobox.Header>
              <Text fw={700} size="sm">
               Mức lương công việc
              </Text>
            </Combobox.Header>
            <Flex direction={"column"} w={"100%"} justify={"center"} align={"center"}>
            <RangeSlider w={"80%"}
        mt={"xs"}
        mb={"xl"}
        min={0}
        max={100}
        step={5}
        styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
        color="green"
        showLabelOnHover
        defaultValue={[0, 20]}
        thumbSize={18}
        thumbChildren={[<IconPointFilled size="1rem" key="1" />, <IconPointFilled size="1rem" key="2" />]}
        marks = {marks}
        value={value} 
        onChange={setValue}
      />
      <Button variant="light" w={"80%"} mb={"1rem"} onClick={() => {
        combobox.closeDropdown();
        setSelectedSalary(decorSalary(value[0]*1000000,value[1]*1000000));
        salary(value[0]*1000000,value[1]*1000000);
      }}>
        Áp dụng
        
      </Button>
            </Flex>
            {optionsSal}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>);
}