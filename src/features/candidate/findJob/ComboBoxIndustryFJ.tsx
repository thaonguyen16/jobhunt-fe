/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Checkbox,
  CloseButton,
  Text,
  Combobox,
  Flex,
  InputBase,
  Stack,
  useCombobox,
} from "@mantine/core";
import { useEffect, useState } from "react";
import "./combobox-fj.scss";
import {
  IconBaselineDensityMedium,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { Industry } from "@data/interface/industry";
import { fetchIndustriesWithSub } from "@services/industryService";

type ComboBoxIndustryFJProps = {
  selectedIndustry: string[];
  setSelectedIndustry: (selectedIndustry: any) => void;
  selectedSubIndustry: string[];
  setSelectedSubIndustry: (selectedSubIndustry: any) => void;
};

export default function ComboBoxIndustryFJ(props: ComboBoxIndustryFJProps) {
  const {
    selectedIndustry,
    setSelectedIndustry,
    selectedSubIndustry,
    setSelectedSubIndustry,
  } = props;

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      setIsOpen(false);
    },
    onDropdownOpen: () => {
      setIsOpen(true);
    },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [industriesData, setIndustriesData] = useState<Industry[]>([]);
  const [subIndustriesData, setSubIndustriesData] = useState<Industry[]>([]);

  useEffect(() => {
    const fetchFilterData = async () => {
      await fetchIndustriesWithSub().then((data) => {
        if (data) {
          setIndustriesData(data);
        }
      });
    };

    fetchFilterData();
  }, []);

  useEffect(() => {
    const data: Industry[] = [];

    selectedIndustry.forEach((d) => {
      data.push(industriesData.filter((e) => d == e.id.toString())[0]);
    });

    setSubIndustriesData(data);
  }, [selectedIndustry, industriesData]);

  const optionsIndustry = industriesData.map((item) => (
    <Combobox.Option value={item.id.toString()} key={item.id} w={"18rem"}>
      <Flex gap={"md"} direction={"row"} wrap={"nowrap"} key={item.name}>
        <Checkbox
          variant="outline"
          color="teal"
          checked={selectedIndustry.includes(item.id.toString())}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: "none" }}
        />
        {industriesData.length == 0 ? (
          <Combobox.Empty>Không có dữ liệu</Combobox.Empty>
        ) : (
          <span>{item.name}</span>
        )}
      </Flex>
    </Combobox.Option>
  ));

  const subIndustryOption = subIndustriesData?.map((item) => (
    <Stack w={"100%"} m={"0"} p={"0"} pl={"10px"} key={item?.id.toString()}>
      <Stack mb={"sm"} w={"100%"}>
        <Text w={"100%"} ta={"start"} fw={700} c={"blue"} size="1rem">
          {item?.name}
        </Text>
        {item?.subIndustry.map((sub) => (
          <Flex direction={"row"} wrap={"wrap"} w={"100%"} key={sub.name}>
            <Checkbox
              variant="outline"
              color="teal"
              radius={"2rem"}
              label={sub.name}
              checked={selectedSubIndustry.includes(sub.id.toString())}
              onChange={() => {
                if (selectedSubIndustry.includes(sub.id.toString())) {
                  setSelectedSubIndustry((selectedSubIndustry) =>
                    selectedSubIndustry.filter((e) => e !== sub.id.toString())
                  );
                } else {
                  setSelectedSubIndustry((selectedSubIndustry) => [
                    ...selectedSubIndustry,
                    sub.id.toString(),
                  ]);
                }
              }}
              style={{ cursor: "pointer" }}
            />
          </Flex>
        ))}
      </Stack>
    </Stack>
  ));

  return (
    <Flex
      className="combox-location"
      direction={"row"}
      justify={"center"}
      align={"center"}
      style={{ borderRadius: "10px" }}
    >
      <Combobox
        transitionProps={{ duration: 500, transition: "skew-down" }}
        key={"industry"}
        zIndex={100}
        store={combobox}
        width={selectedIndustry.length !== 0 ? "35rem" : "20rem"}
        position="bottom-start"
        withinPortal={true}
        positionDependencies={[selectedIndustry]}
        onOptionSubmit={(val) => {
          setSelectedIndustry((current) =>
            current.includes(val)
              ? current.filter((item) => item !== val)
              : [...current, val]
          );
        }}
      >
        <Combobox.Target>
          <InputBase
            variant="transparent"
            w={"100%"}
            pointer
            leftSection={<IconBaselineDensityMedium size={"1.2rem"} />}
            rightSection={
              selectedIndustry.length > 0 ? (
                <CloseButton
                  size="sm"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => setSelectedIndustry([])}
                  aria-label="Clear value"
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
            value={
              selectedIndustry.length > 0
                ? selectedIndustry.length + " lĩnh vực"
                : ""
            }
            onChange={() => {}}
            placeholder={"Ngành nghề"}
          />
        </Combobox.Target>

        <Combobox.Dropdown key={"locationD"} className="dropdowm-location">
          {industriesData.length != 0 ? (
            <Flex direction={"row"} w={"100%"}>
              {industriesData.length != 0 && (
                <Combobox.Options
                  style={{
                    borderRight: "1px solid rgba(120,120,120,.1)",
                  }}
                >
                  <Combobox.Header>
                    <Text fw={700} size="md">
                      Danh mục lĩnh vực
                    </Text>
                  </Combobox.Header>
                  {optionsIndustry}
                </Combobox.Options>
              )}

              {selectedIndustry.length != 0 && (
                <Stack>
                  <Text w={"100%"} ta={"start"} fw={700} size="md">
                    Nhóm ngành nghề
                  </Text>
                  {subIndustryOption}
                </Stack>
              )}
            </Flex>
          ) : (
            <Combobox.Empty>Không tìm thấy</Combobox.Empty>
          )}
        </Combobox.Dropdown>
      </Combobox>
    </Flex>
  );
}
