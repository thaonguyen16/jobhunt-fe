import { ErrorReponseData, PostResponse } from "@data/interface";
import { IPlan, Plan, PlanItem } from "@data/interface/plan";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { AxiosError } from "axios";

export async function createPlan(data: IPlan) {
    try {
      const res = await api.post("/plans",data, {
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
  
  
export async function getAllPlanItem() {
    try {
      const res = await api.get("/plans/plan-item", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
  
      return res.data.data as PlanItem[];
    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
      throw new Error(data.message);
    }
  }
  
  export async function getAllPlan() {
    try {
      const res = await api.get("/plans", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
  
      return res.data.data.plan as Plan[];
    } catch (error) {
      const typedError = error as AxiosError;
      const data = typedError.response?.data as ErrorReponseData;
      throw new Error(data.message);
    }
  }
  
  export async function getCancelPlan(id: number) {
    try {
      const res = await api.put(`/plans/cancel/${id}`, {
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
  