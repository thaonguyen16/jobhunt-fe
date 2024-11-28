import { ErrorReponseData } from "@data/interface";
import { CompanyProfile, ICompanyProfile } from "@data/interface/company";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { AxiosError } from "axios";

export const fetchCompanyProfile = async () => {
  try {
    const res = await api.get("/companies/profile", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const company = res.data.data.company as CompanyProfile;
    return company;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllTopCompany = async (page: number, size: number) => {
  try {
    const res = await api.get(`/companies/top?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    },);
    const company = res.data.data.companies;
    return company;
  } catch (error) {
    console.log(error);
  }
};

export const sendUpdateCompanyRequest = async (data: ICompanyProfile) => {
  try {
    const res = await api.put("/companies/profile", data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const company = res.data.data;
    return company;
  } catch (error) {
    console.log(error);
  }
}


export const setAvatarCompany = async(data: FormData) => {
  try {
    const res = await api.put("/companies/avatar", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data.data.avatar as string;
  
  }catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}