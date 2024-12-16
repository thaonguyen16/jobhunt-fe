import { Combobox, Input, Pill, PillsInput, useCombobox } from "@mantine/core";
import { useEffect, useState } from "react";
import fetchLocations from "@services/locationService";
import { Location } from "@data/interface/location";

export default function ComboBoxLocation({resetFilter,location}:{resetFilter: boolean,location: (data: string[]) => void}) {
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      location(value);
    },
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });
  const [value, setValue] = useState<string[]>(["Tất cả Tỉnh / TP"]);
  const [locationData, setLocationData] = useState<Location[]>([])
  const handleValueSelect = (val: string) =>
 {
  if(val == "Tất cả Tỉnh / TP") {
   setValue(["Tất cả Tỉnh / TP"]);
  }
  else {

    setValue((current) =>
    (
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current.filter((e) => e !== "Tất cả Tỉnh / TP"), val]
      )
    );
  } 
  }

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));
  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  useEffect(() => {
    const fetchDataLocation = async() => {
      await fetchLocations().then((data) => {
        if(data) {
          setLocationData(data);
        }
      })
    }
    fetchDataLocation();
  },[]);
  const options = locationData.filter((item) => !value.includes(item.name)).map(
    (item) => (
      <Combobox.Option
        
        value={item.name}
        key={item.name}
        active={value.includes(item.name)}
      >
        {item.name}
      </Combobox.Option>
    )
  );

  useEffect(() => {
    setValue(["Tất cả Tỉnh / TP"]);
  },[resetFilter])

  useEffect(() => {
    if(value.length == 0) {
      setValue(["Tất cả Tỉnh / TP"])
    }
  },[value])

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={handleValueSelect}
      withinPortal={false}
      size="sm"
    >
      <Combobox.DropdownTarget>
        <PillsInput
          size="sm"
          color="rgba(120,120,120,1)"
          fw={500}
          pointer
          onClick={() => combobox.toggleDropdown()}
          mt={"10px"}
        >
          <Pill.Group style={{}}>
            {values.length > 0 ? (
              values
            ) : (

            
              <Input.Placeholder>Thêm tỉnh / Thành phố</Input.Placeholder>
            )}

            <Combobox.EventsTarget>
              <PillsInput.Field size={20}
              color="rgba(120,120,120,1)"
                type="hidden"
                onBlur={() => combobox.closeDropdown()}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown
        mah={"300px"}
        style={{
          overflow: "auto",
        }}
      >
        <Combobox.Options>
          {options.length === 0 ? (
            <Combobox.Empty>Tất cả các lựa chọn</Combobox.Empty>
          ) : (
            options
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
