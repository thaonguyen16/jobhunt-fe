/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormContainer} from "@components/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Stack, TextInput, Text, Container,Button, Box, PasswordInput, useCombobox, Combobox, InputBase, Select, em, Overlay, Center, Loader } from "@mantine/core";
import { IRecruiterRegister } from "@data/interface/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostResponse } from "@data/interface";
import { recruiterRegisterRequest } from "../../../../api/auth";
import { notifications } from "@mantine/notifications";
import { IconBuilding, IconChevronDown, IconChevronUp, IconUser } from "@tabler/icons-react";
import "../register_recuiter.scss"
import fetchLocations from "@services/locationService";
import { Location } from "@data/interface/location";
import { useMediaQuery } from "@mantine/hooks";

export default function RecruiterRegisterForm() {

  
  const isMobile = useMediaQuery(`(max-width: ${em(900)})`);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [comfirmPass, setComfirmPass] = useState("");
  const [gender, setGender] = useState("MALE");
  const [locationData, setLocationData] = useState<Location[]>([])
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
  const [dataRe, setDataRe] = useState<IRecruiterRegister | undefined>(undefined)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRecruiterRegister>({ mode: "onChange", shouldFocusError: true });

  const queryLocation = useQuery({
    queryKey: ["register-location"],
    queryFn: () => fetchLocations(),
    staleTime: Infinity,
  });

  const checkValid = () => {
    if(getValues("fullName")?.length === 0) {
      return false;
    }
    if(getValues("email")?.length === 0) {
      return false;
    }
    if(getValues("password")?.length === 0) {
      return false;
    }
    if(comfirmPass.length === 0) {
      return false;
    }
    if(getValues("phone")?.length === 0) {
      return false;
    }
    if(getValues("companyName")?.length === 0) {
      return false;
    }
    
    if(gender.length === 0) {
      return false;
    }

    if(selectedLocation === undefined) {
      return false;
    }

    return true;
  }

  const registerMutation = useMutation<PostResponse, Error, IRecruiterRegister>({
    mutationFn: recruiterRegisterRequest,
    onSuccess: () => {
      setLoading(false);
      navigate("/xac-nhan-tai-khoan", {state: dataRe})
      notifications.show({
        title: "Đăng ký",
        message: "Đăng ký nhà tuyển dụng thành công!",
        color: "green",
      });
    },
    onError: (error) => {
      setLoading(false);

      notifications.show({
        title: "Đăng ký thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const onSubmit: SubmitHandler<IRecruiterRegister> = (data) => {

    setLoading(true);

    data.gender = gender;
    if(selectedLocation) {
      data.location = selectedLocation.id
    }

    data.role = "RECRUITER"

    console.log(data);

    setDataRe(data);

    registerMutation.mutate(data);
  };

  useEffect(() => {
    if (queryLocation.data) {
      setLocationData(queryLocation.data);
    }
  }, [queryLocation.data]);

  //Location

  const comboboxLocation = useCombobox({
    onDropdownClose: () => comboboxLocation.resetSelectedOption(),
  });

  const shouldFilterOptionsLocation = locationData.every(
    (item) => item.name !== searchLocation
  );
  const filteredOptions = shouldFilterOptionsLocation
    ? locationData.filter((item) =>
      item.name.toLowerCase().includes(searchLocation.toLowerCase().trim())
    )
    : locationData;

  const optionsLocation = filteredOptions.map((item) => (
    <Combobox.Option
      value={item.name}
      key={item.name}
      onClick={() => setSelectedLocation(item)}
    >
      {item.name}
    </Combobox.Option>
  ));


  return (
    <Container w={!isMobile ? "50%" : "100%"} maw={2000} className="form-re" mb={"2rem"}>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {loading && <Overlay w="100%" h="100%" pos="fixed" blur={2}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>}
        <Stack>
          <Flex direction={"row"} gap={"md"} justify={"flex-start"} align={"center"}>
            <IconUser stroke={1} color="white" />
            <Box w={5} h={20} bg={"blue"} />
            <Text fw={600} c={"blue"} size="md">Thông tin tài khoản</Text>
          </Flex>
          <TextInput
            label="Nhập email liên hệ"
            placeholder="Ex. example@gmail.com"
            withAsterisk
            {...register("email", {
              required: {
                value: true,
                message: "Email là bắt buộc",
              },
              pattern: {
                value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                message: "Email không hợp lệ",
              },
              maxLength: {
                value: 500,
                message: "Email không quá 500 ký tự",
              },
            })}

            error={errors.email && <span>{errors.email.message}</span>}
          />

          <PasswordInput
            placeholder="Nhập mật khẩu"
            label="Nhập mật khẩu"
            autoComplete="new-password"
            withAsterisk

            {...register("password", {
              required: {
                value: true,
                message: "Mật khẩu là bắt buộc",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "Mật khẩu không hợp lệ",
              },
              minLength: {
                value: 8,
                message: "Mật khẩu tối thiểu 8 kí tự",
              },
            })}

            error={errors.password && <span>{errors.password.message}</span>}
          />

          <PasswordInput
            placeholder="Nhập lại mật khẩu"
            label="Nhập lại mật khẩu"
            withAsterisk
            defaultValue={comfirmPass}
            onChange={(value) => setComfirmPass(value.currentTarget.value)}


            error={comfirmPass !== getValues("password") && <span>Mật khẩu không khớp</span>}
          />

        </Stack>
        <Stack mt={"2rem"}>
          <Flex direction={"row"} gap={"md"} justify={"flex-start"} align={"center"}>
            <IconBuilding stroke={1} color="white" />
            <Box w={5} h={20} bg={"blue"} />
            <Text fw={600} c={"blue"} size="md">Thông tin nhà tuyển dụng</Text>
          </Flex>

          <Flex direction={"row"} justify={"space-between"} align={"center"} w={"100%"} gap={"md"}>

            <TextInput w={"100%"}
              label="Họ và tên"
              placeholder="Ex. Nguyễn Văn A"
              withAsterisk
              {...register("fullName", {
                required: {
                  value: true,
                  message: "Tên là bắt buộc",
                },
                pattern: {
                  value: /^[\p{L}\s]+$/u,
                  message: "Tên không hợp lệ",
                },
                maxLength: {
                  value: 100,
                  message: "Tên không quá 100 ký tự",
                },
              })}

              error={errors.fullName && <span>{errors.fullName.message}</span>}
            />

            <TextInput w={"100%"}
              label="Số điện thoại"
              placeholder="Ex. 0868286420"
              withAsterisk
              {...register("phone", {
                required: {
                  value: true,
                  message: "Số điện thoại là bắt buộc",
                },
                pattern: {
                  value: /^(\+?\d{1,3}[- ]?)?\d{9,}$/,
                  message: "Số điện thoại không hợp lệ",
                },
                maxLength: {
                  value: 10,
                  message: "Số điện thoại gồm 10 số",
                },
              })}

              error={errors.phone && <span>{errors.phone.message}</span>}
            />


          </Flex>
          <TextInput w={"100%"}
            label="Tên công ty"
            placeholder="Ex. Công ty LMS"
            withAsterisk
            {...register("companyName", {
              required: {
                value: true,
                message: "Tên công ty là bắt buộc",
              },
              pattern: {
                value: /^[\p{L}\s\p{N}.,-]+$/u,
                message: "Tên công ty hợp lệ",
              },
              maxLength: {
                value: 500,
                message: "Tên công ty không quá 500 ký tự",
              },
            })}

            error={errors.companyName && <span>{errors.companyName.message}</span>}
          />

          <Select
            label="Giới tính"
            withAsterisk
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
            value={gender}
            onChange={(_value, option) => {
              if (option) {
                setGender(option.value);
              }
            }} >

          </Select>


          {/* Location Combobox */}
          <Combobox
            store={comboboxLocation}
            width={500}
            withinPortal={false}
            onOptionSubmit={(val) => {
              setSearchLocation(val);
              comboboxLocation.closeDropdown();
            }}
          >
            <Combobox.Target>
              <Flex direction={"column"}>
                <Text size="sm" fw={500} c={"white"}>
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
                    setSearchLocation(event.currentTarget.value);
                  }}
                  onClick={() => comboboxLocation.openDropdown()}
                  onFocus={() => comboboxLocation.openDropdown()}
                  onBlur={() => {
                    comboboxLocation.closeDropdown();
                    if (selectedLocation)
                      setSearchLocation(selectedLocation.name || "");
                  }}
                  placeholder="Ex. Hồ Chí Minh"
                  rightSectionPointerEvents="auto"
                />
              </Flex>
            </Combobox.Target>

            <Combobox.Dropdown mah={"10rem"} style={{
              overflowY: "auto",
              overflowX: "hidden"
            }}>
              <Combobox.Options>
                {optionsLocation.length > 0 ? (
                  optionsLocation
                ) : (
                  <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                )}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>

          <Button variant="gradient" gradient={{from: "blue",to: "cyan", deg: 90}} type="submit" disabled={!checkValid()}>
                Đăng ký
          </Button>
        </Stack>
      </FormContainer>
    </Container>
  );
}
