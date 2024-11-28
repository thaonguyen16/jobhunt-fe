import {
  Checkbox,
  CloseButton,
  Combobox,
  Text,
  Flex,
  Group,
  InputBase,
  useCombobox,
} from "@mantine/core";
import { useEffect, useState } from "react";
import "./combobox-fj.scss";
import {
  IconChevronDown,
  IconChevronUp,
  IconLocation,
} from "@tabler/icons-react";
import fetchLocations from "@services/locationService";
import { Location } from "@data/interface/location";

type ComboBoxGeneralProps = {
  value: string[];
  setValue: (value: any) => void;
};

export default function ComboBoxGeneral(props: ComboBoxGeneralProps) {
  const { value, setValue } = props;
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setIsOpen(false);
    },
    onDropdownOpen: () => {
      setIsOpen(true);
    },
  });

  const [search, setSearch] = useState("");
  const [locationData, setLocationsData] = useState<Location[]>([]);
  const [placholder, setPlaceholder] = useState("Nơi làm việc");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fectLocationDataD = async () => {
      await fetchLocations().then((lo) => {
        if (lo) {
          setLocationsData(lo);
        }
      });
    };
    fectLocationDataD();
  }, []);

  useEffect(() => {
    if (value.length == 0) {
      setPlaceholder("Nơi làm việc");
    } else {
      setPlaceholder("");
    }
  }, [value]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const options = locationData
    .filter((item) =>
      item.name.toLowerCase().includes(search.trim().toLowerCase())
    )
    .map((item) => (
      <Combobox.Option value={item.id.toString()} key={item.id}>
        <Group gap="sm">
          <Checkbox
            variant="outline"
            color="teal"
            className="checkbox-styles"
            checked={value.includes(item.id.toString())}
            onChange={() => {}}
            aria-hidden
            tabIndex={-1}
            style={{ pointerEvents: "none" }}
          />
          <span>{item.name}</span>
        </Group>
      </Combobox.Option>
    ));

  const getText = (data: string[]) => {
    if (
      !data ||
      data.length === 0 ||
      !locationData ||
      locationData.length === 0
    ) {
      return ""; // Handle cases where data or locationData is unavailable
    }

    const itemId = value?.find((e) => e === data[0]); // Use `find` instead of `filter` for efficiency

    if (!itemId) {
      return ""; // Handle cases where the itemId is not found
    }

    const item = locationData.find((e) => e.id.toString() === itemId); // Use `find` for efficiency

    if (!item) {
      return ""; // Handle cases where the item is not found
    }

    return item.name.slice(0, 7) + ".. (+" + (data.length - 1) + ")";
  };

  return (
    <Flex
      className="combox-location"
      direction={"row"}
      justify={"center"}
      align={"center"}
    >
      <Combobox
        transitionProps={{ duration: 500, transition: "skew-down" }}
        position="bottom"
        width={300}
        store={combobox}
        withinPortal={true}
        positionDependencies={[setValue]}
        onOptionSubmit={(val) => {
          handleValueSelect(val);
          setSearch("");
        }}
      >
        <Combobox.Target>
          <Flex
            direction={"row"}
            align={"center"}
            justify={"space-between"}
            wrap={"nowrap"}
            pl={"xs"}
            pr={"xs"}
          >
            <IconLocation size={"1.2rem"} color="gray" />
            <Text lineClamp={1} c={"gray"}>
              {getText(value)}
            </Text>
            <InputBase
              w={value.length > 0 ? "40%" : "100%"}
              variant="transparent"
              pointer
              value={search}
              rightSection={
                value.length > 0 ? (
                  <CloseButton
                    size="sm"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setValue([])}
                    aria-label="Xóa chọn"
                  />
                ) : !isOpen ? (
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
              onClick={() => combobox.toggleDropdown()}
              rightSectionPointerEvents={"auto"}
              onChange={(event) => {
                combobox.updateSelectedOptionIndex();
                setSearch(event.currentTarget.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Backspace" && search.length === 0) {
                  event.preventDefault();
                  handleValueRemove(value[value.length - 1]);
                }
              }}
              placeholder={placholder}
            />
          </Flex>
        </Combobox.Target>

        <Combobox.Dropdown key={"locationFJ"} className="dropdowm-location">
          <Combobox.Options>
            {options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Không tìm thấy</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Flex>
  );
}
