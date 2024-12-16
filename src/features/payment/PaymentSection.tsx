import {
  Card,
  Container,
  Divider,
  Grid,
  SimpleGrid,
  Text,
  Image,
  Radio,
  Stack,
  Button,
  NumberFormatter,
  Flex,
} from "@mantine/core";
import { PaymentMethod } from "./test-data";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardRadio from "./CardRadio";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { Plan } from "@data/interface/plan";
import { IPayment } from "@data/interface/payment";
import { createOrder } from "@/api/payment";

type PlanProps = {
  plan: Plan;
  icon: string;
}

export default function PaymentSection() {
  const [value, setValue] = useState<string | null>(null);
  const location = useLocation();
  const planPackage: PlanProps = location.state;
  const [count, setCount] = useState(0);

  const getBackgroudColor = (name: string) => {
    const background = "white";
    if(name == value) {
      return background;
    }
    return "white";
  }

  const getBorderColor = (name: string) => {
    const background = "2px solid rgba(5, 129, 230, 1)";
    if(name == value) {
      return background;
    }
    return "white";
  }

  const handelSubmit = async(data: IPayment) => {
    await createOrder(data).then((data) => {
      if(data.status === "success") {
        window.open(
          data.data.url,
          "_self"
        );
      }
      console.log(data);
    })
  }

  return (
    <>
      <Text size="25px" fw="700" c="blue" ta="center" mt="20px" mb="20px">
        Thanh toán tài khoản VIP
      </Text>
      <Container my="md" w="100%">
        <Grid>
          {/* Subscribe Plan */}
          <Grid.Col span={{ base: 12, xs: 6 }}>
            <Text size="17px" fw="550" mb="20px">
              Gói nâng cấp
            </Text>
            <Card shadow="sm" padding="x1" radius="20px" key={"Card1"}>
              <Card.Section ml="20px" mr="20px" mt="20px" mb="20px">
                <Image
                  src={planPackage.icon}
                  h="50px"
                  w="50px"
                  mb="20px"
                ></Image>
                <SimpleGrid cols={2}>
                  <Text ta="left" size="15px" fw="700">
                    {planPackage.plan.name}
                  </Text>
                  <Text ta="right" size="15px" mt="10px">
                  {planPackage.plan.duration} ngày
                </Text>
                  
                 
                </SimpleGrid>
                <Flex w={"100%"} align={"center"} justify={"center"}>
                  <NumberFormatter thousandSeparator value={planPackage.plan.price} style={{
                    fontWeight: 700,
                    fontSize: "25px",
                    color: "#0581e6",
                    textAlign: "center",
                    width: "100%",
                  }}/>
                  </Flex>
                <Divider my="md"></Divider>

                {planPackage.plan.planItemValueList.map((item, index) => (
              <Typography
                key={item.name + index}
                sx={{
                  color: "black",
                  fontSize: "14px",
                  textAlign: "left",
                  marginTop: "5px",
                }}
              >
                <CheckCircleIcon
                  sx={{
                    fontSize: "20px",
                    color: "rgba(105, 193, 125,0.9)",
                    fontWeight: "bold",
                    marginRight: "10px",
                  }}
                />
                {item.name + " : "} {item.value !== "TRUE" && item.value !== "FALSE" && item.value + " lượt"} {item.value === "TRUE" && "Có"} {item.value === "FALSE" && "Không"}
              </Typography>
            ))}
              </Card.Section>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 6 }}>
            <Text size="17px" fw="550" mb="20px">
              Phương thức thanh toán
            </Text>

            <Radio.Group value={value} onChange={setValue}>
              <Stack>
                {PaymentMethod.map((pay, index) => (
                  <CardRadio
                    key={index}
                    id={pay.id}
                    name={pay.name}
                    icon={pay.icon}
                    background= {getBackgroudColor(pay.name)}
                    border = {getBorderColor(pay.name)}
                  />
                ))}
              </Stack>
            </Radio.Group>
          

            <Button
              variant="light"
              w="100%"
              size="16px"
              fw="700"
              h="40px"
              mt="20px"
              style={{
                backgroundColor: "rgba(5, 129, 230, .1)",

                "&:hover": {
                  backgroundColor: "rgba(5, 129, 230, 1)",
                  color: "white",
                },
              }}

              onClick={() => {
                if(count === 0) {
                  const payment: IPayment = {
                    amount: planPackage.plan.price,
                    orderInfo: "Đăng ký gói " + planPackage.plan.name,
                    plan: planPackage.plan.id 
                  }
                  handelSubmit(payment);
                }
                setCount(1);
              }}
            >
              Thanh toán
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
