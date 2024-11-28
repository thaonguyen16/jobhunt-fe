import { ErrorReponseData, LocationData } from "@data/interface";
import api from "@utils/axios";
import { AxiosError } from "axios";

export async function getLocations() {
  try {
    const res = await api.get("https://provinces.open-api.vn/api/?depth=1");
    const resData = res.data;
    return resData as LocationData[];
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getAllLocations() {
  try {
    const response = await api.get("locations");
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}
