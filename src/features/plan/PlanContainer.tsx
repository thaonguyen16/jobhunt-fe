import PlanCard from "./PlanCard";
import { Flex, Loader, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getAllPlan } from "@/api/plan";
import { useEffect, useState } from "react";
import { Plan } from "@data/interface/plan";
import { IconData } from "@data/constants/icon";

export default function PlanContainer({type}) {

    const [planList, setPlanList] = useState<Plan[]>([]);
  
    const query = useQuery({
      queryKey: ["get-plan"],
      queryFn: () => getAllPlan(),
      staleTime: Infinity
    });

     useEffect(()=> {
        if(query.data) {
          setPlanList(query.data)
    
          if(type === "CANDIDATE_PLAN") {
            setPlanList(query.data.filter(e => e.type === "CANDIDATE_PLAN"))
          }
          else if(type === "RECRUITER_PLAN") {
            setPlanList(query.data.filter(e => e.type === "RECRUITER_PLAN"))
          }
        }
      },[query.data, type]);

    return (
        
   <>
    <Flex w={"100%"} direction={"column"} align={"center"} justify={"center"}>
        <Text fw={700} size="18px" mt={"2rem"}>Nâng cấp tài khoản VIP</Text>
        <Text fw={700} size="25px" c={"blue"} mt={"1rem"}>Để có trải nghiệm tốt hơn</Text>
        <Flex direction={"row"} gap={"xs"} wrap={'wrap'} align={"center"} justify={'center'}>

            {query.isLoading && <Loader mt={"3rem"} />}
            {planList.map((plan, index) => (
                <PlanCard
                    key={index}
                    plan={plan}
                    icon={IconData.filter(e => e.id === index + 1)[0].icon}
                />
            ))}


        </Flex>
    </Flex>;
   </>
    )
}