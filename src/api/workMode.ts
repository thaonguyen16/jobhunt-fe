import { AxiosError } from "axios";
import { ErrorReponseData } from "@data/interface";
import api from "@utils/axios";

export async function getAllWorkModes() {
  try {
    const response = await api.get("work-modes");
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}
