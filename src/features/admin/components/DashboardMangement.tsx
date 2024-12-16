import { Text, Group, Stack, Flex, SimpleGrid, NumberFormatter, Badge } from "@mantine/core";
import { AreaChart, PieChart } from "@mantine/charts";
import JobMonthlyReport from "./JobMonthlyReport";
import JobApplicationMonthlyReport from "./JobApplicationMonthlyReport";
import { getCountUser, getIndustryChart, getRatioCandidateChart, getRatioRecruiterChart, getRevenue, getStatics, getTrafficChart } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { IconArrowRightToArc, IconBriefcase, IconBuildings, IconMoneybag, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { IndustryChart, Static, TrafficChart } from "@data/interface/static";
import { ColorData } from "@data/constants/color";

export default function DashboardManagement() {

  const [statics, setStatics] = useState<Static | undefined>(undefined);
  const [traffic, setTraffic] = useState<TrafficChart[]>([]);
  const [industryChartData, setIndustryChartData] = useState<IndustryChart[]>([]);
  const [revenue, setRevenue] = useState<TrafficChart[]>([]);
  const [ratioCandidate, setRatioCandidate] = useState<IndustryChart[]>([]);
  const [ratioRecruiter, setRatioRecruiter] = useState<IndustryChart[]>([]);
  

  const countQuery = useQuery({
    queryKey: ["user_count"],
    queryFn: () => getCountUser(),
  });

  const countStatics = useQuery({
    queryKey: ["user_statics"],
    queryFn: () => getStatics(),
  });

  const trafficChart = useQuery({
    queryKey: ["traffic_chart"],
    queryFn: () => getTrafficChart(),
  });
  const industryChart = useQuery({
    queryKey: ["industry_chart"],
    queryFn: () => getIndustryChart(),
  });
  const revenueChart = useQuery({
    queryKey: ["revenue_chart"],
    queryFn: () => getRevenue(),
  });
  const ratioCandidateChart = useQuery({
    queryKey: ["ratio_candidate"],
    queryFn: () => getRatioCandidateChart(),
  });
  const ratioRecruiterChart = useQuery({
    queryKey: ["ratio_recruiter"],
    queryFn: () => getRatioRecruiterChart(),
  });

  useEffect(() => {
    if (countStatics.data) {
      setStatics(countStatics.data);
    }
  }, [countStatics.data]);

  useEffect(() => {
    if (revenueChart.data) {
      setRevenue(revenueChart.data);
    }
  }, [revenueChart.data]);

  useEffect(() => {
    if (industryChart.data) {
      const dataList: IndustryChart[] = [];
      industryChart.data.forEach((e, index) => {
        const newData: IndustryChart = {
          name: e.date,
          value: e.number,
          color: ColorData[index].value
        }

        dataList.push(newData);

      });

      setIndustryChartData(dataList);
    }
  }, [industryChart.data]);

  useEffect(() => {
    if (ratioCandidateChart.data) {
      const dataList: IndustryChart[] = [];
      ratioCandidateChart.data.forEach((e, index) => {
        const newData: IndustryChart = {
          name: e.date,
          value: e.number,
          color: ColorData[index + 3].value
        }

        dataList.push(newData);

      });

      if(dataList.length >= 2) {
        dataList[0].color = ColorData[3].value;
        dataList[1].color = ColorData[4].value;
      }

      setRatioCandidate(dataList);
    }
  }, [ratioCandidateChart.data]);

  useEffect(() => {
    if (ratioRecruiterChart.data) {
      const dataList: IndustryChart[] = [];
      ratioRecruiterChart.data.forEach((e, index) => {
        const newData: IndustryChart = {
          name: e.date,
          value: e.number,
          color: ColorData[index + 3].value
        }

        dataList.push(newData);

      });

      if(dataList.length >= 2) {
        dataList[0].color = ColorData[6].value;
        dataList[1].color = ColorData[4].value;
      }

      setRatioRecruiter(dataList);
    }
  }, [ratioRecruiterChart.data]);


  useEffect(() => {
    if (trafficChart.data) {
      setTraffic(trafficChart.data);
    }
  }, [trafficChart.data]);

  return (
    <div className="pb-10">

      <SimpleGrid cols={5} mt={"1rem"}>

        <Flex bg={"rgba(255,255,255,.7)"} direction={"column"} align={"center"} justify={"center"} style={{ borderRadius: '10px' }} p={"0.5rem"}>
          <IconArrowRightToArc size={"2rem"} stroke={1} color="orange" />
          <Text size="sm" mt={"0.5rem"}>
            Truy cập
          </Text>
          <Text fw={500} mt={"0.5rem"}>
            {statics && statics.access}
          </Text>
        </Flex>

        <Flex bg={"rgba(255,255,255,.7)"} direction={"column"} align={"center"} justify={"center"} style={{ borderRadius: '10px' }} p={"0.5rem"}>
          <IconUser size={"2rem"} stroke={1} color="green" />
          <Text size="sm" mt={"0.5rem"}>
            Ứng viên
          </Text>
          <Text fw={500} mt={"0.5rem"}>
            {countQuery?.data?.data?.candidateNo}
          </Text>
        </Flex>

        <Flex bg={"rgba(255,255,255,.7)"} direction={"column"} align={"center"} justify={"center"} style={{ borderRadius: '10px' }} p={"0.5rem"}>
          <IconBuildings size={"2rem"} stroke={1} color="teal" />
          <Text size="sm" mt={"0.5rem"}>
            Doanh nghiệp
          </Text>
          <Text fw={500} mt={"0.5rem"}>
            {countQuery?.data?.data?.employerNo}
          </Text>
        </Flex>

        <Flex bg={"rgba(255,255,255,.7)"} direction={"column"} align={"center"} justify={"center"} style={{ borderRadius: '10px' }} p={"0.5rem"}>
          <IconBriefcase size={"2rem"} stroke={1} color="purple" />
          <Text size="sm" mt={"0.5rem"}>
            Công việc
          </Text>
          <Text fw={500} mt={"0.5rem"}>
            {statics && statics.job}
          </Text>
        </Flex>

        <Flex bg={"rgba(255,255,255,.7)"} direction={"column"} align={"center"} justify={"center"} style={{ borderRadius: '10px' }} p={"0.5rem"}>
          <IconMoneybag size={"2rem"} stroke={1} color="red" />
          <Text size="sm" mt={"0.5rem"}>
            Tổng doanh thu
          </Text>

          <NumberFormatter thousandSeparator value={statics && statics.revenue} suffix=" VND" style={{ marginTop: "0.5rem", fontWeight: "500" }} />


        </Flex>


      </SimpleGrid>


      <Flex w={"100%"} direction={"row"} gap={"sm"}>
        <Flex p={"sm"} bg={"rgba(255,255,255,.5"} mt={"2rem"} style={{ borderRadius: "20px" }} w={"50%"} direction={"column"}>
          <Text mt={"0.5rem"} mb={"2rem"} ta={"center"} fw={700}>Lưu lượng truy cập</Text>
          <AreaChart
            h={300}
            data={traffic}
            dataKey="date"
            withDots={false}
            series={[
              { name: 'number', color: 'green', label: "Số lượng" },
            ]}
            curveType="natural"
          />
        </Flex >
        <Flex p={"sm"} bg={"rgba(255,255,255,.5"} mt={"2rem"} style={{ borderRadius: "20px" }} w={"50%"} direction={"column"}>
          <JobMonthlyReport />
        </Flex>
      </Flex>


      <div className="rounded-md bg-white">
        <Group mt="lg" grow mb="lg" px="lg" py="md" gap="lg" align="start">
          <Stack justify="flex-start" h="100%" align="center">
            <Text fw={500} m="auto">
              Lĩnh vực tuyển dụng nhiều nhất
            </Text>
            <PieChart size={250} data={industryChartData} withLabelsLine={false} labelsType="value" labelColor="black" labelsPosition="outside" withLabels withTooltip tooltipDataSource="segment" mx="auto" />
          </Stack>
          <Stack align="center" h="100%" justify="flex-end" mt={"6rem"}>
            <SimpleGrid cols={2}>
              {industryChartData.map((e, index) => <Flex key={e.name + index} gap={"xs"}>
                <Badge h={20} w={20} circle color={e.color}></Badge>
                <Text>{e.name}</Text>
              </Flex>)}
            </SimpleGrid>
          </Stack>
        </Group>
      </div>

      <Flex p={"sm"} bg={"rgba(255,255,255,.5"} mt={"2rem"} style={{ borderRadius: "20px" }} w={"100%"} direction={"column"}>
        <Text mt={"0.5rem"} mb={"2rem"} ta={"center"} fw={700}>Doanh thu</Text>
        <AreaChart
          h={300}
          data={revenue}
          dataKey="date"
          withDots={false}
          series={[
            { name: 'number', color: 'red', label: "Doanh thu" },
          ]}
          curveType="natural"
        />
      </Flex >

      <Flex p={"sm"} bg={"rgba(255,255,255,.5"} mt={"2rem"} style={{ borderRadius: "20px" }} w={"100%"} direction={"column"} mb={"3rem"}>
        <Text mt={"0.5rem"} mb={"2rem"} ta={"center"} fw={700}>Ti lệ đăng ký gói</Text>

        <Flex direction={"row"}>
        <PieChart size={250} data={ratioCandidate} withLabelsLine={false} labelsType="percent" labelColor="black" labelsPosition="outside" withLabels withTooltip tooltipDataSource="segment" mx="auto" />
        <PieChart size={250} data={ratioRecruiter} withLabelsLine={false} labelsType="percent" labelColor="black" labelsPosition="outside" withLabels withTooltip tooltipDataSource="segment" mx="auto" />
        <Flex direction={"column"} gap={"sm"}>
        <Flex gap={"xs"}>
                <Badge h={20} w={20} circle color={ratioCandidate[0]?.color}></Badge>
                <Text>Ứng viên</Text>
              </Flex>
              <Flex gap={"xs"}>
                <Badge h={20} w={20} circle color={ratioRecruiter[0]?.color}></Badge>
                <Text>Nhà tuyển dụng</Text>
              </Flex>

              <Flex gap={"xs"}>
                <Badge h={20} w={20} circle color={ratioRecruiter[1]?.color}></Badge>
                <Text>Gói dịch vụ</Text>
              </Flex>
            </Flex>
        </Flex>
        
      </Flex >

      <div className="rounded-md bg-white py-4">
        <JobApplicationMonthlyReport />
      </div>
    </div>
  );
}
