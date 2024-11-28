import { AppAvatar } from "@components/ui";
import {
  Stack,
  Container,
  Grid,
  Flex,
  Text,
  Button,
  Group,
  ActionIcon,
  Switch,
  TextInput,
  Select,
  MultiSelect,
  Overlay,
  Loader,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AvatarModal from "./AvatarModal";
import { IconArrowUp, IconShieldLock } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  CandidateProfile,
  ICandidateProfile,
} from "../../../../data/interface/profile";
import { SubIndustry } from "@data/interface/subIndustry";

import "../setting.scss";
import {
  fetchCandidateProfile,
  sendUpdateProfileRequest,
} from "@services/userService";
import { fetchIndustriesWithSub } from "@services/industryService";
import fetchLocations from "@services/locationService";
import { useMutation } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { notifications } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "@components/form";
import { Industry } from "@data/interface/industry";
import ChangePassword from "./ChangePassword";

export default function Profile() {
  type ComboBoxData = {
    value: string;
    label: string;
  };

  const [
    avatarModalOpened,
    { open: openAvatarModal, close: closeAvatarModal },
  ] = useDisclosure(false);

  const [checkedFindJob, setCheckedFindJob] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isloading, setLoading] = useState(true);
  const [isRecall, setRecall] = useState(true);
  const [candiateProfile, setcandidateProfile] = useState<
    CandidateProfile | undefined
  >(undefined);
  const [industry, setIndustry] = useState<Industry[] | undefined>(undefined);
  const [industriesData, setIndustriesData] = useState<ComboBoxData[]>([]);
  const [locationsData, setLocationsData] = useState<ComboBoxData[]>([]);
  const [subIndustriesData, setSubIndustriesData] = useState<ComboBoxData[]>(
    []
  );
  const [genderState, setGenderState] = useState<string>("");

  useEffect(() => {
    if (avatarModalOpened) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [avatarModalOpened]);

  const getsubIndustriesNum = (data: SubIndustry[]) => {
    const idList: number[] = [];
    if (data) {
      data.forEach((e) => {
        idList.push(e.id);
      });
    }

    return idList;
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ICandidateProfile>({ mode: "onChange", shouldFocusError: true });

  //Get Profile Data
  useEffect(() => {
    if (isRecall) {
      const fetchData = async () => {
        await fetchCandidateProfile().then((pro) => {
          //Set data of candidate profile
          setcandidateProfile(pro);

          if (pro) {
            setCheckedFindJob(pro.findJob);

            setGenderState(pro.gender);
            setValue("fullName", pro.fullName);
            setValue("phone", pro.phone);
            setValue("email", pro.email);
            setValue("gender", pro.gender);
            setValue("avatar", pro.avatar);
            setValue("industryId", Number(pro.industry.id));
            setValue("locationId", Number(pro.location.id));
            setValue("subIndustryIds", getsubIndustriesNum(pro.subIndustries));
            setValue("findJob", pro.findJob);
          }

          const fetchIndustriesL = async () => {
            const response = await fetchIndustriesWithSub();
            if (response) {
              setIndustry(response);
              const selectBoxInsdustriesData = response.map((op) => ({
                value: op.id.toString(),
                label: op.name,
              }));
              setIndustriesData(selectBoxInsdustriesData);

              const listSub = response.filter(
                (e) => e.id === Number(pro?.industry.id)
              )[0].subIndustry;

              const selectBoxSubIndustriesData = listSub.map((sub) => ({
                value: sub.id.toString(),
                label: sub.name,
              }));
              // Set data for MultiSelect ComboBox follow industry ID
              setSubIndustriesData(selectBoxSubIndustriesData);
            }
          };
          const fetchLocationsL = async () => {
            const response = await fetchLocations();
            if (response) {
              const selectBoxLocationData = response.map((lo) => ({
                value: lo.id.toString(),
                label: lo.name,
              }));
              setLocationsData(selectBoxLocationData);
            }
          };

          fetchIndustriesL().then(() => {
            fetchLocationsL().then(() => {
              setLoading(false);
            });
          });
        });
      };
      fetchData().then(() => {
        setRecall(false);
      });
    }
  }, [isRecall, checkedFindJob, setValue]);

  const getsubIndustriesString = (data: SubIndustry[]) => {
    const idList: string[] = [];
    data.forEach((e) => {
      idList.push(e.id.toString());
    });

    return idList;
  };

  const checkChange = () => {
    if (candiateProfile) {
      if (watch("fullName") == candiateProfile.fullName) {
        if (genderState == candiateProfile.gender) {
          if (watch("phone") == candiateProfile.phone) {
            if (watch("locationId") == Number(candiateProfile.location.id)) {
              if (watch("industryId") == Number(candiateProfile.industry.id)) {
                const lengthN = watch("subIndustryIds").length;
                let i: number = 0;
                let en: number = 0;

                for (i; i < lengthN; i++) {
                  if (
                    watch("subIndustryIds").includes(
                      getsubIndustriesNum(candiateProfile.subIndustries)[i]
                    )
                  ) {
                    en = en + 1;
                  }
                }

                if (en == lengthN) {
                  return false;
                }
                return true;
              }

              return true;
            }

            return true;
          }
          return true;
        }

        return true;
      }
      return true;
    }
  };

  const updateMutation = useMutation<PostResponse, Error, ICandidateProfile>({
    mutationFn: sendUpdateProfileRequest,
    onSuccess: () => {
      setIsUpdate(false);
      setRecall(true);
      setLoading(false);
      notifications.show({
        title: "Cập nhật thông tin",
        message: "Cập nhật thông tin thành công",
        color: "green",
      });
    },
    onError: (error) => {
      setLoading(false);
      setIsUpdate(false);
      notifications.show({
        title: "Cập nhật thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const onSubmit: SubmitHandler<ICandidateProfile> = (data) => {
    setLoading(true);
    console.log(data);
    data.gender = genderState;
    data.findJob = checkedFindJob;
    updateMutation.mutate(data);
  };

  const setImageUpload = () => {
    setRecall(!isRecall);
  };

  const handleSetLoading = (loading: boolean) => {
    setLoading(loading);
  };

  return (
    <>
      <AvatarModal
        opened={avatarModalOpened}
        onClose={closeAvatarModal}
        setIAvatar={setImageUpload}
      />
      {isloading && (
        <Overlay w="100%" h="100%" pos="fixed" blur={2}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>
      )}
      {candiateProfile && (
        <Container
          maw={"2000px"}
          bg={"#f4f4f4"}
          pt={"20px"}
          mih={"500px"}
          pb={"100px"}
          ml={"0px"}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid w={"80%"}>
            {/* Content 1 */}
            <Grid.Col span={{ base: 12, sm: 7, xs: 12 }}>
              <Container
                p={"0"}
                m={"0"}
                bg={"rgba(255,255,255,0.45"}
                style={{
                  borderRadius: "20px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Stack w={"80%"}>
                  <Text size="1rem" fw={"700"} c={"#0581e6"} mt={"20px"}>
                    Cài đặt thông tin cá nhân
                  </Text>

                  <FormContainer onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                      mb="10px"
                      withAsterisk={isUpdate}
                      label="Họ và tên"
                      defaultValue={candiateProfile.fullName}
                      disabled={!isUpdate}
                      {...register("fullName", {
                        required: {
                          value: true,
                          message: "Tên là bắt buộc", // Message when the field is required but empty
                        },
                        pattern: {
                          value: /^[\p{L}\s]+$/u,
                          message: "Tên không hợp lệ",
                        },
                        maxLength: {
                          value: 50,
                          message: "Tên không được quá 50 ký tự", // Message when the length exceeds 50 characters
                        },
                      })}
                      error={
                        errors.fullName && (
                          <span>{errors.fullName.message}</span>
                        )
                      }
                    />
                    <Select
                      mb="10px"
                      disabled={!isUpdate}
                      label="Giới tính"
                      withAsterisk={isUpdate}
                      id="gender"
                      data={[
                        {
                          value: "MALE",
                          label: "Nam",
                        },
                        {
                          value: "FEMALE",
                          label: "Nữ",
                        },
                        {
                          value: "OTHER",
                          label: "Khác",
                        },
                      ]}
                      value={genderState}
                      onChange={(_value, option) => {
                        if (option) {
                          setGenderState(option.value);
                          setValue("gender", option.value);
                        }
                      }}
                    ></Select>

                    <TextInput
                      mb="10px"
                      label="Email"
                      value={candiateProfile.email}
                      disabled
                      withAsterisk={isUpdate}
                    />
                    <TextInput
                      mb="10px"
                      label="Số điện thoại"
                      defaultValue={candiateProfile.phone}
                      disabled={!isUpdate}
                      {...register("phone", {
                        pattern: {
                          value: /^\d{10}$/,
                          message: "Số điện thoại không hợp lệ",
                        },
                      })}
                      error={
                        errors.phone && <span>{errors.phone.message}</span>
                      }
                    />
                    {!isloading && (
                      <Select
                        key={candiateProfile.location.name}
                        mb="10px"
                        style={{ cursor: "pointer" }}
                        disabled={!isUpdate}
                        label="Nơi làm việc"
                        searchable
                        data={locationsData}
                        defaultValue={candiateProfile.location.id.toString()}
                        onChange={(_value, option) => {
                          if (option) {
                            setValue("locationId", Number(option.value));
                          }
                        }}
                      ></Select>
                    )}
                    {!isloading && (
                      <Select
                        key={candiateProfile.industry.name}
                        mb="10px"
                        disabled={!isUpdate}
                        label="Lĩnh vực"
                        searchable
                        data={industriesData}
                        defaultValue={candiateProfile.industry.id.toString()}
                        onChange={(_value, option) => {
                          if (option) {
                            setValue("industryId", Number(option.value));
                            setValue("subIndustryIds", []);

                            if (industry) {
                              const listSub = industry.filter(
                                (e) => e.id == Number(option.value)
                              )[0].subIndustry;

                              const selectBoxSubIndustriesData = listSub.map(
                                (sub) => ({
                                  value: sub.id.toString(),
                                  label: sub.name,
                                })
                              );
                              // Set data for MultiSelect ComboBox follow industry ID
                              setSubIndustriesData(selectBoxSubIndustriesData);
                            }
                          }
                        }}
                      ></Select>
                    )}

                    {watch("industryId") ===
                    Number(candiateProfile.industry.id) ? (
                      <MultiSelect
                        key={"subIndustry1"}
                        mb="10px"
                        disabled={!isUpdate}
                        label="Chọn ngành nghề cụ thể"
                        placeholder="Chọn ngành nghề"
                        data={subIndustriesData}
                        defaultValue={getsubIndustriesString(
                          candiateProfile.subIndustries
                        )}
                        hidePickedOptions
                        onChange={(value) => {
                          const valueNumber: number[] = [];
                          value.forEach((e) => {
                            valueNumber.push(Number(e));
                          });
                          setValue("subIndustryIds", valueNumber);
                        }}
                      ></MultiSelect>
                    ) : (
                      <MultiSelect
                        key={"subIndustry2"}
                        mb="10px"
                        disabled={!isUpdate}
                        label="Chọn ngành nghề cụ thể"
                        placeholder="Chọn ngành nghề"
                        data={subIndustriesData}
                        defaultValue={[]}
                        hidePickedOptions
                        onChange={(value) => {
                          const valueNumber: number[] = [];
                          value.forEach((e) => {
                            valueNumber.push(Number(e));
                          });
                          setValue("subIndustryIds", valueNumber);
                        }}
                      ></MultiSelect>
                    )}
                    <Stack align={"center"} w={"100%"} mb={"30px"}>
                      {!isUpdate ? (
                        <Button
                          mt="20px"
                          variant="light"
                          size="sm"
                          onClick={() => {
                            setIsUpdate(true);
                          }}
                        >
                          Cập nhật thông tin
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          size="sm"
                          mt="20px"
                          disabled={!checkChange()}
                        >
                          Hoàn thành cập nhật
                        </Button>
                      )}
                    </Stack>
                  </FormContainer>
                </Stack>
              </Container>
            </Grid.Col>

            {/* Content 2 */}
            <Grid.Col span={{ base: 12, sm: 5, xs: 12 }}>
              <Container
                p={"10px"}
                m={"0"}
                pb={"30px"}
                bg={"rgba(255,255,255,0.5"}
                style={{ borderRadius: "20px" }}
              >
                <Stack align="center">
                  {/* Avatar */}
                  <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="nowrap"
                  >
                    <AppAvatar
                      openEditModal={openAvatarModal}
                      link={candiateProfile.avatar}
                    />

                    <Group gap={"xs"}>
                      <Group gap={"xs"}>
                        <ActionIcon
                          variant="light"
                          color="green"
                          size="md"
                          radius="md"
                          aria-label="Settings"
                        >
                          <IconShieldLock
                            style={{ width: "70%", height: "70%" }}
                            stroke={1.5}
                          />
                        </ActionIcon>

                        <Text size="xs" c={"green"}>
                          Đã xác thực
                        </Text>
                      </Group>

                      <Text fw={"600"} size="lg">
                        {candiateProfile?.fullName}
                      </Text>
                      <Button
                        size="xs"
                        m={0}
                        variant="light"
                        leftSection={<IconArrowUp size={14} />}
                      >
                        Nâng cấp tài khoản VIP
                      </Button>
                    </Group>
                  </Flex>
                  {/* Switch */}
                  <Flex
                    gap="md"
                    justify="flex-start"
                    align="center"
                    direction="row"
                    mt={"20px"}
                    w={"100%"}
                    wrap="wrap"
                  >
                    <Switch
                      type="submit"
                      checked={checkedFindJob}
                      label="Đang tìm việc"
                      onChange={(event) => {
                        setCheckedFindJob(event.currentTarget.checked);
                        setValue("findJob", event.currentTarget.checked);

                        setLoading(true);
                        updateMutation.mutate(getValues());
                      }}
                    />
                  </Flex>
                </Stack>
              </Container>

              <ChangePassword loading={handleSetLoading} />
            </Grid.Col>
          </Grid>
        </Container>
      )}
    </>
  );
}
