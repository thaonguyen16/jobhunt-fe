import api from "@utils/axios";
import { getAccessToken } from "@utils/authUtils";

const fetchLocations = async () => {
  try {
    const res = await api.get("/locations", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const industries = res.data.data.locations;
    return industries;
  } catch (error) {
    console.log(error);
  }
};

export default fetchLocations;
