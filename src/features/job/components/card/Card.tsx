import { JobCardData } from "@data/interface/job";
import {
  Container,
  Divider,
  Flex,
  Stack,
  Text,
  Image,
  Button,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import {
  IconCalendarDue,
  IconHeart,
  IconHeartFilled,
  IconRotateClockwise2,
} from "@tabler/icons-react";
import "../../job-card.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { notifications } from "@mantine/notifications";
import { PostResponse } from "@data/interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFavoriteJob, removeFavoriteJob } from "@/api/job";
import { useState } from "react";

type JobCardWithColor = JobCardData & { color: string; border: boolean };

export default function JobCard(props: JobCardWithColor) {
  const navigate = useNavigate();
  const [isF, setIsF] = useState(props.isSaved);
  const [prevent, setPrevent] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const clientQuery = useQueryClient();

  const removeFJMutation = useMutation<PostResponse, Error, string>({
    mutationFn: removeFavoriteJob,
    onSuccess: (data) => {
      setIsF(false);
      setPrevent(false);
      notifications.show({
        title: "Yêu thích",
        message: data.message,
        color: "green",
      });
      clientQuery.invalidateQueries({ queryKey: ["favorite-jobs"] });
    },
    onError: (error) => {
      setPrevent(false);
      notifications.show({
        title: "Yêu thích",
        message: error.message,
        color: "red",
      });
    },
  });
  const addFJMutation = useMutation<PostResponse, Error, string>({
    mutationFn: addFavoriteJob,
    onSuccess: (data) => {
      setIsF(true);
      setPrevent(false);
      notifications.show({
        title: "Yêu thích",
        message: data.message,
        color: "green",
      });
      clientQuery.invalidateQueries({ queryKey: ["favorite-jobs"] });
    },
    onError: (error) => {
      setPrevent(false);
      notifications.show({
        title: "Yêu thích",
        message: error.message,
        color: "red",
      });
    },
  });

  const handeFavoriteJobClick = () => {
    if (isF && props.id !== undefined) {
      setPrevent(true);
      removeFJMutation.mutate(props.id + "");
    }

    if (!isF && props.id !== undefined) {
      setPrevent(true);
      addFJMutation.mutate(props.id + "");
    }
  };

  return (
    <Container
      key={props.id + "J0"}
      pos={"relative"}
      bg={"rgba(255,255,255,.45"}
      bd={!props.border ? "1px solid white" : `1px solid ${props.color}`}
      w={"100%"}
      pt={"0.5rem"}
      pb={"0.5rem"}
      style={{ borderRadius: "4px", cursor: "pointer" }}
      className={!props.border ? "job-card" : "job-card-2"}
    >
      {props.isHot && (
        <Image
          src={"src/assets/img/fire.png"}
          h={"40px"}
          style={{ zIndex: 2 }}
          w={"40px"}
          pos={"absolute"}
          top={-10}
          left={-15}
        />
      )}
      <Tooltip
        label={auth.isAuthenticated ? "Lưu tin" : "Đăng nhập để lưu tin"}
      >
        <ActionIcon
          size={"1.5rem"}
          variant="subtle"
          color="brown"
          radius="xl"
          pos={"absolute"}
          top={"0"}
          right={0}
          onClick={(event) => {
            event.stopPropagation();
            !prevent && auth.isAuthenticated && handeFavoriteJobClick();
          }}
        >
          {isF ? (
            <IconHeartFilled
              style={{ width: "70%", height: "70%" }}
              stroke={2}
            />
          ) : (
            <IconHeart style={{ width: "70%", height: "70%" }} stroke={2} />
          )}
        </ActionIcon>
      </Tooltip>

      <Stack gap={"xs"} w={"100%"}>
        <Flex
          w={"100%"}
          direction={"row"}
          align={"center"}
          justify={"flex-start"}
          wrap={"nowrap"}
          gap={"md"}
        >
          <Image src={props.company.image} h={"50px"} w={"50px"} fit={"fill"} />

          <Stack gap={"xs"} mb={"10px"} w={"100%"}>
            <Text size="1rem" fw={500} lineClamp={1}>
              {props.title}
            </Text>
            <Text size="0.8rem" c={"gray"} fw={500} lineClamp={1}>
              {props.company.name.toLocaleUpperCase()}
            </Text>

            <Flex
              mt={"1rem"}
              direction={"row"}
              align={"center"}
              justify={"flex-start"}
              gap={"xs"}
              wrap={"nowrap"}
            >
              <Button
                w={"fit-content"}
                size="xs"
                variant="light"
                radius="xl"
                color={props.color}
              >
                {props.industry.name}
              </Button>
              <Button size="xs" variant="outline" color={"brown"}>
                {props.salary}
              </Button>
            </Flex>
            <Flex
              mt={"0.5rem"}
              direction={"row"}
              align={"center"}
              justify={"space-between"}
            >
              <Button size="xs" variant="outline" color={"gray"}>
                {props.location.name}
              </Button>

              <Tooltip
                label={
                  auth.isAuthenticated
                    ? "Ứng tuyển công việc"
                    : "Đăng nhập để ứng tuyển"
                }
              >
                <Button
                  variant="gradient"
                  onClick={() => {
                    navigate(`/chi-tiet-cong-viec/${props.id}`);
                  }}
                >
                  Ứng tuyển
                </Button>
              </Tooltip>
            </Flex>
          </Stack>
        </Flex>

        <Divider mt={"0"} mb={"0"} size={"xs"} lh={"10px"} p={0} />
        <Flex direction={"row"} justify={"space-between"} align={"center"}>
          <Flex direction={"row"} wrap={"wrap"} align={"center"} gap={"xs"}>
            <IconCalendarDue size="1rem" color="gray" />
            <Text size="0.7rem" c={"gray"}>
              Còn {props.deadline} để ứng tuyển
            </Text>
          </Flex>
          <Flex direction={"row"} wrap={"wrap"} align={"center"} gap={"xs"}>
            <IconRotateClockwise2 size="1rem" color="gray" />
            <Text size="0.7rem" c={"gray"}>
              Cập nhật {props.updatedAt} trước
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Container>
  );
}
