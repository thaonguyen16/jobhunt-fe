import { CompanyHotCardData } from "@data/interface/company";
import { Avatar, Button, Image, Container, Flex, Text} from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
import "../../company-card.scss"

type CompanyCardHotDataWithColor = CompanyHotCardData & { color: string }
export default function CompanyCardHot(props: CompanyCardHotDataWithColor) {
    return (
        <Container key={props.id + "C1"}
            pos={"relative"}
            bg={"rgba(255,255,255,1"}
            h={"12rem"}
            w={"100%"}
            pt={"0.5rem"}
            pb={"0.5rem"}
            className="company-card"

            style={{ borderRadius: "0.5rem", cursor: "pointer" }} >

            <Image
                src={"src/assets/img/rank.png"}
                h={"64px"}
                style={{ zIndex: 2 }}
                w={"64px"}
                pos={"absolute"}
                top={-20}
                right={-18}
            />

            <Text pos={"absolute"} top={-5} right={7} size="xl" fw={900} c={"white"} style={{ zIndex: 3 }}>{props.rank}</Text>
            <Container pos={"absolute"} top={0} left={0} w={"100%"} h={"8rem"} bg={props.color} m={0} p={0} style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem" }} />
            <Flex direction="row" justify="flex-start" align="center" w={"100%"} p={"sm"} gap={"xs"} h={"12rem"}>
                    
                    <Avatar src={props.image} size={100} variant="filled" bg={"white"} />

                    <Flex direction={"column"} gap={"xs"} style={{ zIndex: 2 }} justify="space-between">
                        <Text size="md" fw={700} c={"white"} mb={"2rem"}>{props.name.toUpperCase()}</Text>

                        <Flex pos={"absolute"} bottom={10} right={10} direction={"row"} align={"center"} justify={"flex-start"} gap={"md"} wrap={"wrap"}>
                            <Button size="xs" variant="light" color="#2d6a4f" leftSection={<IconBriefcase stroke={1.5} />}>{props.numberJob} việc đang tuyển</Button>
                            <Button size="xs" variant="light" color="gray">Hà Nội</Button>
                        </Flex>

                    </Flex>

                </Flex>
        </Container>
    );
}