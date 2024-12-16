import { CompanyLogo } from "@features/company";

import { useState } from "react";
import { convertToReadableDateTime } from "@services/dateTimeService";
import { Text, Stack, Badge, Group, Button, Overlay, Center, Loader } from "@mantine/core";
import { updateJobApplicationStatus } from "../../../api/application";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";

type HistoryCardProps = {
  id: number;
  name?: string;
  companyName?: string;
  applyTime?: string;
  status?: string;
  salary?: string;
  companyLogo?: string;
  cvName?: string;
};

export default function HistoryCard(props: HistoryCardProps) {
  const [_,setOnHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const onMouseOverHandler = () => {
    _;
    setOnHover(true);
  };

  const onMouseOutHandler = () => {
    setOnHover(false);
  };

  let message = "";
  let color = "";
  if (props.status === "PENDING") {
    message = "Đang chờ duyệt";
    color = "yellow";
  } else if (props.status === "SEEN") {
    message = "Đơn ứng tuyển bị từ chối";
    color = "red";
  } else if (props.status === "APPROVED") {
    message = "Đơn ứng tuyển phù hợp";
    color = "green.9";
  }
  else if (props.status === "CANCELED") {
    message = "Rút đơn ứng tuyển";
    color = "gray";
  }

  const queryClient = useQueryClient();


  const handleCancel = async() => {
    await updateJobApplicationStatus({id: String(props.id), status: "CANCELED"}).then((data) => {
      setLoading(false);
      if(data.status === "success") {
        notifications.show({
          title: "Thông báo",
          message: "Hủy đơn ứng tuyển thành công",
          color: "teal",
        });
        queryClient.invalidateQueries({ queryKey: ["ja-history"] }); }
        else {
          notifications.show({
            title: "Thông báo",
            message: data.message,
            color: "red",
          });
        }
    });
  }

  return (
    <div
      onMouseOver={onMouseOverHandler}
      onMouseOut={onMouseOutHandler}
      className="relative job-card w-full flex gap-4 py-3 px-4 bg-white border hover:cursor-pointer hover:border-primary-400 border-gray-100 rounded-md shadow-md"
    >
      {loading && <Overlay w="100%" h="100%" pos="fixed" blur={2}>
          <Center w="100%" h="100%">
            <Loader color="white" type="dots" />
          </Center>
        </Overlay>}
      <CompanyLogo
        src={
          props.companyLogo ||
          "https://cdn-icons-png.flaticon.com/512/25/25231.png"
        }
      />
      <div>
        <Stack gap="xs">
          <Text fw="700" style={{ color: "#1971c2" }}>
            {props.name || ""}
          </Text>

          <Text fw="500" size="sm" style={{ color: "#666666" }}>
            {props.companyName}
          </Text>

          <Text fw="500" size="xs" style={{ color: "#666666" }}>
            Thời gian ứng tuyển:{" "}
            {props.applyTime && convertToReadableDateTime(props.applyTime)}
          </Text>
        </Stack>
        <Group mt="lg">
          <Badge
            radius={"xs"}
            color={color}
            fw={700}
            style={{ textTransform: "none" }}
            variant="outline"
          >
            <Text size="xs" fw="700">
              {message}
            </Text>
          </Badge>

          <Badge
            radius={"xs"}
            color={"yellow.9"}
            style={{ textTransform: "none" }}
            variant="outline"
          >
            <Text size="xs">CV đã gửi : {props.cvName}</Text>
          </Badge>
        </Group>
      </div>

      <Text
        ml="auto"
        fw="700"
        variant="gradient"
        gradient={{ from: "red.9", to: "orange.6", deg: 45 }}
      >
        {props.salary}
      </Text>

      {
        props.status === "PENDING" && <Button variant="gradient" gradient={{from: "blue", to: "cyan", deg: 90}} pos={"absolute"} bottom={10} right={10}
        onClick={() => {
          setLoading(true);
          handleCancel();
        }}
        >
        Hủy ứng tuyển
      </Button>
      }
    </div>
  );
}
