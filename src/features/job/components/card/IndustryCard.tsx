import { Image, Container, Flex,Text,} from "@mantine/core";
import "../../company-card.scss"
import { IndustryCardData } from "@data/interface/industry";

export default function IndustryCard(props: IndustryCardData) {
    return (
        <Container key={props.id + "I2"}
        pos={"relative"}
        bg={"rgba(255,255,255,1"}
        w={"100%"}
        pt={"0.5rem"}
      pb={"0.5rem"}
        className="company-card"
       
        style={{ borderRadius: "0.5rem", cursor: "pointer"}} >
        <Flex direction="column" justify={"space-between"} align="center" w={"100%"}>
            <Image src={props.icon} w={50}/>
            <Text size="xs" fw={700} mt={"1rem"} ta={"center"}>{props.name}</Text>
            <Text size="xs" fw={500} c={"green"}>{props.numberJob} công việc</Text>
        </Flex>
        </Container>
    );
}