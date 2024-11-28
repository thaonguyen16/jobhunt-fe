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
} from "@mantine/core";
import { PaymentMethod, SellectPlan } from "./test-data";
import CheckIcon from "@mui/icons-material/Check";
import CardRadio from "./CardRadio";
import { useState } from "react";


const decorPrice = (price: number) => {
  let priceDecor = "Fee";
  if (price == 0) {
    priceDecor = "Miễn phí";
  } else {
    priceDecor = new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    }).format(price);

    return priceDecor;
  }
};

export default function PaymentSection() {
  const [value, setValue] = useState<string | null>(null);

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
                  src={SellectPlan.icon}
                  h="50px"
                  w="50px"
                  mb="20px"
                ></Image>
                <SimpleGrid cols={2}>
                  <Text ta="left" size="15px" fw="700">
                    {SellectPlan.name}
                  </Text>
                  <Text ta="right" size="15px" fw="700">
                    {decorPrice(SellectPlan.price)}
                  </Text>
                </SimpleGrid>
                <Text ta="left" size="15px" mt="10px">
                  {SellectPlan.duration}
                </Text>
                <Divider my="md"></Divider>

                {SellectPlan.feature.map((text, index) => (
                  <Text key={index} ta="left" size="13px">
                    <CheckIcon
                      sx={{
                        fontSize: "20px",
                        color: "rgba(105, 193, 125,0.9)",
                        fontWeight: "bold",
                        marginRight: "10px",
                      }}
                    ></CheckIcon>

                    {text}
                  </Text>
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
            >
              Thanh toán
            </Button>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
