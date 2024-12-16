import { ErrorReponseData } from "@data/interface";
import { SubscriptionData } from "@data/interface/subscription";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { AxiosError } from "axios";

export async function getSubByUser() {
    try {
      const res = await api.get("/subscription", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
  
      return res.data.data as SubscriptionData[];
    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
      throw new Error(data.message);
    }
  }