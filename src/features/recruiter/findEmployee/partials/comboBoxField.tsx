import { Combobox, Flex,InputBase,Loader,ScrollArea,useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import { Industry } from "@data/interface/industry";
import { Option } from "@data/interface/option";

export default function ComboBoxField(
  {resetFilter,industryData,chooseSub,industry}:{industry: (data: string) => void, resetFilter: boolean, industryData: Industry[], chooseSub: (data: Option[]) => void},) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      if(search.length == 0 ) {
        setCount(0);
      }

      if(value == "Tất cả ngành nghề") {
        industry("");
        chooseSub([]);
      }
    },
  });

  const [value, setValue] = useState<string>("Tất cả ngành nghề");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const shouldFilterOptions = industryData.every((item) => item.name !== search);
  const filteredOptions = shouldFilterOptions
    ? industryData.filter((item) => item.name.toLowerCase().includes(search.toLowerCase().trim()))
    : industryData;


  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item.name} key={item.id + "F"}  style={{ fontSize: "13px" }} onClick={() => chooseSub(item.subIndustry)}>
      {item.name}
    </Combobox.Option>
  ));

  useEffect(() => {
    setValue("Tất cả ngành nghề");
    setSearch("");
    setCount(0);

    
  },[resetFilter])


  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        setSearch(val)
        combobox.closeDropdown();
        industry(val);    
      }}
    >
      <Combobox.Target>
        <InputBase
          value={search.length == 0 && count == 0 ? value : search}
          size="sm"
          mt={"10px"}
          pointer
         
          onClick={() =>{
            combobox.toggleDropdown();
            setCount(count + 1);
          }}
          onChange={(event) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(event.currentTarget.value);
            
          }}
        >
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
       {industryData.length != 0 ?  <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={200}>
          {options.length > 0 ? options : <Combobox.Empty>Không tìm thấy</Combobox.Empty>}
          </ScrollArea.Autosize>
        </Combobox.Options>: <Flex w={"100%"} h={"100%"} justify={"center"} align={"center"}>
          <Loader color="teal"type="dots" />
          </Flex>}
      </Combobox.Dropdown>
    </Combobox>
  );
}
