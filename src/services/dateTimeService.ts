export function convertToReadableDateTime(dateTimeString: string): string {
  const dateTime = new Date(dateTimeString);

  // Lấy giờ và phút
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");

  // Lấy ngày, tháng và năm
  const date = dateTime.getDate().toString().padStart(2, "0");
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  const year = dateTime.getFullYear();

  return `${hours}:${minutes} ${date}/${month}/${year}`;
}
