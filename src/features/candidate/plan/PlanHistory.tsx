import { getAll } from "@/api/payment";
import { Transaction } from "@data/interface/payment";
import { Flex, Loader,Text, Table, NumberFormatter, Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function PlanHistory() {

    const [historyList, setHistoryList] = useState<Transaction[]>([])

    const query = useQuery({
        queryKey: ["get-transaction"],
        queryFn: () => getAll(),
        staleTime: Infinity
      });

      useEffect(() => {
        if(query.data) {
          setHistoryList(query.data);
        }
      },[query.data])
    
      const rowsActive = historyList.map((element) => (
        <Table.Tr key={element.orderId + element.id}>
          <Table.Td>{element.orderId}</Table.Td>
          <Table.Td>{element.transactionDate}</Table.Td>
          <Table.Td><NumberFormatter thousandSeparator value={element.amount} suffix=" VND" /></Table.Td>
          <Table.Td>Gói {element.planName}</Table.Td>
        
          <Table.Td>
            {element.status === "SUCCESS" && <Button variant="light" color="green">
              Thành công
            </Button>}
            {element.status === "FAIL" && <Button variant="light" color="red">
              Thất bại
            </Button>}
            {element.status === "CREATED" && <Button variant="light" color="yellow">
              Đã tạo
            </Button>}
          </Table.Td>
          
        </Table.Tr>
      ));

    return (
        <Flex w={"100%"} align={"center"} justify={"center"} direction={"column"} mb={"3rem"}>
            <Text fw={500} size="lg" ml="xs" my="md" w={"100%"} ta={"left"}>
          Lịch sử giao dịch
        </Text>
        <Flex w={"98%"} p={"xs"} bg={"white"} style={{borderRadius: "10px"}}>
        {historyList.length !== 0 && <Table mt={"1rem"}>
            <Table.Thead w={"80%"}>
              <Table.Tr>
                <Table.Th>Mã đơn hàng</Table.Th>
                <Table.Th>Ngày giao dịch</Table.Th>
                <Table.Th>Giá</Table.Th>
                <Table.Th>Tên gói</Table.Th>
                <Table.Th>Tình trạng</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rowsActive}</Table.Tbody>
          </Table>
          }

          {query.isLoading && <Loader />}

          {!query.isLoading && historyList.length === 0 && <Text mt={"1rem"} mb={"1rem"}>Không có dữ liệu</Text>}
        </Flex>
        </Flex>
    );
}