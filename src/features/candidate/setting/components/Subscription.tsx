import { getSubByUser } from "@/api/subscription";
import { Button, Flex, Loader, NumberFormatter, rem, Table, Tabs,Text, Tooltip } from "@mantine/core";
import { IconClockCancel, IconLaurelWreath1, IconListDetails } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubscriptionData } from "@data/interface/subscription";
import ModalPlanDetail from "@features/admin/components/plan/ModalPlanDetail";
import { Plan } from "@data/interface/plan";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

export default function Subscription() {

    const [subListActive, setSubListActive] = useState<SubscriptionData[]>([]);
    const [subListExpired, setSubListExpired] = useState<SubscriptionData[]>([]);
    const [plan, setPlan] = useState<Plan | undefined>(undefined);
    const [opened, {open,close}] = useDisclosure(false);

    const location = useLocation();


    const iconStyle = { width: rem(20), height: rem(20) };
    const query = useQuery({
        queryKey: ["subscription-user"],
        queryFn: () => getSubByUser(),
        staleTime: Infinity
      });

    useEffect(() => {
        if(query.data) {

          if(location.pathname.includes("tuyen-dung")) {
            console.log(query.data);
            setPlan(query.data[0].plan);
            setSubListActive(query.data.filter(e => e.status === "ACTIVE" && e.plan.type === "RECRUITER_PLAN"))
            setSubListExpired(query.data.filter(e => e.status === "EXPIRED" && e.plan.type === 'RECRUITER_PLAN'))
          }
          else {
            console.log(query.data);
            setPlan(query.data[0].plan);
            setSubListActive(query.data.filter(e => e.status === "ACTIVE" && e.plan.type === "CANDIDATE_PLAN"))
            setSubListExpired(query.data.filter(e => e.status === "EXPIRED" && e.plan.type === 'CANDIDATE_PLAN'))
          }
        }
    },[location.pathname, query.data])

    const rowsActive = subListActive.map((element) => (
        <Table.Tr key={element.plan.name + element.id}>
          <Table.Td>{element.plan.name}</Table.Td>
          <Table.Td><NumberFormatter thousandSeparator value={element.plan.price} suffix=" VND" /></Table.Td>
          <Table.Td>{element.plan.duration} ngày</Table.Td>
          <Table.Td>{element.startDate}</Table.Td>
          <Table.Td>{element.endDate}</Table.Td>
          <Table.Td>
            {element.status === "ACTIVE" && <Button variant="light" color="green">
              Đang hoạt động
            </Button>}
            {element.status === "EXPIRED" && <Button variant="light" color="red">
              Hết hạn
            </Button>}
          </Table.Td>
          
          <Table.Td>
            <Flex direction={"row"} gap={"md"}>
              <Tooltip label="Xem chi tiết" style={{ cursor: "pointer" }}>
                <IconListDetails stroke={1} style={{ cursor: "pointer" }} onClick={() => {open();setPlan(element.plan)}}/>
              </Tooltip>
              
            </Flex>
          </Table.Td>
          
        </Table.Tr>
      ));

      const rowsExpired = subListExpired.map((element) => (
        <Table.Tr key={element.plan.name + element.id}>
          <Table.Td>{element.plan.name}</Table.Td>
          <Table.Td><NumberFormatter thousandSeparator value={element.plan.price} suffix=" VND" /></Table.Td>
          <Table.Td>{element.plan.duration} ngày</Table.Td>
          <Table.Td>{element.startDate}</Table.Td>
          <Table.Td>{element.endDate}</Table.Td>
          <Table.Td>
            {element.status === "ACTIVE" && <Button variant="light" color="green">
              Đang hoạt động
            </Button>}
            {element.status === "EXPIRED" && <Button variant="light" color="red">
              Hết hạn
            </Button>}
          </Table.Td>
          
          <Table.Td>
            <Flex direction={"row"} gap={"md"}>
              <Tooltip label="Xem chi tiết" style={{ cursor: "pointer" }}>
                <IconListDetails stroke={1} style={{ cursor: "pointer" }} onClick={() => {open();setPlan(element.plan)}}/>
              </Tooltip>
              
            </Flex>
          </Table.Td>
          
        </Table.Tr>
      ));

    return (<>
    
    <Flex w={"100%"}>
    {plan && <ModalPlanDetail plan={plan} opened={opened} close={close} cancel={false}/>}
    <Tabs defaultValue="candidate" w={"100%"}>
            <Tabs.List>
              <Tabs.Tab value="candidate" leftSection={<IconLaurelWreath1 style={iconStyle} stroke={1} />}>
                Đang hoạt động
              </Tabs.Tab>
              <Tabs.Tab value="recruiter" leftSection={<IconClockCancel style={iconStyle} stroke={1} />}>
                Hết hạn
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="candidate">

              <Flex w={"100%"} align={"center"} justify={"center"}>
              {subListActive.length !== 0 && <Table mt={"1rem"}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Tên gói</Table.Th>
                      <Table.Th>Giá gói</Table.Th>
                      <Table.Th>Chu kỳ</Table.Th>
                      <Table.Th>Ngày đăng ký</Table.Th>
                      <Table.Th>Ngày hết hạn</Table.Th>
                      <Table.Th>Tình trạng</Table.Th>
                      <Table.Th>Hành động</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rowsActive}</Table.Tbody>
                </Table>
                }

                {query.isLoading && <Loader />}

                {!query.isLoading && subListActive.length === 0 && <Text mt={"1rem"} mb={"1rem"}>Không có dữ liệu</Text>}
              </Flex>

            </Tabs.Panel>

            <Tabs.Panel value="recruiter">
            <Flex w={"100%"} align={"center"} justify={"center"}>
            {subListExpired.length !== 0 && <Table mt={"1rem"}>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Tên gói</Table.Th>
                      <Table.Th>Giá gói</Table.Th>
                      <Table.Th>Chu kỳ</Table.Th>
                      <Table.Th>Ngày đăng ký</Table.Th>
                      <Table.Th>Ngày hết hạn</Table.Th>
                      <Table.Th>Tình trạng</Table.Th>
                      <Table.Th>Hành động</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rowsExpired}</Table.Tbody>
                </Table>
                }

                {query.isLoading && <Loader />}

                {!query.isLoading && subListExpired.length === 0 && <Text mt={"1rem"} mb={"1rem"}>Không có dữ liệu</Text>}
              </Flex>
            </Tabs.Panel>

          </Tabs>
    </Flex>
    </>);
}