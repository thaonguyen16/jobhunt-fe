import api from "@utils/axios";

export async function getIndustries() {
  try {
    const response = await api.get("industries");
    return response.data;
  } catch (e) {
    console.error(e);
    throw new Error("Failed to fetch industries");
  }
}
