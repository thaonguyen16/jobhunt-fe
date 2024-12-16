import { Modal, NumberInput, Stack, TextInput, Text, Group, Button, SimpleGrid, NativeSelect, Flex, Overlay, Loader, Center } from "@mantine/core";
import "../../../recruiter/recuiterInfo/setting-recruiter.scss"
import FormContainer from "@components/form/FormUI/FormContainer";
import { IPlan, IPlanItemValue, PlanItem } from "@data/interface/plan";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostResponse } from "@data/interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPlan, getAllPlanItem } from "../../../../api/plan";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { IconPlus } from "@tabler/icons-react";

type Compobox = {
    value: string;
    label: string;
}


export default function ModalAddPlan({ opened, close }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IPlan>({
        mode: "onChange",
        shouldFocusError: true,
    });

    const [duration, setDuration] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [type, setType] = useState("CANDIDATE_PLAN");
    const [planItemData, setPlanItemData] = useState<PlanItem[]>([]);
    const [planItem, setPlanItem] = useState<Compobox[]>([]);
    const [valueItem,setValueItem] = useState("1");
    const [valueBoolean, setvalueBoolean] = useState("TRUE");
    const [valueNumber, setValueNumber] = useState(0);
    const [typeCurrent, setTyptcurrent] = useState("0");
    const [planItemValue, setPlanItemValue] = useState<IPlanItemValue[]>([]);
    const [nameValue, setNameValue] = useState("");
    
    const [isCall, setCall] = useState(false);

    const [onSub, setOnSub] = useState(false);

    const useClient = useQueryClient();

    const resetModal = () => {
        reset();
        setOnSub(false);
        setPrice(0);
        setDuration(0);
        setPlanItemValue([]);
    }

    const updateMutation = useMutation<PostResponse, Error, IPlan>({
        mutationFn: createPlan,
        onSuccess: () => {
            setCall(false);
            resetModal();
            useClient.invalidateQueries({ queryKey: ["get-plan"] });
            close();
            notifications.show({
                title: "Cập nhật thông tin",
                message: "Cập nhật thông tin thành công",
                color: "green",
            });
        },
        onError: (error) => {
            setCall(false);
            notifications.show({
                title: "Cập nhật thất bại",
                message: error.message,
                color: "red",
            });
        },
    });

    const onSubmit: SubmitHandler<IPlan> = (data) => {
        if(onSub) {

            data.price = price;
            data.duration = duration;
            data.type = type;
            

            if(planItemValue.length !== 0)
                data.planItemValueList = planItemValue;
            else {
                notifications.show({title: "Thêm gói dịch vụ", message: "Quyền lợi không được trống", color: "yellow"})
            }
            setCall(true);
            console.log(data);
            updateMutation.mutate(data);
        }
    };

    const query = useQuery({
        queryKey: ["plan-item"],
        queryFn: () => getAllPlanItem(),
        staleTime: Infinity
      });

      useEffect(() => {
        if(query.data) {
            setPlanItemData(query.data);
            const planList = query.data;
            const planListCom: Compobox[]= [];
            setValueItem(String(planList[0].id));
            setNameValue(planList[0].name);
            setTyptcurrent(planList[0].type);

            planList.forEach(e => {
                planListCom.push({value: String(e.id), label: e.name})
            })

            if(planListCom.length != 0)
            {
                setPlanItem(planListCom);
            }

        }
      },[query.data])

    
    const getType = (id: string) => {
        let type = "";
        planItemData.forEach(e => {
            if(e.id === Number(id)) {  
                type = e.type;
            }
        })

        return type;
    }

    const getName = (id: string) => {
        let type = "";
        planItemData.forEach(e => {
            if(e.id === Number(id)) {  
                type = e.name;
            }
        })

        return type;
    }


    return (<Modal.Root
        className="modal-company"
        opened={opened}
        onClose={close}
        key={valueItem}
        
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
                    Thêm gói dịch vụ
                </Modal.Title>
                <Modal.CloseButton />
            </Modal.Header>

            <Modal.Body>

            {isCall && <Overlay w="100%" h="100%" pos="fixed" blur={2} zIndex={10000}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>}
        
                <FormContainer onSubmit={handleSubmit(onSubmit)}>
                    <Stack px="md">
                        <SimpleGrid cols={2}>
                            <TextInput
                                label="Tên gói"
                                withAsterisk
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Tên gói là bắt buộc",
                                    },
                                    pattern: {
                                        value: /^[\p{L}\s\p{N}]+$/u,
                                        message: "Tên gói không hợp lệ",
                                    },
                                    maxLength: {
                                        value: 200,
                                        message: "Tên gói không được quá 200 ký tự",
                                    },
                                })}
                                error={errors.name && <span>{errors.name.message}</span>}
                            ></TextInput>

                            <TextInput
                                label="Mô tả"
                                withAsterisk
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "Địa chỉ là bắt buộc",
                                    },

                                })}
                                error={errors.description && <span>{errors.description.message}</span>}
                            ></TextInput>
                        </SimpleGrid>
                        <SimpleGrid cols={2}>
                            <NumberInput
                                withAsterisk
                                label="Thời hạn"
                                defaultValue={duration}
                                value={duration}
                                min={0}
                                rightSection={<Text size="sm" pr={"1rem"}>ngày</Text>}
                                // error={!duration && <span>Thời hạn là bắt buộc</span>}
                                onChange={(value) => {
                                    value && setDuration(Number(value));
                                }}
                            />

                            <NumberInput
                                withAsterisk
                                value={price}
                                defaultValue={price}

                                min={0}

                                thousandSeparator=","
                                label="Giá gói"

                                rightSection={<Text size="sm" pr={"1rem"}>VND</Text>}
                                // error={!price && <span>Giá gói là bắt buộc</span>}
                                onChange={(value) => {
                                    value && setPrice(Number(value));
                                }}
                            />
                        </SimpleGrid>
                        <NativeSelect label="Loại gói"
                        defaultValue={type}
                            data={[
                                { label: 'Ứng viên', value: 'CANDIDATE_PLAN' },
                                { label: 'Nhà tuyển dụng', value: 'RECRUITER_PLAN' },
                            ]}
                            onChange={(value) => value && setType(value.currentTarget.value)}
                        />

                        <Flex justify={"space-between"} align={"center"} direction={"row"} w={"100%"} mb={"0.5rem"}>
                        <NativeSelect label="Quyền lợi" w={"45%"}
                            defaultValue={valueItem}
                            data={planItem}
                            onChange={(value) => {
                               setValueItem(value.currentTarget.value);
                               setNameValue(getName(value.currentTarget.value));
                               setTyptcurrent(getType(value.currentTarget.value));
                            }}
                        />
                        {typeCurrent === "BOOLEAN" && <NativeSelect label="Giá trị" w={"20%"}
                        defaultValue={valueBoolean}
                            data = {[
                                {value: "TRUE" , label: "Có"},
                                {value: "FALSE" , label: "Không"}
                            ]}
                            onChange={() => setvalueBoolean}
                        />}
                          {typeCurrent === "NUMBER" && <NumberInput label="Giá trị" defaultValue={valueNumber} onChange={(value) => setValueNumber(Number(value))}/>}
                          
                        <Button type="submit" variant="light" size="sm" mt={"1.3rem"} leftSection={<IconPlus stroke={1}/>}
                        onClick={() => {

                            const check = planItemValue.filter(e => String(e.id) === valueItem);

                            if(check.length === 0) {
                                if(typeCurrent === "BOOLEAN") {
                                    const data: IPlanItemValue = {id: Number(valueItem), name: nameValue , value: valueBoolean, type: typeCurrent};
                                    const list = planItemValue;
                                    list.push(data);
                                    setPlanItemValue(list);
                                    console.log(planItemValue);
                                }
                                if(typeCurrent === "NUMBER") {
                                    const data: IPlanItemValue = {id: Number(valueItem), name: nameValue , value: String(valueNumber), type: typeCurrent};
                                    const list = planItemValue;
                                    list.push(data);
                                    setPlanItemValue(list);
                                    console.log(planItemValue);
                                }
                            }
                            else {
                                notifications.show({title: "Thêm gói dịch vụ", message: "Quyền lợi đã tồn tại", color: "yellow"})
                            }
                        }}
                        >
                            
                                Thêm quyền lợi
                            </Button>
                        </Flex>

                        {planItemValue.map((data, index) => (
                                <Text size="xs" key={data.id + index}>{data.name} : {data.value}</Text>
                            ))}
                        

                        <Group justify="end" mb="md">
                            <Button variant="outline" onClick={() => {
                                close();
                                resetModal();
                            }} size="sm">
                                Huỷ
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                variant="gradient"
                                gradient={{ from: "blue", to: "teal", deg: 90 }} onClick={() => setOnSub(true)}
                            >
                                Thêm
                            </Button>
                        </Group>
                    </Stack>
                </FormContainer>
            </Modal.Body>
        </Modal.Content>
    </Modal.Root>);
}