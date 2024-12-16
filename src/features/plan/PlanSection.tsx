import PlanCard from "./PlanCard";
import { Button, Flex, Loader, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getAllPlan } from "@/api/plan";
import { useEffect, useState } from "react";
import { Plan } from "@data/interface/plan";
import { IconData } from "@data/constants/icon";
import { fetchCandidateProfile, fetchRecruiterProfile } from "@services/userService";
import Subscription from "@features/candidate/setting/components/Subscription";
import { useLocation, useNavigate } from "react-router-dom";

export default function PlanSection({type}) {

  const [planList, setPlanList] = useState<Plan[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const query = useQuery({
    queryKey: ["get-plan"],
    queryFn: () => getAllPlan(),
    staleTime: Infinity
  });

  const [vip, setCheckvip] = useState(false);

  const queryVip = useQuery({
    queryKey: ["check-vip-candidate"],
    queryFn: () => fetchCandidateProfile(),
    staleTime: Infinity
  });

  const queryVipRecruiter = useQuery({
    queryKey: ["check-vip-recruiter"],
    queryFn: () => fetchRecruiterProfile(),
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

  useEffect(() => {
    
    if(location.pathname.includes("tuyen-dung")) {
      if(queryVipRecruiter.data) {
        setCheckvip(queryVipRecruiter.data.vip);
      }
    }
    else {
      if(queryVip.data) {
        setCheckvip(queryVip.data.vip);
      }
    }

  },[location.pathname, queryVip.data, queryVipRecruiter.data])

  return (
   <>
   {!queryVip.isLoading && !vip && <Flex w={"100%"} direction={"column"} align={"center"} justify={"center"}>
      <Text fw={700} size="18px" mt={"2rem"}>Nâng cấp tài khoản VIP</Text>
      <Text fw={700} size="25px" c={"blue"} mt={"1rem"}>Để có trải nghiệm tốt hơn</Text>
      <Flex direction={"row"} gap={"xs"} wrap={'wrap'} align={"center"} justify={'center'}>
      
      {query.isLoading &&  <Loader mt={"3rem"}/>}
        {planList.map((plan, index) => (
          <PlanCard
            key={index}
            plan={plan}
            icon={IconData.filter(e => e.id === index+1)[0].icon}
          />
        ))}


      </Flex>
    </Flex>}
    {queryVip.isLoading &&  <Flex w={"100%"} align={"center"} justify={"center"}>
      <Loader mt={"3rem"} />
      </Flex>}

    {vip && <Flex direction={"column"}>
     <Flex direction={"row"} align={"center"} justify={"space-between"}>
     <Text fw={500} size="lg" ml="xs" my="md">
          Danh sách gói vip
        </Text>
        <Button variant="gradient" mr={"2%"} gradient={{from: "blue", to: "cyan", deg: 90}} onClick={() => {

          if(location.pathname.includes("tuyen-dung")) {
          
            navigate("/goi-dich-vu");
          }
          else {
            navigate("/goi-vip");
          }
        
        }}>
          Xem gói
        </Button>
     </Flex>
        <Flex w={"98%"} bg={"white"} p={"1rem"} style={{borderRadius: "10px"}}>
        <Subscription />
        </Flex>

      </Flex>}
   </>
  );
}
