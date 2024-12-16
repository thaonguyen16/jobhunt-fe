import { Link } from "react-router-dom";
import { CompanyLogo } from "@features/company";
import { CandidateJob, PostResponse } from "@data/interface";

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import { Text, Tooltip, ActionIcon, Button, Group, Badge } from "@mantine/core";
import { convertToDDMMYYYY } from "@utils/datetimeUtil";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFavoriteJob } from "@/api/job";
import { notifications } from "@mantine/notifications";

type JobCardProps = CandidateJob & { isSaved: boolean };

export default function JobCard(props: JobCardProps) {
  const { isExpired, formattedDate } = convertToDDMMYYYY(props.deadline || "");
  const clientQuery = useQueryClient();

  const removeFJMutation = useMutation<PostResponse, Error, string>({
    mutationFn: removeFavoriteJob,
    onSuccess: (data) => {
      notifications.show({
        title: "Yêu thích",
        message: data.message,
        color: "teal",
      });
      clientQuery.invalidateQueries({ queryKey: ["favorite-jobs"] });
    },
    onError: (error) => {
      notifications.show({
        title: "Yêu thích",
        message: error.message,
        color: "red",
      });
    },
  });

  const handeFavoriteJobClick = () => {
    if (props.isSaved && props.id !== undefined) {
      removeFJMutation.mutate(props.id + "");
    }

    if (!props.isSaved && props.id !== undefined) {
      notifications.show({
        title: "Yêu thích",
        message: "Đã lưu tin",
        color: "teal",
      });
    }
  };

  return (
    <div className="relative job-card w-full flex gap-4 py-4 px-8 bg-white border border-gray-150 hover:cursor-pointer hover:border-primary-400 hover:bg-primary-50  rounded-md">
      <CompanyLogo src={props.companyLogo} />
      <div className="text-gray-500 font-medium flex flex-col gap-6 w-1/2">
        <div>
          <Tooltip
            label={props.title}
            position="top"
            style={{ fontSize: "10px" }}
          >
            <Text fw={500}>{props.title}</Text>
          </Tooltip>

          <Tooltip
            label={props.companyName}
            position="top"
            style={{ fontSize: "10px" }}
          >
            <Text
              variant="subtitle2"
              component="span"
              size="xs"
              fw={500}
              style={{
                color: "#7c7c7c",
              }}
            >
              {props.companyName}
            </Text>
          </Tooltip>
        </div>
        <Group gap="sm">
          <Tooltip
            label={props.location?.name}
            position="top"
            style={{ fontSize: "10px" }}
          >
            <Badge size="sm" style={{ textTransform: "none" }} color="orange">
              <Text size="xs" fw="500">
                {props.location?.name}
              </Text>
            </Badge>
          </Tooltip>

          <Tooltip
            label={formattedDate}
            position="top"
            style={{ fontSize: "10px" }}
          >
            <Badge
              style={{ textTransform: "none" }}
              color={isExpired ? "red" : "green"}
            >
              <Text size="xs" fw={500}>
                {isExpired
                  ? "Hết hạn ứng tuyển"
                  : `Hạn ứng tuyển: ${formattedDate}`}
              </Text>
            </Badge>
          </Tooltip>
        </Group>
      </div>
      <div className="more-info flex flex-col justify-between items-end ml-auto">
        <div>
          <Text
            size="sm"
            fw={700}
            style={{
              color: "#0581e6",
            }}
          >
            {props.textSalary}
          </Text>
        </div>

        <div className="flex items-center gap-1">
          <Link to={`/chi-tiet-cong-viec/${props.id}`}>
            <Button size="xs" variant="gradient">
              {isExpired ? "Xem" : "Ứng tuyển"}
            </Button>
          </Link>

          <Tooltip
            label={props.isSaved ? "Bỏ lưu" : "Lưu tin"}
            position="top"
            variant="subtle"
            style={{ fontSize: "10px" }}
          >
            <ActionIcon
              size="md"
              variant="subtle"
              onClick={handeFavoriteJobClick}
            >
              {props.isSaved ? <MdFavorite /> : <MdFavoriteBorder />}
            </ActionIcon>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
