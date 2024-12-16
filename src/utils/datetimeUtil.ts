export function convertToDDMMYYYY(dateString = ""): {
  formattedDate: string;
  isExpired: boolean;
} {
  if (!dateString) return { formattedDate: "Chưa cập nhật", isExpired: false };

  const inputDate = new Date(dateString);

  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1; // Month starts from 0 (January is 0)
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return { formattedDate: formattedDate, isExpired: inputDate < new Date() };
}

export function convertToMMYYYY(dateString: string): string {
  if (!dateString) return "Chưa cập nhật";

  const inputDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    return ""; // Return an empty string if the date is invalid
  }

  const month = inputDate.getMonth() + 1; // Use local month (getMonth) instead of UTC
  const year = inputDate.getFullYear(); // Use local year (getFullYear) instead of UTC

  // Format the date as MM/YYYY
  const formattedDate = `${month.toString().padStart(2, "0")}/${year}`;

  return formattedDate;
}

export function checkExpiredDate(dateString: string): boolean {
  if (!dateString) return false;

  const inputDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(inputDate.getTime())) {
    return false; // Return false if the date is invalid
  }

  // Compare the input date with the current date
  return inputDate < new Date();
}
