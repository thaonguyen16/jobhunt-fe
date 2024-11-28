import { Text } from "@mantine/core";

type NotificationProps = {
  title: string;
  content: string;
  link?: string;
  seen?: boolean;
};

export default function Notification({ title, content }: NotificationProps) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-md border border-gray-150">
      <Text size="sm" fw={500}>
        {title}
      </Text>
      <Text size="xs" className="line-clamp-2">
        {content}
      </Text>
      <div>
        <span className="transition duration-75 text-sm text-primary-500 border-b-2 border-transparent hover:border-primary-500">
          Xem chi tiết
        </span>
      </div>
    </div>
  );
}
