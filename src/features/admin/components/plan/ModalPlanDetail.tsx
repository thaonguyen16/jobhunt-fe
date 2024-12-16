import { Plan } from "@data/interface/plan";
import { Button, Group, Modal, NumberFormatter, Table, Text } from "@mantine/core";

export default function ModalPlanDetail({ plan, opened, close,cancel }: { plan: Plan, opened: boolean, close: () => void,cancel: boolean }) {
    return (<Modal.Root
        className="modal-company"
        opened={opened}
        onClose={close}
        key={plan.id + plan.name}

        size={"60%"}
        transitionProps={{
            transition: "fade",
            duration: 400,
            timingFunction: "linear",
        }}
        closeOnClickOutside={false}
    >
        <Modal.Overlay backgroundOpacity={0.8} />
        <Modal.Content>
            <Modal.Header>
                <Modal.Title ta={"center"} w={"100%"} fw={700}>
                    Chi tiết gói
                </Modal.Title>
                <Modal.CloseButton />
            </Modal.Header>

            <Modal.Body>
                <Table variant="vertical" layout="fixed" withTableBorder mt={"2rem"}>
                    <Table.Tbody>
                    <Table.Tr>
                            <Table.Th w={160}>Mã gói</Table.Th>
                            <Table.Td>{plan.id}</Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Th w={160}>Tên gói</Table.Th>
                            <Table.Td>{plan.name}</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Mô tả</Table.Th>
                            <Table.Td>{plan.description}</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Chu kỳ</Table.Th>
                            <Table.Td>{plan.duration} ngày</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Giá gói</Table.Th>
                            <Table.Td><NumberFormatter value={plan.price} suffix=" VND" thousandSeparator></NumberFormatter></Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Ngày tạo</Table.Th>
                            <Table.Td>{plan.createdAt}</Table.Td>
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Loại gói</Table.Th>
                            {plan.type === "CANDIDATE_PLAN" ? <Table.Td>Ứng viên</Table.Td> : <Table.Td>Nhà tuyển dụng</Table.Td>}
                            
                        </Table.Tr>

                        <Table.Tr>
                            <Table.Th>Quyền lợi</Table.Th>
                           <Table.Td>
                            {plan.planItemValueList.map((e, index) => <Text size="sm">{index+1 + ". " + e.name + " : "} {e.value !== "TRUE" && e.value !== "FALSE" && e.value} {e.value === "TRUE" && "Có"} {e.value === "FALSE" && "Không"}</Text>)}
                           </Table.Td>
                            
                        </Table.Tr>


                    </Table.Tbody>
                </Table>
                <Group justify="end" mb="md" mt={"2rem"}>
                            <Button variant="outline" onClick={close} size="sm">
                                Thoát
                            </Button>
                            {cancel && <Button
                            
                            size="sm"
                            variant="light"
                            color="red"
                            onClick={() => {}}
                        >
                            Hủy gói
                        </Button>}
                        </Group>
            </Modal.Body>
        </Modal.Content>
    </Modal.Root>

    );
}