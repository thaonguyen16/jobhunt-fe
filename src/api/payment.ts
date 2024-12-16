import { ErrorReponseData, PostResponse } from "@data/interface";
import { IPayment, Transaction } from "@data/interface/payment";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { AxiosError } from "axios";

export async function createOrder(data: IPayment) {
    try {
      const res = await api.post("/payment/create-order",data, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
  
      return res.data;
    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
      throw new Error(data.message);
    }
  }
  
  export async function proccessCallback(data: string) {
    try {
      const res = await api.get(`/payment/callback${data}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
  
      return res.data as PostResponse;
    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
      throw new Error(data.message);
    }
  }
  
  export async function getAll() {
    try {
      const res = await api.get("/payment", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
  
      return res.data.data as Transaction[];
    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
      throw new Error(data.message);
    }
  }
  