import api from "@utils/axios";
import { getAccessToken } from "@utils/authUtils";

export const fetchJobHot = async (page: number, size: number) => {
  try {
    const res = await api.get(`/jobs/hot?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const job = res.data.data;
    return job;
  } catch (error) {
    console.log(error);
  }
};

export const fetchJobSuggest = async(page: number, size: number) => {
  try {
    const res = await api.get(`/jobs/suggest?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const job = res.data.data;
    return job;
  } catch (error) {
    console.log(error);
  }
}
