import {
  Flex,
  Text,
  Image,
  Group,
  ActionIcon,
  SimpleGrid,
  Skeleton,
  em,
  Tooltip,

} from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect,useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { CompanyHotCardData } from "@data/interface/company";
import CompanyCardHot from "./CompanyCardHot";
import { ColorData } from "@data/constants/color";
import { fetchAllTopCompany } from "@services/companyService";

export default function CompanyHotCardCardContainer() {
  const [companyHot, setCompanyHot] = useState<CompanyHotCardData[] | undefined>(undefined);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isMobile = useMediaQuery(`(max-width: ${em(1200)})`);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    const fetchData = async () => {

      await fetchAllTopCompany(currentPage,9).then((data) => {
        if(data) {
          setCompanyHot(data.listData);
          setTotalPage(data.totalPages);
        }
      })
      
    };

    fetchData();

  }, [currentPage]);



  return (
    <>
      <Flex
        direction={"row"}
        gap={"xs"}
        wrap={"wrap"}
        align={"center"}
        justify={"space-between"}
      >
        <Group>
         
          <Image src={"src/assets/img/company_vip.png"} w={50}></Image>
          <Text size="1.4em" fw={800} c={"#0066b2"}>
           Các công ty hàng đầu
          </Text>
        </Group>
        <Group>
        <Tooltip label="Trang trước">
        <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage == 0} onClick={() => {
        setCompanyHot(undefined);
        setCurrentPage(currentPage - 1);
      
      }}>

            <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={2} />
          </ActionIcon>
          </Tooltip>
          <Tooltip label="Trang kế tiếp">
          <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage + 1 == totalPage} onClick={() => {
            setCompanyHot(undefined);
            setCurrentPage(currentPage + 1);
            
          }}>
            <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={2} />
          </ActionIcon>
          </Tooltip>
        </Group>
      </Flex>

      <SimpleGrid cols={isMobile ? 1 : 3} w={"100%"} mt={"1rem"} mb={"0.5rem"} pos={"relative"}>
        {companyHot ? (
          companyHot && companyHot.map((data) => (
            <CompanyCardHot key={data.id + "C1"} numberJob={data.numberJob} id={data.id} name={data.name} image={data.image} rank={data.rank} color={ColorData[5].value} />
          ))
        ) : (
          <>
            {[1, 2, 3, 4,5,6,7,8,9].map((index) => (
              <Skeleton key = {index} height={"10rem"} radius={"x1"}/>
            ))}
          </>
        )}
      </SimpleGrid>

      <Flex mt={"1rem"} direction={"row"} align={"center"} justify={"center"} gap={"md"} wrap={"nowrap"} mb={"2rem"}>
      <Tooltip label="Trang trước">
      <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage == 0} onClick={() => {
        setCompanyHot(undefined);
        setCurrentPage(currentPage - 1);
      
      }}>
            <IconChevronLeft style={{ width: '70%', height: '70%' }} stroke={2} />
          </ActionIcon>
          </Tooltip>

          <Text fw={400} c={"cyan"}>{currentPage + 1 + " / " + totalPage + " trang"}</Text>

          <Tooltip label="Trang kế tiếp">
          <ActionIcon variant="subtle" radius={"xl"} size={"md"} disabled = {currentPage + 1 == totalPage} onClick={() => {
            setCompanyHot(undefined);
            setCurrentPage(currentPage + 1);
            
          }}>
            <IconChevronRight style={{ width: '70%', height: '70%' }} stroke={2} />
          </ActionIcon>
          </Tooltip>
      </Flex>

    </>
  );
}
