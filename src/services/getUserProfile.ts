import api from "@utils/axios";
import { getAccessToken } from "@utils/authUtils";
import { UserProfile } from "@data/interface";

const fetchCandidateProfile = async () => {
  try {
    const res = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const profile = res.data.data.profile as UserProfile;
    return profile.avatar;
  } catch (error) {
    console.log(error);
  }
};

export default fetchCandidateProfile;
