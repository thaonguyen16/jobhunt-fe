import {
  ActionIcon,
  Button,
  Combobox,
  Container,
  Flex,
  Group,
  Image,
  TextInput,
  useCombobox,
  Text,
  Checkbox,
  em,
  Stack,
  Loader,
  Center,
} from "@mantine/core";
import "../search.scss";
import {
  IconBriefcaseFilled,
  IconChevronDown,
  IconChevronUp,
  IconMapPinFilled,
  IconSearch,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { fetchIndustriesWithSub } from "@services/industryService";
import { Industry } from "@data/interface/industry";
import fetchLocations from "@services/locationService";
import { Location } from "@data/interface/location";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>("");
  const comboboxLocation = useCombobox({
    onDropdownClose: () => {
      comboboxLocation.resetSelectedOption();
      setLocationButton(false);
    },
  });
  const comboboxIndustry = useCombobox({
    onDropdownClose: () => {
      comboboxIndustry.resetSelectedOption();
      setIndustryButton(false);
    },
  });
  const [locationButton, setLocationButton] = useState(false);
  const [industryButton, setIndustryButton] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const [industriesData, setIndustriesData] = useState<Industry[]>([]);
  const [subIndustriesData, setSubIndustriesData] = useState<Industry[]>([]);
  const [locationData, setLocationsData] = useState<Location[]>([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilterData = async () => {
      await fetchIndustriesWithSub().then((data) => {
        if (data) {
          setIndustriesData(data);
        }
      });
    };
    const fectLocationDataD = async () => {
      await fetchLocations().then((lo) => {
        if (lo) {
          setLocationsData(lo);
        }
      });
    };
    if (isLoading) {
      fetchFilterData();
      fectLocationDataD();
      setLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    const data: Industry[] = [];

    selectedIndustry.forEach((d) => {
      data.push(industriesData.filter((e) => d === String(e.id))[0]);
    });

    setSubIndustriesData(data);
  }, [selectedIndustry, industriesData]);

  const optionsLocation = locationData.map((item) => (
    <Combobox.Option value={String(item.id)} key={String(item.id) + "L"}>
      <Group gap="sm">
        <Checkbox
          variant="outline"
          color="teal"
          className="checkbox-styles"
          checked={selectedLocation.includes(String(item.id))}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: "none" }}
        />
        <span>{item.name}</span>
      </Group>
    </Combobox.Option>
  ));

  const optionsIndustry = industriesData.map((item) => (
    <Combobox.Option
      value={String(item.id)}
      key={String(item.id) + "IN"}
      w={"18rem"}
    >
      <Flex gap={"md"} direction={"row"} wrap={"nowrap"}>
        <Checkbox
          variant="outline"
          color="teal"
          checked={selectedIndustry.includes(String(item.id))}
          onChange={() => {}}
          aria-hidden
          tabIndex={-1}
          style={{ pointerEvents: "none" }}
        />
        {industriesData.length == 0 ? (
          <Combobox.Empty>Nothing found</Combobox.Empty>
        ) : (
          <span>{item.name}</span>
        )}
      </Flex>
    </Combobox.Option>
  ));

  const subIndustryOption = subIndustriesData.map((item) => (
    <Stack w={"100%"} m={"0"} p={"0"} pl={"10px"}>
      <Stack mb={"sm"} w={"100%"}>
        <Text w={"100%"} ta={"start"} fw={700} c={"blue"} size="1rem">
          {item.name}
        </Text>
        {item.subIndustry.map((sub) => (
          <Flex direction={"row"} wrap={"wrap"} w={"100%"}>
            <Checkbox
              variant="outline"
              color="teal"
              radius={"2rem"}
              label={sub.name}
              checked={selectedSubIndustry.includes(String(sub.id))}
              onChange={() => {
                if (selectedSubIndustry.includes(String(sub.id))) {
                  setSelectedSubIndustry((selectedSubIndustry) =>
                    selectedSubIndustry.filter((e) => e !== String(sub.id))
                  );
                } else {
                  setSelectedSubIndustry((selectedSubIndustry) => [
                    ...selectedSubIndustry,
                    String(sub.id),
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

  const searchJobHandler = () => {
    const filterData = {
      locationIds: selectedLocation || [],
      industryIds: selectedIndustry || [],
      subIndustryIds: selectedSubIndustry || [],
      keyword: keyword,
    };
    navigate("/tim-cong-viec", { state: filterData });
  };

  const getLocationLabel = (data: string[]) => {
    const location = locationData.filter((e) => String(String(e.id)) === data[0])[0];
    return location.name.slice(0, 7) + ".. (+" + (data.length - 1) + ")";
  };

  const getIndustryLabel = (data: string[]) => {
    const industry = industriesData.filter(
      (e) => String(e.id) === data[0]
    )[0];
    return industry.name.slice(0, 7) + ".. (+" + (data.length - 1) + ")";
  };

  return (
    <>
      <Container
        maw={"1200px"}
        pos={"relative"}
        style={{ zIndex: 2 }}
        w={"100%"}
        className="search-root"
      >
        <Image
          pos={"absolute"}
          style={{ zIndex: 3 }}
          top={"-2.5rem"}
          left={"10%"}
          src={"src/assets/img/animal.png"}
          h={"5rem"}
          w={"5rem"}
        />
        <Flex
          direction={"row"}
          w={"80%"}
          wrap={"nowrap"}
          className="flex-container-main"
          justify={"space-between"}
          align={"center"}
          pl={"1rem"}
          pr={"1rem"}
          gap={"md"}
        >
          <IconSearch
            width={"5%"}
            size={"1.5rem"}
            stroke={2.5}
            color="#ffffff"
          />
          <TextInput
            autoFocus
            variant="transparent"
            c={"white"}
            onChange={(e) => setKeyword(e.currentTarget.value)}
            radius={"lg"}
            w={"40%"}
            placeholder="Tìm công việc"
          />

          {!isMobile && (
            <Flex
              direction={"row"}
              align={"center"}
              justify={"center"}
              gap={"md"}
            >
              {/* Select Location Item */}
              <Combobox
                zIndex={100}
                key={"location"}
                transitionProps={{ duration: 200, transition: "pop" }}
                store={comboboxLocation}
                width={300}
                position="bottom-start"
                withinPortal={false}
                positionDependencies={[selectedLocation]}
                onOptionSubmit={(val) => {
                  setSelectedLocation((current) =>
                    current.includes(val)
                      ? current.filter((item) => item !== val)
                      : [...current, val]
                  );
                }}
              >
                <Combobox.Target>
                  <Flex
                    pl={"xs"}
                    pr={"xs"}
                    h={"2.1rem"}
                    w={"10rem"}
                    direction={"row"}
                    align={"center"}
                    justify={"space-between"}
                    bg={"rgba(255,255,255,.3)"}
                    style={{ borderRadius: "2rem" }}
                  >
                    <IconMapPinFilled size={20} color="rgb(200,200,200)" />
                    <Text
                      p={"xs"}
                      pl={"xs"}
                      pr={"xs"}
                      w={"90%"}
                      lineClamp={1}
                      size="14px"
                      c={"white"}
                    >
                      {selectedLocation.length !== 0
                        ? getLocationLabel(selectedLocation)
                        : "Địa điểm"}
                    </Text>
                    <ActionIcon
                      w={"10%"}
                      size={"xs"}
                      variant="filled"
                      color="rgba(255,255,255,1)"
                      style={{ boxShadow: "2px 2px 10px white" }}
                      radius="xl"
                      onClick={() => {
                        setLocationButton(true);
                        comboboxLocation.toggleDropdown();
                      }}
                    >
                      {!locationButton && (
                        <IconChevronDown
                          color="black"
                          style={{ width: "90%", height: "90%" }}
                          stroke={2}
                        ></IconChevronDown>
                      )}
                      {locationButton && (
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
                    overflowY: locationData.length != 0 ? "scroll" : "hidden",
                  }}
                >
                  <Combobox.Options>
                    <Combobox.Header>
                      <Text fw={700} size="sm">
                        Tỉnh / Thành phố
                      </Text>
                    </Combobox.Header>
                    {optionsLocation}
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>
              {/* Select Industry Item */}
              <Combobox
                key={"industry"}
                zIndex={100}
                transitionProps={{ duration: 200, transition: "pop" }}
                store={comboboxIndustry}
                width={selectedIndustry.length != 0 ? "35rem" : "20rem"}
                position="bottom-start"
                withinPortal={true}
                positionDependencies={[selectedLocation]}
                onOptionSubmit={(val) => {
                  setSelectedIndustry((current) =>
                    current.includes(val)
                      ? current.filter((item) => item !== val)
                      : [...current, val]
                  );
                }}
              >
                <Combobox.Target>
                  <Flex
                    pl={"xs"}
                    pr={"xs"}
                    h={"2.1rem"}
                    w={"10rem"}
                    direction={"row"}
                    align={"center"}
                    justify={"space-between"}
                    bg={"rgba(255,255,255,.3)"}
                    style={{ borderRadius: "2rem" }}
                  >
                    <IconBriefcaseFilled size={20} color="rgb(200,200,200)" />
                    <Text
                      p={"xs"}
                      pl={"xs"}
                      pr={"xs"}
                      w={"90%"}
                      lineClamp={1}
                      size="14px"
                      c={"white"}
                    >
                      {selectedIndustry.length !== 0
                        ? getIndustryLabel(selectedIndustry)
                        : "Ngành nghề"}
                    </Text>
                    <ActionIcon
                      w={"10%"}
                      size={"xs"}
                      variant="filled"
                      color="rgba(255,255,255,1)"
                      style={{ boxShadow: "2px 2px 10px white" }}
                      radius="xl"
                      onClick={() => {
                        setIndustryButton(true);
                        comboboxIndustry.toggleDropdown();
                      }}
                    >
                      {!industryButton && (
                        <IconChevronDown
                          color="black"
                          style={{ width: "90%", height: "90%" }}
                          stroke={2}
                        ></IconChevronDown>
                      )}
                      {industryButton && (
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
                  key={"industryD"}
                  h={"25rem"}
                  style={{
                    overflowY: "scroll",
                  }}
                >
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
                    <Center w={"100%"} h={"100%"}>
                      <Loader color="teal" type="dots" />
                    </Center>
                  )}
                </Combobox.Dropdown>
              </Combobox>
            </Flex>
          )}
          <Button
            size="sm"
            h={"2.3rem"}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            onClick={searchJobHandler}
          >
            Tìm kiếm
          </Button>
        </Flex>
      </Container>
    </>
  );
}