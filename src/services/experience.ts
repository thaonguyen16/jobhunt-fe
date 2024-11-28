import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { Option } from "@data/interface/option";

export const fetchExperience = async () => {
    try {
      const res = await api.get("/work-modes", {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      const workMode = res.data.data.work_modes as Option[];
      return workMode;
    } catch (error) {
      console.log(error);
    }
  };