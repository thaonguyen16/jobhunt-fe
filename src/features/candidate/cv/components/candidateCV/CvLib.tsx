import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useEffect, useState } from "react";

import CvCard from "./CvCard";
import CvLibContainer from "./CvLibContainer";

import { UploadCVModal } from "@features/candidate/cv";

import { useDisclosure } from "@mantine/hooks";
import {
  Text,
  Menu,
  Button,
  Divider,
  Pagination,
  Loader,
  Group,
} from "@mantine/core";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserResumeList } from "@/api/resume";

type CVType = {
  id: number;
  title: string;
  default: boolean;
  upload: boolean;
  updatedAt: string;
};

export default function CvLib() {
  const [cvList, setCvList] = useState<CVType[]>([]);
  const [opened, { open: openUploadCV, close: closeUploadCV }] =
    useDisclosure(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const cvQuery = useQuery({
    queryKey: ["cvList", page, 6],
    queryFn: () => getUserResumeList(page - 1, 6),
  });

  useEffect(() => {
    if (cvQuery.data) {
      setCvList(cvQuery.data.data.listData);
      setTotalPage(cvQuery.data.data.totalPages);
    }
  }, [cvQuery.data]);

  return (
    <div className="bg-white py-8 px-16 shadow-sm rounded-md h-fit">
      <UploadCVModal
        fetchCvList={() => cvQuery.refetch()}
        opened={opened}
        onClose={closeUploadCV}
      />

      <Group justify="space-between" mb="lg">
        <Text fw={500} size="sm" className="text-gray-400">
          CV đã lưu
        </Text>

        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Button
              size="xs"
              leftSection={<AddRoundedIcon />}
              variant="gradient"
            >
              Tạo CV mới
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item onClick={openUploadCV}>
              <Text size="sm" fw={500}>
                Tải CV lên
              </Text>
            </Menu.Item>
            <Menu.Item>
              <Link to={`/tao-cv`}>
                <Text size="sm" fw={500}>
                  Tạo CV
                </Text>
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
      <Divider size="sm" />
      {cvQuery.isLoading ? (
        <div className="flex justify-center">
          <Loader size="sm" my="lg" />
        </div>
      ) : (
        <>
          <CvLibContainer>
            {cvList.map((cv: CVType) => (
              <CvCard
                key={cv.id}
                id={cv.id}
                cvTitle={cv.title}
                default={cv.default}
                upload={cv.upload}
                createdAt={cv.updatedAt}
              />
            ))}
          </CvLibContainer>
        </>
      )}
      <Group justify="flex-end">
        <Pagination
          size="xs"
          total={totalPage}
          value={page}
          onChange={setPage}
          mt="md"
        />
      </Group>
    </div>
  );
}
