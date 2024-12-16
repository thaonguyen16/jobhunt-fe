import { IAddUserFormInput } from "@features/admin/interface";
import { AxiosError } from "axios";
import { ErrorReponseData, PostResponse } from "@data/interface";
import api from "@utils/axios";
import { getAccessToken } from "@utils/authUtils";
import { Static, TrafficChart } from "@data/interface/static";

export async function addUser(data: IAddUserFormInput) {
  try {
    const res = await api.post("/users", data, {
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

export async function getUsersData(
  page: number,
  size: number,
  keyword: string,
  role: string
) {
  try {
    let queryString = `/users/filter?page=${page}&size=${size}`;

    if (keyword != "") {
      queryString += `&keyword=${keyword}`;
    }

    if (role != "ALL") {
      queryString += `&role=${role}`;
    }

    console.log(queryString);

    const response = await api.get(queryString, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function deleteUser({ id }: { id: number }) {
  try {
    const res = await api.delete(`/users/${id}`, {
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

export async function getCandidateProfile() {
  try {
    const res = await api.get(`/users/profile`, {
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

export async function getCountUser() {
  try {
    const res = await api.get(`/users/count`, {
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

export async function getStaticsData() {
  try {
    const res = await api.post(`/statics`,{},);

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getStatics() {
  try {
    const res = await api.get(`/users/statics`,);

    return res.data.data as Static;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getTrafficChart() {
  try {
    const res = await api.get(`/statics/traffic`,{
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data.data as TrafficChart[];
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getIndustryChart() {
  try {
    const res = await api.get(`/statics/industry`,{
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data.data as TrafficChart[];
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getRevenue() {
  try {
    const res = await api.get(`/statics/revenue`,{
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data.data as TrafficChart[];
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getRatioCandidateChart() {
  try {
    const res = await api.get(`/statics/ratio-candidate`,{
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data.data as TrafficChart[];
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getRatioRecruiterChart() {
  try {
    const res = await api.get(`/statics/ratio-recruiter`,{
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data.data as TrafficChart[];
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getMessage() {
  try {
    const res = await api.get("/notification",{
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

