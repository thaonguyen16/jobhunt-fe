import { IUserProfile, PostResponse } from "@data/interface";
import { IPassword } from "@data/interface/profile";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";

const fetchAuthProfile = async () => {
    try {
        async () => {
            const response = await api.get("/users/profile", {
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
              },
            });
            return response.data.data.profile as IUserProfile;
          }
    } catch (error) {
      console.log(error);
    }
  };

const changePasswordService = async(pass: IPassword) => {
  try {
    async () => {
      const response = await api.put("/users/profile", pass, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      return response.data as PostResponse;
    }
  }
  catch(error) {
    console.log(error);
  }
}

export {fetchAuthProfile,changePasswordService};