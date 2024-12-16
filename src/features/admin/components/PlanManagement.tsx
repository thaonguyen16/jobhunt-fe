import {
  Flex,
  Button,
  Tooltip,
  Divider,
  Text,
  Tabs,
  rem,
  
  Table,
  NumberFormatter,
  Select,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBuilding, IconCircleDashedX, IconFilter, IconListDetails, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ModalAddPlan from "./plan/ModalAddPlan";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPlan, getCancelPlan } from "@/api/plan";
import { Plan } from "@data/interface/plan";
import ModalPlanDetail from "./plan/ModalPlanDetail";
import { notifications } from "@mantine/notifications";
import { Loader } from "@components/auth";

export default function PlanManagement() {

  const iconStyle = { width: rem(20), height: rem(20) };
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDetail, {open: openDetail, close: closeDetail }] = useDisclosure(false);
  const [planCurrent, setPlanCurrent] = useState<Plan | undefined>(undefined);
  const [value, setValue] = useState<string>('1');
  const [planList, setPlanList] = useState<Plan[]>([]);
  const [planListCandidate, setPlanListCandidate] = useState<Plan[]>([]);
  const [planListRecruiter, setPlanListRecruiter] = useState<Plan[]>([]);

  const functionBar = (<Flex gap="md" align="center" w={"100%"} justify={"flex-end"}>


<Select
leftSection={<IconFilter stroke={1}/>}
      label=""
      placeholder="Lọc gói"
      defaultValue={value}
      onChange={(value) => {value && setValue(value)}}
      data={[{label: "Tất cả", value: "1"},{label: "Đang hoạt động", value: "2"},{label: "Dừng hoạt động", value: "3"}]}
    />

    <Divider orientation="vertical" size="sm" />
    <Tooltip label="Thêm gói" position="right">
      <Button color="blue" size="xs" onClick={open}>
        <IoMdAdd className="h-4 w-4" />
      </Button>
    </Tooltip>
  </Flex>)

  useEffect(() => {
    if (opened) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [opened]);

  const query = useQuery({
    queryKey: ["get-plan"],
    queryFn: () => getAllPlan(),
    staleTime: Infinity
  });

  useEffect(() => {
    if (query.data) {
      console.log(query.data);
      setPlanList(query.data);
      setPlanListCandidate(query.data.filter(e => e.type === "CANDIDATE_PLAN"));
      setPlanListRecruiter(query.data.filter(e => e.type === "RECRUITER_PLAN"));

    }
  }, [query.data])

  useEffect(() => {
    if(value === "1") {
      setPlanListCandidate(planList.filter(e => e.type === "CANDIDATE_PLAN"));
      setPlanListRecruiter(planList.filter(e => e.type === "RECRUITER_PLAN"));
    }
    else if(value === "2") {
      setPlanListCandidate(planList.filter(e => e.type === "CANDIDATE_PLAN" && e.status === "ACTIVE"));
      setPlanListRecruiter(planList.filter(e => e.type === "RECRUITER_PLAN" && e.status === "ACTIVE"));
    }
    else if(value === "3") {
      setPlanListCandidate(planList.filter(e => e.type === "CANDIDATE_PLAN" && e.status === "STOPPED"));
      setPlanListRecruiter(planList.filter(e => e.type === "RECRUITER_PLAN" && e.status === "STOPPED"));
    }
  },[planList, value])

  const useClient = useQueryClient();
  
  const processCancelPlan = async(id: number) => {
    await getCancelPlan(id).then((data) => {

      if(data.status === "success") {
        useClient.invalidateQueries({ queryKey: ["get-plan"] });
        notifications.show({title: "Hủy gói", message: "Hủy gói thành công" , color: "green"});
      }
      else {
        notifications.show({title: "Hủy gói", message: "Hủy gói không thành công" , color: "red"});
      }
    })
  }

  const rowsCandidate = planListCandidate.map((element) => (
    <Table.Tr key={element.name + element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.duration} ngày</Table.Td>
      <Table.Td><NumberFormatter thousandSeparator value={element.price} suffix=" VND" /></Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
      <Table.Td>
        <Flex direction={"row"} gap={"md"}>
          <Tooltip label="Xem chi tiết" style={{ cursor: "pointer" }}>
            <IconListDetails stroke={1} style={{ cursor: "pointer" }} onClick={() => {openDetail();setPlanCurrent(element)}}/>
          </Tooltip>
          <Tooltip label="Hủy gói" style={{ cursor: "pointer" }}>
            <IconCircleDashedX stroke={1} style={{ cursor: "pointer" }} onClick={() => {
              processCancelPlan(element.id);
            }}/>
          </Tooltip>
        </Flex>
      </Table.Td>
      <Table.Td>
        {element.status === "ACTIVE" && <Button variant="light" color="green">
          Đang hoạt động
        </Button>}
        {element.status === "STOPPED" && <Button variant="light" color="red">
          Dừng hoạt động
        </Button>}
      </Table.Td>
      <Table.Td>{element.number}</Table.Td>
    </Table.Tr>
  ));

  const rowsRecruiter = planListRecruiter.map((element) => (
    <Table.Tr key={element.name + element.id}>
      <Table.Td>{element.id}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.duration} ngày</Table.Td>
      <Table.Td><NumberFormatter thousandSeparator value={element.price} suffix=" VND" /></Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
      <Table.Td>
        <Flex direction={"row"} gap={"md"}>
           <Tooltip label="Xem chi tiết" style={{ cursor: "pointer" }}>
           <IconListDetails stroke={1} style={{ cursor: "pointer" }} onClick={() => {openDetail();setPlanCurrent(element)}}/>
          </Tooltip>
          <Tooltip label="Hủy gói" style={{ cursor: "pointer" }}>
          <IconCircleDashedX stroke={1} style={{ cursor: "pointer" }} onClick={() => {
              processCancelPlan(element.id);
            }}/>
          </Tooltip>
        </Flex>
      </Table.Td>
      <Table.Td>
        {element.status === "ACTIVE" && <Button variant="light" color="green">
          Đang hoạt động
        </Button>}
        {element.status === "STOPPED" && <Button variant="light" color="red">
          Dừng hoạt động
        </Button>}
      </Table.Td>
      <Table.Td>{element.number}</Table.Td>
    </Table.Tr>
  ));


  return (
    <>
      <ModalAddPlan opened={opened} close={close} key={"modeladdPlan"} />
      {planCurrent && <ModalPlanDetail opened={openedDetail} close={closeDetail} key={"modalPlanDetail" + planCurrent.id} plan={planCurrent} cancel={true}/>}
      <div>
        <Text fw={500} size="lg" ml="xs" my="md">
          Quản lý gói dịch vụ
        </Text>
      </div>
      <div className="bg-white shadow-md rounded-md px-4 py-2 mt-2">
        <Flex direction="column" mt="lg" gap="sm" mih={"5rem"}>
          {functionBar}
          <Tabs defaultValue="candidate">
            <Tabs.List>
              <Tabs.Tab value="candidate" leftSection={<IconUser style={iconStyle} stroke={1} />}>
                Ứng viên
              </Tabs.Tab>
              <Tabs.Tab value="recruiter" leftSection={<IconBuilding style={iconStyle} stroke={1} />}>
                Nhà tuyển dụng
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="candidate">

              <Flex w={"100%"} align={"center"} justify={"center"}>
                {planListCandidate.length !== 0 && <Table mt={"1rem"}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Mã gói</Table.Th>
                      <Table.Th>Tên gói</Table.Th>
                      <Table.Th>Thời hạn</Table.Th>
                      <Table.Th>Giá</Table.Th>
                      <Table.Th>Ngày tạo</Table.Th>
                      <Table.Th>Hành động</Table.Th>
                      <Table.Th>Tình trạng gói</Table.Th>
                      <Table.Th>Số lượng đăng ký</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rowsCandidate}</Table.Tbody>
                </Table>
                }

                {query.isLoading && <Loader />}

                {!query.isLoading && planListCandidate.length === 0 && <Text mt={"1rem"} mb={"1rem"}>Không có dữ liệu</Text>}
              </Flex>

            </Tabs.Panel>

            <Tabs.Panel value="recruiter">
              <Flex w={"100%"} align={"center"} justify={"center"}>
                {planListRecruiter.length !== 0 && <Table mt={"1rem"}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Mã gói</Table.Th>
                      <Table.Th>Tên gói</Table.Th>
                      <Table.Th>Thời hạn</Table.Th>
                      <Table.Th>Giá</Table.Th>
                      <Table.Th>Ngày tạo</Table.Th>
                      <Table.Th>Hành động</Table.Th>
                      <Table.Th>Tình trạng gói</Table.Th>
                      <Table.Th>Số lượng đăng ký</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rowsRecruiter}</Table.Tbody>
                </Table>}

                {query.isLoading &&  <Loader />}

                {!query.isLoading && planListRecruiter.length === 0 && <Text mt={"1rem"} mb={"1rem"}>Không có dữ liệu</Text>}
              </Flex>
            </Tabs.Panel>

          </Tabs>
        </Flex>
      </div>
    </>
  );
}
