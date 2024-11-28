/* eslint-disable @typescript-eslint/no-unused-vars */
import FormContainer from "@components/form/FormUI/FormContainer";
import { PostResponse } from "@data/interface";
import { IJobDemand, JobDemandData } from "@data/interface/cv";
import {
  Button,
  Collapse,
  Center,
  Combobox,
  Container,
  Flex,
  Text,
  InputBase,
  Loader,
  Overlay,
  Stack,
  TextInput,
  useCombobox,
  Input,
  Checkbox,
  NumberInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import fetchLocations from "@services/locationService";
import {
  fetchJobDemandCandidate,
  sendCreateJobDemandCandidateRequest,
  sendUpdateJobDemandCandidateRequest,
} from "@services/userService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Location } from "@data/interface/location";
import {
  IconAlertTriangleFilled,
  IconChevronDown,
  IconChevronUp,
  IconPencil,
} from "@tabler/icons-react";
import { Industry } from "@data/interface/industry";
import { Option } from "@data/interface/option";
import { fetchIndustriesWithSub } from "@services/industryService";
import { ExperienceData } from "@data/constants/ExperienceData";
import "./job-demand.scss";
import { DegreeData } from "@data/constants/DegreeData";
import { fetchWorkModes } from "@services/workModeService";

export default function JobDemand() {
  const [jobDemand, setJobDemand] = useState<JobDemandData | null>(null);
  const [isloading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Option | null>(null);
  const [searchLocation, SetSearchLocation] = useState<string>("");
  const [selectedIndustry, setSelectedIndustry] = useState<Option | null>(null);
  const [searchIndustry, SetSearchIndustry] = useState<string>("");
  const [selectedSubIndustry, setSelectedSubIndustry] = useState<Option | null>(
    null
  );
  const [searchSubIndustry, SetSearchSubIndustry] = useState<string>("");
  const [selectedExp, setSelectedExp] = useState<
    { id: number; value: number; name: string } | undefined
  >(undefined);
  const [selectedDegree, setSelectedDegree] = useState<string | null>(null);
  const [selectLocationCheckbox, setSelectedLocationCheckbox] = useState(false);

  const [isCreate, setCreate] = useState(true);
  const [count, setCount] = useState(0);
  const [salary, setSalary] = useState<number | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IJobDemand>({ mode: "onChange", shouldFocusError: true });

  const query = useQuery({
    queryKey: ["job-demand"],
    queryFn: () => fetchJobDemandCandidate(),
    staleTime: Infinity,
  });

  const queryLocation = useQuery({
    queryKey: ["job-demand-location"],
    queryFn: () => fetchLocations(),
    staleTime: Infinity,
  });
  
  const queryIndustry = useQuery({
    queryKey: ["job-demand-industry"],
    queryFn: () => fetchIndustriesWithSub(),
    staleTime: Infinity,
  });

  const queryWorkMode = useQuery({
    queryKey: ["job-demand-work-mode"],
    queryFn: () => fetchWorkModes(),
    staleTime: Infinity,
  });

  const createMutation = useMutation<PostResponse, Error, IJobDemand>({
    mutationFn: sendCreateJobDemandCandidateRequest,
    onSuccess: () => {
      query.refetch();
      setLoading(false);
      setIsUpdate(false);
      notifications.show({
        title: "Cập nhật thông tin",
        message: "Cập nhật thông tin thành công",
        color: "green",
      });
    },
    onError: (error) => {
      setLoading(false);
      notifications.show({
        title: "Cập nhật thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const updateMutation = useMutation<PostResponse, Error, IJobDemand>({
    mutationFn: sendUpdateJobDemandCandidateRequest,
    onSuccess: () => {
      setLoading(false);
      setIsUpdate(false);
      notifications.show({
        title: "Cập nhật thông tin",
        message: "Cập nhật thông tin thành công",
        color: "green",
      });
    },
    onError: (error) => {
      setLoading(false);
      notifications.show({
        title: "Cập nhật thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const onSubmitUpdate: SubmitHandler<IJobDemand> = (data) => {
    let validate = true;

    if (selectedIndustry) {
      data.industry = selectedIndustry.id;
    } else {
      validate = false;
    }
    if (selectedLocation) {
      data.location = selectedLocation.id;
    } else {
      validate = false;
    }
    if (selectedSubIndustry) {
      data.subIndustry = selectedSubIndustry.id;
    } else {
      validate = false;
    }
    if (selectedDegree) {
      data.degree = selectedDegree;
    } else {
      validate = false;
    }
    if (selectedExp) {
      data.experience = selectedExp.value;
    } else {
      validate = false;
    }
    if (salary) {
      data.salary = salary;
    } else {
      validate = false;
    }
    if (selectedWorkMode) {
      data.workMode = selectedWorkMode.id;
    } else {
      validate = false;
    }
    data.changeLocation = selectLocationCheckbox;

    if (validate == false) {
      notifications.show({
        autoClose: 20000,
        title: "Nhu cầu công việc",
        message: "Không bỏ trống các trường bắt buộc",
        color: "orange",
        icon: <IconAlertTriangleFilled color="yellow" />,
      });
    } else {
      setLoading(true);
      updateMutation.mutate(data);
    }
  };
  const onSubmitCreate: SubmitHandler<IJobDemand> = (data) => {
    let validate = true;

    if (selectedIndustry) {
      data.industry = selectedIndustry.id;
    } else {
      validate = false;
    }
    if (selectedLocation) {
      data.location = selectedLocation.id;
    } else {
      validate = false;
    }
    if (selectedSubIndustry) {
      data.subIndustry = selectedSubIndustry.id;
    } else {
      validate = false;
    }
    if (selectedDegree) {
      data.degree = selectedDegree;
    } else {
      validate = false;
    }
    if (selectedExp) {
      data.experience = selectedExp.value;
    } else {
      validate = false;
    }
    if (salary) {
      data.salary = salary;
    } else {
      validate = false;
    }
    if (selectedWorkMode) {
      data.workMode = selectedWorkMode.id;
    } else {
      validate = false;
    }
    data.changeLocation = selectLocationCheckbox;

    if (validate == false) {
      notifications.show({
        title: "Nhu cầu công việc",
        message: "Không bỏ trống các trường bắt buộc",
        color: "yellow",
        icon: <IconAlertTriangleFilled color="yellow" />,
      });
    } else {
      setLoading(true);
      createMutation.mutate(data);
    }
  };

  const [locationsData, setLocationsData] = useState<Location[]>([]);
  const [industryData, SetIndustryData] = useState<Industry[]>([]);
  const [subIndustryData, setSubIndustryData] = useState<Option[]>([]);
  const [workModeData, setWorkModeData] = useState<Option[]>([]);
  const [selectedWorkMode, setSelectedWorkMode] = useState<Option | null>(null);

  useEffect(() => {
    if (query.data) {
      if (query.data.data) {
        if (query.data.data.salary) {
          if (query.data.data.salary != -1) {
            setJobDemand(query.data.data);
            setCreate(false);
            if (jobDemand) {
              setSelectedLocation(jobDemand.location);
              SetSearchLocation(jobDemand.location.name);
              setSelectedIndustry(jobDemand.industry);
              SetSearchIndustry(jobDemand.industry.name);
              setSelectedSubIndustry(jobDemand.subIndustry);
              SetSearchSubIndustry(jobDemand.subIndustry.name);
              setSelectedWorkMode(jobDemand.workMode);
              setSelectedExp(
                ExperienceData.filter(
                  (e) => e.value === jobDemand.experience
                )[0]
              );
              jobDemand &&
                setSelectedDegree(
                  DegreeData.filter((e) => e.name === jobDemand.degree)[0].name
                );
              setValue("workTitle", jobDemand.workTitle);
              setSalary(jobDemand.salary);
            }
          }
        }

        console.log(jobDemand);
      }
    }
  }, [query.data, setValue, jobDemand]);

  useEffect(() => {
    if (queryLocation.data) {
      setLocationsData(queryLocation.data);
    }
  }, [queryLocation.data]);

  useEffect(() => {
    if (queryIndustry.data) {
      SetIndustryData(queryIndustry.data);
    }
  }, [queryIndustry.data]);

  useEffect(() => {
    if (queryWorkMode.data) {
      setWorkModeData(queryWorkMode.data);
    }
  }, [queryWorkMode.data]);

  useEffect(() => {
    if (queryIndustry.data) {
      if (query.data.data) {
        if (
          queryIndustry.data.filter((e) => e.id == query.data.data.industry.id)
            .length != 0
        )
          setSubIndustryData(
            queryIndustry.data.filter(
              (e) => e.id == query.data.data.industry.id
            )[0].subIndustry
          );
      }
    }
  }, [queryIndustry.data, query.data]);

  //Work Mode
  const comboboxWM = useCombobox({
    onDropdownClose: () => comboboxWM.resetSelectedOption(),
  });

  const optionsWM = workModeData.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.name}
      onClick={() => setSelectedWorkMode({ id: item.id, name: item.name })}
    >
      {item.name}
    </Combobox.Option>
  ));

  //Exp
  const comboboxExp = useCombobox({
    onDropdownClose: () => comboboxExp.resetSelectedOption(),
  });

  const optionsExp = ExperienceData.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.name}
      onClick={() =>
        setSelectedExp({ id: item.id, value: item.value, name: item.name })
      }
    >
      {item.name}
    </Combobox.Option>
  ));

  //Degree
  const comboboxDegree = useCombobox({
    onDropdownClose: () => comboboxDegree.resetSelectedOption(),
  });

  const optionsDe = DegreeData.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.name}
      onClick={() => setSelectedDegree(item.name)}
    >
      {item.name}
    </Combobox.Option>
  ));

  //Location

  const comboboxLocation = useCombobox({
    onDropdownClose: () => comboboxLocation.resetSelectedOption(),
  });

  const shouldFilterOptionsLocation = locationsData.every(
    (item) => item.name !== searchLocation
  );
  const filteredOptions = shouldFilterOptionsLocation
    ? locationsData.filter((item) =>
        item.name.toLowerCase().includes(searchLocation.toLowerCase().trim())
      )
    : locationsData;

  const optionsLocation = filteredOptions.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.name}
      onClick={() => setSelectedLocation(item)}
    >
      {item.name}
    </Combobox.Option>
  ));

  //Industry

  const comboboxIndustry = useCombobox({
    onDropdownClose: () => comboboxIndustry.resetSelectedOption(),
  });

  const shouldFilterOptionsIndustry = industryData.every(
    (item) => item.name !== searchIndustry
  );
  const filteredOptionsIndustry = shouldFilterOptionsIndustry
    ? industryData.filter((item) =>
        item.name.toLowerCase().includes(searchIndustry.toLowerCase().trim())
      )
    : industryData;

  const optionsIndustry = filteredOptionsIndustry.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.name}
      onClick={() => {
        setSelectedIndustry({ id: item.id, name: item.name });
        setSubIndustryData(item.subIndustry);
        SetSearchSubIndustry("");
      }}
    >
      {item.name}
    </Combobox.Option>
  ));

  //SubIndustry

  const comboboxSubIndustry = useCombobox({
    onDropdownClose: () => comboboxSubIndustry.resetSelectedOption(),
  });

  const shouldFilterOptionsSubIndustry = subIndustryData.every(
    (item) => item.name !== searchSubIndustry
  );
  const filteredOptionsSubIndustry = shouldFilterOptionsSubIndustry
    ? subIndustryData.filter((item) =>
        item.name.toLowerCase().includes(searchSubIndustry.toLowerCase().trim())
      )
    : subIndustryData;

  const optionsSubIndustry = filteredOptionsSubIndustry.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.name}
      onClick={() => setSelectedSubIndustry(item)}
    >
      {item.name}
    </Combobox.Option>
  ));

  return (
    <>
      {(isloading ||
        query.isLoading ||
        queryIndustry.isLoading ||
        queryLocation.isLoading ||
        queryWorkMode.isLoading ||
        query.isFetching) && (
        <Overlay w="100%" h="100%" pos="fixed" blur={2}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>
      )}
      <Container
        maw={"2000px"}
        w={"95%"}
        className="job-demand"
        bg={"rgba(255,255,255,.5"}
        h={"fit-content"}
        pt={"20px"}
        pb={"sm"}
        mt={"2rem"}
        pl={"10%"}
        pr={"10%"}
        style={{
          borderRadius: "7px",
        }}
      >
        <Stack w={"100%"} align="center" gap={0} mb={"1rem"}>
          <Text fw={500} size="lg">
            Mô tả nhu cầu tìm việc hiện tại của bạn
          </Text>
          <Text ta={"center"}>
            Cung cấp trải nghiệm cá nhân hóa, giúp nhà tuyển dụng tìm đến bạn
            nhanh chóng dựa trên nhu cầu công việc của bạn
          </Text>
        </Stack>

        {jobDemand && (
          <FormContainer onSubmit={handleSubmit(onSubmitUpdate)}>
            {!isUpdate && (
              <Flex align={"center"} gap={"lg"} w={"100%"} justify={"flex-end"}>
                <Button
                  mt="20px"
                  type="reset"
                  variant="light"
                  size="sm"
                  leftSection={<IconPencil stroke={1} />}
                  onClick={() => {
                    setIsUpdate(true);
                  }}
                >
                  Cập nhật
                </Button>
              </Flex>
            )}
            <Flex w={"100%"} gap={"lg"}>
              <Stack w={"90%"} gap={"md"} align="stretch" justify="flex-start">
                <TextInput
                  className="input"
                  disabled={!isUpdate}
                  withAsterisk
                  defaultValue={jobDemand.workTitle}
                  label="Vị trí chuyên môn"
                  placeholder="Ex. Biên dịch viên Hán ngữ"
                  {...register("workTitle", {
                    required: {
                      value: true,
                      message: "Vị trí chuyên môn là bắt buộc",
                    },
                    pattern: {
                      value: /^[\p{L}\s]+$/u,
                      message: "Vị trí chuyên môn không hợp lệ",
                    },
                    maxLength: {
                      value: 100,
                      message: "Vị trí chuyên môn không quá 100 ký tự",
                    },
                  })}
                  error={
                    errors.workTitle && <span>{errors.workTitle.message}</span>
                  }
                />
                <NumberInput
                  withAsterisk
                  value={salary}
                  defaultValue={jobDemand.salary}
                  disabled={!isUpdate}
                  min={0}
                  max={9999999999}
                  thousandSeparator=","
                  label="Mức lương mong muốn"
                  placeholder="Ex. 10.000.000"
                  rightSection={<Text size="sm">VND / tháng</Text>}
                  onChange={(value) => {
                    setSalary(Number(value));
                  }}
                />

                {/* Work Mode Combobox */}
                <Combobox
                  store={comboboxWM}
                  withinPortal={false}
                  onOptionSubmit={() => {
                    comboboxWM.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <Flex direction={"column"}>
                      <Text size="sm" fw={500}>
                        Hình thức làm việc{" "}
                        <Text component="span" c="red">
                          *
                        </Text>
                      </Text>

                      <InputBase
                        disabled={!isUpdate}
                        component="button"
                        type="button"
                        pointer
                        rightSection={
                          comboboxWM.dropdownOpened === true ? (
                            <IconChevronUp
                              size={20}
                              stroke={1}
                              onClick={() => comboboxWM.closeDropdown()}
                            />
                          ) : (
                            <IconChevronDown
                              size={20}
                              stroke={1}
                              onClick={() => comboboxWM.openDropdown()}
                            />
                          )
                        }
                        onClick={() => comboboxWM.toggleDropdown()}
                        rightSectionPointerEvents="auto"
                      >
                        {!selectedWorkMode && (
                          <Input.Placeholder>
                            Ex. Toàn thời gian
                          </Input.Placeholder>
                        )}
                        {selectedWorkMode && selectedWorkMode.name}
                      </InputBase>
                    </Flex>
                  </Combobox.Target>

                  <Combobox.Dropdown className="dropdown">
                    <Combobox.Options>{optionsWM}</Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>

                {/* Location Combobox */}
                <Combobox
                  store={comboboxLocation}
                  width={500}
                  withinPortal={false}
                  onOptionSubmit={(val) => {
                    SetSearchLocation(val);
                    comboboxLocation.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <Flex direction={"column"}>
                      <Text size="sm" fw={500}>
                        Nơi làm việc{" "}
                        <Text component="span" c="red">
                          *
                        </Text>
                      </Text>
                      <InputBase
                        disabled={!isUpdate}
                        withAsterisk
                        rightSection={
                          comboboxLocation.dropdownOpened === true ? (
                            <IconChevronUp
                              stroke={1}
                              size={20}
                              onClick={() => comboboxLocation.closeDropdown()}
                            />
                          ) : (
                            <IconChevronDown
                              stroke={1}
                              size={20}
                              onClick={() => comboboxLocation.openDropdown()}
                            />
                          )
                        }
                        value={searchLocation}
                        onChange={(event) => {
                          comboboxLocation.openDropdown();
                          comboboxLocation.updateSelectedOptionIndex();
                          SetSearchLocation(event.currentTarget.value);
                        }}
                        onClick={() => comboboxLocation.openDropdown()}
                        onFocus={() => comboboxLocation.openDropdown()}
                        onBlur={() => {
                          comboboxLocation.closeDropdown();
                          if (selectedLocation)
                            SetSearchLocation(selectedLocation.name || "");
                        }}
                        placeholder="Ex. Hồ Chí Minh"
                        rightSectionPointerEvents="auto"
                      />
                      <Checkbox
                        disabled={!isUpdate}
                        mt={"sm"}
                        size="xs"
                        variant="outline"
                        color="teal"
                        checked={selectLocationCheckbox}
                        onChange={(event) =>
                          setSelectedLocationCheckbox(
                            event.currentTarget.checked
                          )
                        }
                        label={
                          <Text c={"gray"} size="xs">
                            Sẵn sàng thay đổi nơi làm việc theo yêu cầu
                          </Text>
                        }
                      />
                    </Flex>
                  </Combobox.Target>

                  <Combobox.Dropdown className="dropdown">
                    <Combobox.Options>
                      {optionsLocation.length > 0 ? (
                        optionsLocation
                      ) : (
                        <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                      )}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </Stack>
              <Stack w={"90%"} gap={"md"} align="stretch" justify="flex-start">
                {/* Industry Combobox */}

                <Combobox
                  store={comboboxIndustry}
                  withinPortal={false}
                  onOptionSubmit={(val) => {
                    SetSearchIndustry(val);
                    comboboxIndustry.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <Flex direction={"column"} mt={"5px"}>
                      <Text size="sm" fw={500}>
                        Ngành nghề{" "}
                        <Text component="span" c="red">
                          *
                        </Text>
                      </Text>
                      <InputBase
                        disabled={!isUpdate}
                        rightSection={
                          comboboxIndustry.dropdownOpened === true ? (
                            <IconChevronUp
                              size={20}
                              stroke={1}
                              onClick={() => comboboxIndustry.closeDropdown()}
                            />
                          ) : (
                            <IconChevronDown
                              stroke={1}
                              size={20}
                              onClick={() => comboboxIndustry.openDropdown()}
                            />
                          )
                        }
                        value={searchIndustry}
                        onChange={(event) => {
                          comboboxIndustry.openDropdown();
                          comboboxIndustry.updateSelectedOptionIndex();
                          SetSearchIndustry(event.currentTarget.value);
                        }}
                        onClick={() => comboboxIndustry.openDropdown()}
                        onFocus={() => comboboxIndustry.openDropdown()}
                        onBlur={() => {
                          comboboxIndustry.closeDropdown();
                          if (selectedIndustry)
                            SetSearchIndustry(selectedIndustry.name || "");
                        }}
                        placeholder="Ex. Công nghệ thông tin"
                        rightSectionPointerEvents="auto"
                      />
                    </Flex>
                  </Combobox.Target>

                  <Combobox.Dropdown className="dropdown">
                    <Combobox.Options>
                      {optionsIndustry.length > 0 ? (
                        optionsIndustry
                      ) : (
                        <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                      )}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>

                {/* SubIndustry Combobox */}
                <Combobox
                  store={comboboxSubIndustry}
                  withinPortal={false}
                  onOptionSubmit={(val) => {
                    SetSearchSubIndustry(val);
                    comboboxSubIndustry.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <Flex direction={"column"} mt={"5px"}>
                      <Text size="sm" fw={500}>
                        Chuyên môn{" "}
                        <Text component="span" c="red">
                          *
                        </Text>
                      </Text>
                      <InputBase
                        rightSection={
                          comboboxSubIndustry.dropdownOpened === true ? (
                            <IconChevronUp
                              size={20}
                              stroke={1}
                              onClick={() =>
                                comboboxSubIndustry.closeDropdown()
                              }
                            />
                          ) : (
                            <IconChevronDown
                              stroke={1}
                              size={20}
                              onClick={() => comboboxSubIndustry.openDropdown()}
                            />
                          )
                        }
                        value={searchSubIndustry}
                        disabled={subIndustryData.length == 0 || !isUpdate}
                        onChange={(event) => {
                          comboboxSubIndustry.openDropdown();
                          comboboxSubIndustry.updateSelectedOptionIndex();
                          SetSearchSubIndustry(event.currentTarget.value);
                        }}
                        onClick={() => comboboxSubIndustry.openDropdown()}
                        onFocus={() => comboboxSubIndustry.openDropdown()}
                        onBlur={() => {
                          comboboxSubIndustry.closeDropdown();
                          if (selectedSubIndustry)
                            SetSearchSubIndustry(
                              selectedSubIndustry.name || ""
                            );
                        }}
                        placeholder="Ex. Web development"
                        rightSectionPointerEvents="auto"
                      />
                    </Flex>
                  </Combobox.Target>

                  <Combobox.Dropdown className="dropdown">
                    <Combobox.Options>
                      {optionsSubIndustry.length > 0 ? (
                        optionsSubIndustry
                      ) : (
                        <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                      )}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>

                {/* Experience Combobox */}
                <Combobox
                  store={comboboxExp}
                  withinPortal={false}
                  onOptionSubmit={() => {
                    comboboxExp.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <Flex direction={"column"}>
                      <Text size="sm" fw={500}>
                        Kinh nghiệm{" "}
                        <Text component="span" c="red">
                          *
                        </Text>
                      </Text>

                      <InputBase
                        disabled={!isUpdate}
                        component="button"
                        type="button"
                        pointer
                        rightSection={
                          comboboxExp.dropdownOpened === true ? (
                            <IconChevronUp
                              size={20}
                              stroke={1}
                              onClick={() => comboboxExp.closeDropdown()}
                            />
                          ) : (
                            <IconChevronDown
                              size={20}
                              stroke={1}
                              onClick={() => comboboxExp.openDropdown()}
                            />
                          )
                        }
                        onClick={() => comboboxExp.toggleDropdown()}
                        rightSectionPointerEvents="auto"
                      >
                        {!selectedExp && (
                          <Input.Placeholder>Ex. Dưới 1 năm</Input.Placeholder>
                        )}
                        {selectedExp && selectedExp.name}
                      </InputBase>
                    </Flex>
                  </Combobox.Target>

                  <Combobox.Dropdown className="dropdown">
                    <Combobox.Options>{optionsExp}</Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>

                {/* Degree Combobox */}
                <Combobox
                  store={comboboxDegree}
                  withinPortal={false}
                  onOptionSubmit={() => {
                    comboboxDegree.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <Flex direction={"column"}>
                      <Text size="sm" fw={500}>
                        Bằng cấp{" "}
                        <Text component="span" c="red">
                          *
                        </Text>
                      </Text>
                      <InputBase
                        disabled={!isUpdate}
                        component="button"
                        type="button"
                        pointer
                        rightSection={
                          comboboxDegree.dropdownOpened === true ? (
                            <IconChevronUp
                              size={20}
                              stroke={1}
                              onClick={() => comboboxDegree.closeDropdown()}
                            />
                          ) : (
                            <IconChevronDown
                              size={20}
                              stroke={1}
                              onClick={() => comboboxDegree.openDropdown()}
                            />
                          )
                        }
                        onClick={() => comboboxDegree.toggleDropdown()}
                        rightSectionPointerEvents="auto"
                      >
                        {selectedDegree || (
                          <Input.Placeholder>Ex. Dưới 1 năm</Input.Placeholder>
                        )}
                      </InputBase>
                    </Flex>
                  </Combobox.Target>

                  <Combobox.Dropdown className="dropdown">
                    <Combobox.Options>{optionsDe}</Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </Stack>
            </Flex>

            {isUpdate && (
              <Flex
                mt={"2rem"}
                align={"center"}
                gap={"lg"}
                w={"100%"}
                mb={"30px"}
                justify={"center"}
              >
                <Button
                  mt="20px"
                  type="reset"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsUpdate(false);
                    reset();
                    if (!jobDemand) {
                      setCreate(true);
                      setCount(0);
                    }
                  }}
                >
                  Thoát
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="gradient"
                  mt="20px"
                  disabled={false}
                >
                  Lưu thông tin
                </Button>
              </Flex>
            )}
          </FormContainer>
        )}
        <Collapse
          in={count == 1}
          transitionDuration={700}
          transitionTimingFunction="linear"
        >
          {!jobDemand && isCreate && count != 0 && (
            <FormContainer onSubmit={handleSubmit(onSubmitCreate)}>
              <Flex
                w={"100%"}
                gap={"lg"}
                justify={"flex-start"}
                align={"flex-start"}
              >
                <Stack
                  w={"90%"}
                  gap={"xs"}
                  align="stretch"
                  justify="flex-start"
                >
                  <TextInput
                    className="input"
                    withAsterisk
                    label="Vị trí chuyên môn"
                    placeholder="Ex. Biên dịch viên Hán ngữ"
                    {...register("workTitle", {
                      required: {
                        value: true,
                        message: "Vị trí chuyên môn là bắt buộc",
                      },
                      pattern: {
                        value: /^[\p{L}\s]+$/u,
                        message: "Vị trí chuyên môn không hợp lệ",
                      },
                      maxLength: {
                        value: 100,
                        message: "Vị trí chuyên môn không quá 100 ký tự",
                      },
                    })}
                    error={
                      errors.workTitle && (
                        <span>{errors.workTitle.message}</span>
                      )
                    }
                  />
                  <NumberInput
                    withAsterisk
                    value={salary}
                    min={0}
                    max={9999999999}
                    thousandSeparator=","
                    label="Mức lương mong muốn"
                    placeholder="Ex. 10.000.000"
                    rightSection={<Text size="sm">VND / tháng</Text>}
                    onChange={(value) => {
                      setSalary(Number(value));
                    }}
                  />

                  {/* Work Mode Combobox */}
                  <Combobox
                    store={comboboxWM}
                    withinPortal={false}
                    onOptionSubmit={() => {
                      comboboxWM.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <Flex direction={"column"}>
                        <Text size="sm" fw={500}>
                          Hình thức làm việc{" "}
                          <Text component="span" c="red">
                            *
                          </Text>
                        </Text>

                        <InputBase
                          component="button"
                          type="button"
                          pointer
                          rightSection={
                            comboboxWM.dropdownOpened === true ? (
                              <IconChevronUp
                                size={20}
                                stroke={1}
                                onClick={() => comboboxWM.closeDropdown()}
                              />
                            ) : (
                              <IconChevronDown
                                size={20}
                                stroke={1}
                                onClick={() => comboboxWM.openDropdown()}
                              />
                            )
                          }
                          onClick={() => comboboxWM.toggleDropdown()}
                          rightSectionPointerEvents="auto"
                        >
                          {!selectedWorkMode && (
                            <Input.Placeholder>
                              Ex. Toàn thời gian
                            </Input.Placeholder>
                          )}
                          {selectedWorkMode && selectedWorkMode.name}
                        </InputBase>
                      </Flex>
                    </Combobox.Target>

                    <Combobox.Dropdown className="dropdown">
                      <Combobox.Options>{optionsWM}</Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>

                  {/* Location Combobox */}
                  <Combobox
                    store={comboboxLocation}
                    width={500}
                    withinPortal={false}
                    onOptionSubmit={(val) => {
                      SetSearchLocation(val);
                      comboboxLocation.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <Flex direction={"column"}>
                        <Text size="sm" fw={500}>
                          Nơi làm việc{" "}
                          <Text component="span" c="red">
                            *
                          </Text>
                        </Text>
                        <InputBase
                          withAsterisk
                          rightSection={
                            comboboxLocation.dropdownOpened === true ? (
                              <IconChevronUp
                                stroke={1}
                                size={20}
                                onClick={() => comboboxLocation.closeDropdown()}
                              />
                            ) : (
                              <IconChevronDown
                                stroke={1}
                                size={20}
                                onClick={() => comboboxLocation.openDropdown()}
                              />
                            )
                          }
                          value={searchLocation}
                          onChange={(event) => {
                            comboboxLocation.openDropdown();
                            comboboxLocation.updateSelectedOptionIndex();
                            SetSearchLocation(event.currentTarget.value);
                          }}
                          onClick={() => comboboxLocation.openDropdown()}
                          onFocus={() => comboboxLocation.openDropdown()}
                          onBlur={() => {
                            comboboxLocation.closeDropdown();
                            if (selectedLocation)
                              SetSearchLocation(selectedLocation.name || "");
                          }}
                          placeholder="Ex. Hồ Chí Minh"
                          rightSectionPointerEvents="auto"
                        />
                        <Checkbox
                          mt={"sm"}
                          size="xs"
                          variant="outline"
                          color="teal"
                          checked={selectLocationCheckbox}
                          onChange={(event) =>
                            setSelectedLocationCheckbox(
                              event.currentTarget.checked
                            )
                          }
                          label={
                            <Text c={"gray"} size="xs">
                              Sẵn sàng thay đổi nơi làm việc theo yêu cầu
                            </Text>
                          }
                        />
                      </Flex>
                    </Combobox.Target>

                    <Combobox.Dropdown className="dropdown">
                      <Combobox.Options>
                        {optionsLocation.length > 0 ? (
                          optionsLocation
                        ) : (
                          <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                        )}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                </Stack>
                <Stack
                  w={"90%"}
                  gap={"xs"}
                  align="stretch"
                  justify="flex-start"
                >
                  {/* Industry Combobox */}

                  <Combobox
                    store={comboboxIndustry}
                    withinPortal={false}
                    onOptionSubmit={(val) => {
                      SetSearchIndustry(val);
                      comboboxIndustry.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <Flex direction={"column"} mt={"5px"}>
                        <Text size="sm" fw={500}>
                          Ngành nghề{" "}
                          <Text component="span" c="red">
                            *
                          </Text>
                        </Text>
                        <InputBase
                          rightSection={
                            comboboxIndustry.dropdownOpened === true ? (
                              <IconChevronUp
                                size={20}
                                stroke={1}
                                onClick={() => comboboxIndustry.closeDropdown()}
                              />
                            ) : (
                              <IconChevronDown
                                stroke={1}
                                size={20}
                                onClick={() => comboboxIndustry.openDropdown()}
                              />
                            )
                          }
                          value={searchIndustry}
                          onChange={(event) => {
                            comboboxIndustry.openDropdown();
                            comboboxIndustry.updateSelectedOptionIndex();
                            SetSearchIndustry(event.currentTarget.value);
                          }}
                          onClick={() => comboboxIndustry.openDropdown()}
                          onFocus={() => comboboxIndustry.openDropdown()}
                          onBlur={() => {
                            comboboxIndustry.closeDropdown();
                            if (selectedIndustry)
                              SetSearchIndustry(selectedIndustry.name || "");
                          }}
                          placeholder="Ex. Công nghệ thông tin"
                          rightSectionPointerEvents="auto"
                        />
                      </Flex>
                    </Combobox.Target>

                    <Combobox.Dropdown className="dropdown">
                      <Combobox.Options>
                        {optionsIndustry.length > 0 ? (
                          optionsIndustry
                        ) : (
                          <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                        )}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>

                  {/* SubIndustry Combobox */}
                  <Combobox
                    store={comboboxSubIndustry}
                    withinPortal={false}
                    onOptionSubmit={(val) => {
                      SetSearchSubIndustry(val);
                      comboboxSubIndustry.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <Flex direction={"column"} mt={"5px"}>
                        <Text size="sm" fw={500}>
                          Chuyên môn{" "}
                          <Text component="span" c="red">
                            *
                          </Text>
                        </Text>
                        <InputBase
                          rightSection={
                            comboboxSubIndustry.dropdownOpened === true ? (
                              <IconChevronUp
                                size={20}
                                stroke={1}
                                onClick={() =>
                                  comboboxSubIndustry.closeDropdown()
                                }
                              />
                            ) : (
                              <IconChevronDown
                                stroke={1}
                                size={20}
                                onClick={() =>
                                  comboboxSubIndustry.openDropdown()
                                }
                              />
                            )
                          }
                          value={searchSubIndustry}
                          disabled={subIndustryData.length == 0}
                          onChange={(event) => {
                            comboboxSubIndustry.openDropdown();
                            comboboxSubIndustry.updateSelectedOptionIndex();
                            SetSearchSubIndustry(event.currentTarget.value);
                          }}
                          onClick={() => comboboxSubIndustry.openDropdown()}
                          onFocus={() => comboboxSubIndustry.openDropdown()}
                          onBlur={() => {
                            comboboxSubIndustry.closeDropdown();
                            if (selectedSubIndustry)
                              SetSearchSubIndustry(
                                selectedSubIndustry.name || ""
                              );
                          }}
                          placeholder="Ex. Web development"
                          rightSectionPointerEvents="auto"
                        />
                      </Flex>
                    </Combobox.Target>

                    <Combobox.Dropdown className="dropdown">
                      <Combobox.Options>
                        {optionsSubIndustry.length > 0 ? (
                          optionsSubIndustry
                        ) : (
                          <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                        )}
                      </Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>

                  {/* Experience Combobox */}
                  <Combobox
                    store={comboboxExp}
                    withinPortal={false}
                    onOptionSubmit={() => {
                      comboboxExp.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <Flex direction={"column"}>
                        <Text size="sm" fw={500}>
                          Kinh nghiệm{" "}
                          <Text component="span" c="red">
                            *
                          </Text>
                        </Text>
                        <InputBase
                          component="button"
                          type="button"
                          pointer
                          rightSection={
                            comboboxExp.dropdownOpened === true ? (
                              <IconChevronUp
                                size={20}
                                stroke={1}
                                onClick={() => comboboxExp.closeDropdown()}
                              />
                            ) : (
                              <IconChevronDown
                                size={20}
                                stroke={1}
                                onClick={() => comboboxExp.openDropdown()}
                              />
                            )
                          }
                          onClick={() => comboboxExp.toggleDropdown()}
                          rightSectionPointerEvents="auto"
                        >
                          {!selectedExp && (
                            <Input.Placeholder>
                              Ex. Dưới 1 năm
                            </Input.Placeholder>
                          )}
                          {selectedExp && selectedExp.name}
                        </InputBase>
                      </Flex>
                    </Combobox.Target>

                    <Combobox.Dropdown className="dropdown">
                      <Combobox.Options>{optionsExp}</Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>

                  {/* Degree Combobox */}
                  <Combobox
                    store={comboboxDegree}
                    withinPortal={false}
                    onOptionSubmit={() => {
                      comboboxDegree.closeDropdown();
                    }}
                  >
                    <Combobox.Target>
                      <Flex direction={"column"}>
                        <Text size="sm" fw={500}>
                          Bằng cấp{" "}
                          <Text component="span" c="red">
                            *
                          </Text>
                        </Text>
                        <InputBase
                          component="button"
                          type="button"
                          pointer
                          rightSection={
                            comboboxDegree.dropdownOpened === true ? (
                              <IconChevronUp
                                size={20}
                                stroke={1}
                                onClick={() => comboboxDegree.closeDropdown()}
                              />
                            ) : (
                              <IconChevronDown
                                size={20}
                                stroke={1}
                                onClick={() => comboboxDegree.openDropdown()}
                              />
                            )
                          }
                          onClick={() => comboboxDegree.toggleDropdown()}
                          rightSectionPointerEvents="auto"
                        >
                          {selectedDegree || (
                            <Input.Placeholder>Ex. Cao đẳng</Input.Placeholder>
                          )}
                        </InputBase>
                      </Flex>
                    </Combobox.Target>

                    <Combobox.Dropdown className="dropdown">
                      <Combobox.Options>{optionsDe}</Combobox.Options>
                    </Combobox.Dropdown>
                  </Combobox>
                </Stack>
              </Flex>

              <Flex
                mt={"2rem"}
                align={"center"}
                gap={"lg"}
                w={"100%"}
                mb={"30px"}
                justify={"center"}
              >
                <Button
                  mt="20px"
                  type="reset"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsUpdate(false);
                    reset();
                    if (!jobDemand) {
                      setCreate(true);
                      setCount(0);
                    }
                  }}
                >
                  Thoát
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="gradient"
                  mt="20px"
                  disabled={false}
                >
                  Lưu thông tin
                </Button>
              </Flex>
            </FormContainer>
          )}
        </Collapse>
        {isCreate && count == 0 && (
          <Container
            h={"3rem"}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="gradient"
              onClick={() => {
                setCreate(true);
                setCount(1);
              }}
            >
              Tạo mới
            </Button>
          </Container>
        )}
      </Container>
    </>
  );
}
