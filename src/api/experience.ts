import { ErrorReponseData } from "@data/interface";
import api from "@utils/axios";
import { AxiosError } from "axios";

export const getExperienceOptions = async () => {
  try {
    const res = await api.get("/experiences/options");

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
};
