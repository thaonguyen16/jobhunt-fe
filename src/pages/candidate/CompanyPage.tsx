import { MediumContainer } from "@components/ui";
import { CompanyCard } from "@features/company";
import { FaArrowCircleRight, FaSearch } from "react-icons/fa";

import {
  TextInput,
  ActionIcon,
  Pagination,
  Group,
  Text,
  Stack,
  LoadingOverlay,
  BackgroundImage,
  Box,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchCompanies } from "@/api/company";
import { CompanyInfo } from "@data/interface";
import debounce from "lodash.debounce";

export default function CompanyPage() {
  const PAGE_SIZE = 6;
  const [keyword, setKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [companies, setCompanies] = useState<CompanyInfo[]>([]);

  const userComQuery = useQuery({
    queryKey: ["useCompany", keyword, currentPage],
    queryFn: () => searchCompanies(currentPage - 1, PAGE_SIZE, keyword),
  });

  const debounceSetKeyword = debounce((value: string) => {
    setKeyword(value);
  }, 300);

  useEffect(() => {
    if (userComQuery.data) {
      setCompanies(userComQuery.data.data.companies.listData);
      setTotalPages(userComQuery.data.data.companies.totalPages);
    }
  }, [userComQuery.data]);

  return (
    <MediumContainer>
      <div className="flex flex-col bg-white rounded-md mx-4  pb-10">
        <LoadingOverlay visible={userComQuery.isLoading} />
        <BackgroundImage
          src="./src/assets/img/layer.jpg"
          style={{ borderRadius: "8px 8px 0  0" }}
          py="lg"
        >
          <Group align="center" px="xl">
            <Stack pt="md" gap="2">
              <Box w="500px">
                <Text fw="700" size="xl" style={{ color: "#74c0fc" }}>
                  Các công ty hàng đầu
                </Text>
                <Text
                  fw="400"
                  size="sm"
                  style={{
                    color: "#ffffff",
                    marginTop: "0.5rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.5px",
                  }}
                >
                  Chào mừng bạn đến với nền tảng tuyển dụng của chúng tôi! Tại
                  đây, bạn có thể tìm kiếm và khám phá các cơ hội việc làm từ
                  nhiều công ty hàng đầu trong ngành. Hãy bắt đầu hành trình
                  nghề nghiệp của bạn ngay hôm nay!
                </Text>
              </Box>
            </Stack>
            <TextInput
              placeholder="Tìm công ty"
              onChange={(e) => debounceSetKeyword(e.currentTarget.value)}
              style={{ alignSelf: "flex-end", marginLeft: "auto" }}
              leftSection={
                <FaSearch className="text-primary-400 font-bold h-4 w-4" />
              }
              rightSection={
                <ActionIcon
                  variant="gradient"
                  size="md"
                  aria-label="Gradient action icon"
                  gradient={{ from: "blue", to: "cyan", deg: 90 }}
                >
                  <FaArrowCircleRight />
                </ActionIcon>
              }
            />
          </Group>
        </BackgroundImage>

        <div className="px-4 lg:px-8 mt-6">
          <div className={`grid grid-cols-3  gap-4`}>
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                id={company.id}
                name={company?.name}
                description={company.description}
                image={company.image}
                jobNumber={company.jobNumber}
              />
            ))}
          </div>
        </div>

        <Pagination
          mt="lg"
          total={totalPages}
          value={currentPage}
          onChange={(page) => setCurrentPage(page)}
          size="sm"
          ml="auto"
          px="lg"
          color="blue.5"
        />
      </div>
    </MediumContainer>
  );
}
