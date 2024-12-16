import { FilterCandidateCV } from "@data/interface/cv";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";

export const fetchResumeFilter = async (page: number, size: number,data: FilterCandidateCV) => {
    try {
      const res = await api.post(`/resumes/find-employee?page=${page}&size=${size}`, data , {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      const resume = res.data.data;
      return resume;
    } catch (error) {
      console.log(error);
    }
  };
  