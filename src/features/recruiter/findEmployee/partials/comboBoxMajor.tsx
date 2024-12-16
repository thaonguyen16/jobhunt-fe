import { Combobox, Input,InputBase,ScrollArea,useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import { Option } from "@data/interface/option";

export default function ComboBoxMajor({subIndustryData,subIndustry}:{subIndustryData: Option[], subIndustry: (data: string)=> void;}) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      if(value == "Tất cả các lĩnh vực") {
        subIndustry(value);
      }
    },
  });

  const [value, setValue] = useState<string>("Tất cả các lĩnh vực");

  const options = subIndustryData.map((item) => (
    <Combobox.Option value={item.name} key={item.id + "M"}  style={{ fontSize: "13px" }}>
      {item.name}
    </Combobox.Option>
  ));

  useEffect(() => {
    if(subIndustryData.length == 0) {
      setValue("Tất cả các lĩnh vực");
    }
  },[subIndustryData])

  return (
    <Combobox
    disabled={subIndustryData.length == 0
    }
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
        subIndustry(val);
      }}
    >
      <Combobox.Target>
        <InputBase
        disabled = {subIndustryData.length == 0
        }
          component="button"
          type="button"
          size="sm"
          mt={"10px"}
          pointer
          
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick value</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <ScrollArea.Autosize type="scroll" mah={200}>
            {options}
          </ScrollArea.Autosize>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
