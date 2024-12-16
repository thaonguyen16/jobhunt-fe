import "../setting-recruiter.scss";
import "@mantine/tiptap/styles.css";

import {
  Group,
  TextInput,
  Modal,
  Button,
  Stack,
  Grid,
  useCombobox,
  Combobox,
  Flex,
  InputBase,
  Text,
} from "@mantine/core";
import { CompanyProfile, ICompanyProfile } from "@data/interface/company";

import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { PostResponse } from "@data/interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendUpdateCompanyRequest } from "@services/companyService";
import { notifications } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormContainer } from "@components/form";
import fetchLocations from "@services/locationService";
import { useEffect, useState } from "react";
import { Option } from "@data/interface/option";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

type UpdateCompanyModalProps = {
  companyInfo: CompanyProfile;
  isUpdate: () => void;
  isLoading: (data: boolean) => void;
  openModal?: () => void;
  opened: boolean;
  closeModal: () => void;
};

export default function UpdateCompanyModal({
  isUpdate,
  companyInfo,
  opened,
  isLoading,
  closeModal,
}: UpdateCompanyModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICompanyProfile>({
    mode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: companyInfo.name,
      address: companyInfo.address,
      description: companyInfo.description,
      phone: companyInfo.phone,
      web_url: companyInfo.webUrl,
      email: companyInfo.email,
      scale: companyInfo.scale,
      location: companyInfo.location?.id,
    },
  });

  const queryLocation = useQuery({
    queryKey: ["new-company-location"],
    queryFn: () => fetchLocations(),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (queryLocation.data) {
      setLocationData(queryLocation.data);
    }
  }, [queryLocation.data]);

  const updateMutation = useMutation<PostResponse, Error, ICompanyProfile>({
    mutationFn: sendUpdateCompanyRequest,
    onSuccess: () => {
      isUpdate();
      isLoading(false);
      closeModal();
      notifications.show({
        title: "Cập nhật thông tin",
        message: "Cập nhật thông tin thành công",
        color: "green",
      });
    },
    onError: (error) => {
      isUpdate();
      isLoading(false);
      notifications.show({
        title: "Cập nhật thất bại",
        message: error.message,
        color: "red",
      });
    },
  });

  const content = companyInfo.description;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  const onSubmit: SubmitHandler<ICompanyProfile> = (data) => {
    isLoading(true);

    if (editor) {
      data.description = editor.getHTML();
    }
    if (watch("email") == "") {
      data.email = undefined;
    }
    if (watch("phone") == "") {
      data.phone = undefined;
    }

    if (selectedLocation !== undefined) {
      data.location = selectedLocation.id;
    }

    updateMutation.mutate(data);
  };

  const checkChange = () => {
    if (watch("address")?.trim() == companyInfo.address) {
      if (editor?.getHTML() == companyInfo.description) {
        if (watch("email")?.trim() == companyInfo.email) {
          if (watch("name")?.trim() == companyInfo.name) {
            if (watch("phone") == companyInfo.phone) {
              if (watch("scale")?.trim() == companyInfo.scale) {
                if (watch("web_url")?.trim() == companyInfo.webUrl) {
                  if (selectedLocation === undefined) {
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
      return true;
    }
    return true;
  };

  const [locationData, setLocationData] = useState<Option[]>([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Option | undefined>(
    undefined
  );

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
    <Modal.Root
      className="modal-company"
      opened={opened}
      onClose={closeModal}
      size={"60%"}
      transitionProps={{
        transition: "fade",
        duration: 600,
        timingFunction: "linear",
      }}
      closeOnClickOutside={false}
    >
      <Modal.Overlay backgroundOpacity={0.8} />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title ta={"center"} w={"100%"} fw={700}>
            Cập nhật thông tin công ty
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>

        <Modal.Body>
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Stack px="md">
              <TextInput
                label="Tên công ty"
                required
                className="input-style"
                defaultValue={companyInfo.name}
                withAsterisk
                {...register("name", {
                  required: {
                    value: true,
                    message: "Tên công ty là bắt buộc", // Message when the field is required but empty
                  },
                  pattern: {
                    value: /^[\p{L}\s\p{N}\\(\\)\\[\]]+$/u,
                    message: "Tên công ty không hợp lệ",
                  },
                  maxLength: {
                    value: 200,
                    message: "Tên công ty không được quá 200 ký tự", // Message when the length exceeds 50 characters
                  },
                })}
                error={errors.name && <span>{errors.name.message}</span>}
              ></TextInput>

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
                    <Text size="sm" fw={500}>
                      Trụ sở chính{" "}
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

                <Combobox.Dropdown
                  mah={"10rem"}
                  style={{
                    overflowY: "auto",
                    overflowX: "hidden",
                  }}
                >
                  <Combobox.Options>
                    {optionsLocation.length > 0 ? (
                      optionsLocation
                    ) : (
                      <Combobox.Empty>Không tìm thấy</Combobox.Empty>
                    )}
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>

              <TextInput
                label="Địa chỉ cụ thể"
                required
                defaultValue={companyInfo.address}
                withAsterisk
                {...register("address", {
                  required: {
                    value: true,
                    message: "Địa chỉ là bắt buộc", // Message when the field is required but empty
                  },
                  pattern: {
                    value: /^[\p{L}\s\p{N}.,-]+$/u,
                    message: "Địa chỉ không hợp lệ",
                  },
                  maxLength: {
                    value: 200,
                    message: "Địa chỉ không quá 200 ký tự", // Message when the length exceeds 50 characters
                  },
                })}
                error={errors.address && <span>{errors.address.message}</span>}
              ></TextInput>
              <Grid>
                <Grid.Col span={6}>
                  <TextInput
                    size="sm"
                    label="Email liên hệ"
                    type="email"
                    defaultValue={companyInfo.email}
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Email không hợp lệ",
                      },
                      maxLength: {
                        value: 200,
                        message: "Email không quá 200 ký tự", // Message when the length exceeds 50 characters
                      },
                    })}
                    error={errors.email && <span>{errors.email.message}</span>}
                  ></TextInput>
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    size="sm"
                    label="Hotline"
                    type="phone"
                    defaultValue={companyInfo.phone}
                    {...register("phone", {
                      pattern: {
                        value: /^\d{10}$/,
                        message: "Số điện thoại không hợp lệ",
                      },
                      maxLength: {
                        value: 200,
                        message: "Số điện thoại không quá 200 ký tự", // Message when the length exceeds 50 characters
                      },
                    })}
                    error={errors.phone && <span>{errors.phone.message}</span>}
                  ></TextInput>
                </Grid.Col>
                <Grid.Col span={6}>
                  <TextInput
                    size="sm"
                    label="Quy mô công ty"
                    withAsterisk
                    placeholder="Ex. 5000+ nhân viên"
                    type="text"
                    defaultValue={companyInfo.scale}
                    {...register("scale", {
                      required: {
                        value: true,
                        message: "Quy mô công ty là bắt buộc", // Message when the field is required but empty
                      },

                      pattern: {
                        value: /^[\p{L}\s\p{N}+-]+$/u,
                        message: "Quy mô nhập không hợp lệ",
                      },
                      maxLength: {
                        value: 50,
                        message: "Quy mô không quá 50 ký tự", // Message when the length exceeds 50 characters
                      },
                    })}
                    error={errors.scale && <span>{errors.scale.message}</span>}
                  ></TextInput>
                </Grid.Col>
              </Grid>
              <TextInput
                label="Địa chỉ web"
                type="text"
                placeholder="https://jobhunt.vn"
                defaultValue={companyInfo.webUrl}
                {...register("web_url", {
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/.*)?$/,
                    message: "Địa chỉ website không hợp lệ",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Địa chỉ website không quá 1000", // Message when the length exceeds 50 characters
                  },
                })}
                error={errors.web_url && <span>{errors.web_url.message}</span>}
              ></TextInput>
              <Stack className="rich-text">
                <RichTextEditor editor={editor}>
                  <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Bold />
                      <RichTextEditor.Italic />
                      <RichTextEditor.Underline />
                      <RichTextEditor.Strikethrough />

                      <RichTextEditor.Highlight />
                    </RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.H1 />
                      <RichTextEditor.H2 />
                      <RichTextEditor.H3 />
                      <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Blockquote />
                      <RichTextEditor.Hr />
                      <RichTextEditor.BulletList />
                      <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Link />
                      <RichTextEditor.Unlink />
                    </RichTextEditor.ControlsGroup>
                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.AlignLeft />
                      <RichTextEditor.AlignCenter />
                      <RichTextEditor.AlignJustify />
                      <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                      <RichTextEditor.Undo />
                      <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>
                  </RichTextEditor.Toolbar>

                  <RichTextEditor.Content />
                </RichTextEditor>
              </Stack>
              <Group justify="end" mb="md">
                <Button variant="outline" onClick={closeModal} size="sm">
                  Huỷ
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  variant="gradient"
                  disabled={!checkChange()}
                  gradient={{ from: "blue", to: "teal", deg: 90 }}
                >
                  Cập nhật
                </Button>
              </Group>
            </Stack>
          </FormContainer>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
