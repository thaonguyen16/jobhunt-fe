import { proccessCallback } from "@/api/payment";
import MediumContainerNoBG from "@components/ui/MediumContainerNoBG";
import { Flex,Image,Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function PaymentCallback() {
    const location = useLocation();
    const url = location.search;

    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(true);

    console.log(url);

    useEffect(() => {
        const proccess = async() => {
            await proccessCallback(url).then((data) => {
                setLoading(false);
                if(data.status === "success") {
                    setStatus(true);
                }
                else{
                    setStatus(false);
                }

                console.log(data);
            })
        }
        proccess();
    },[url])
    
    return (<MediumContainerNoBG>
    <Flex w={"100%"} align={"center"} justify={"center"} mih={"20rem"}direction={"column"} gap={"md"}>
        <Text fw={700} size="25px" c={"#0581e6"}>Kết quả thanh toán</Text>

        {loading && <Image src="/src/assets/icons/spinner.gif" w={"200px"}/>}
        {loading && <Text>Đang chờ kết quả ...</Text>}

        {!loading && status && <Flex direction={"column"} mt={"3rem"}>
        <Image src="/src/assets/icons/success.png" w={"128px"} mt={"1rem"}/>
        <Text mt={"1rem"}>Thanh toán thành công</Text>
        </Flex>}
        {!loading && !status && <Flex direction={"column"}mt={"3rem"}>
        <Image src="/src/assets/icons/fail.png" w={"128px"}/>
        <Text mt={"1rem"}>Thanh toán thất bại</Text>
        </Flex>}

    </Flex>
    </MediumContainerNoBG>)
}