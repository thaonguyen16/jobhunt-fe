import api from "@utils/axios";
import { getAccessToken } from "@utils/authUtils";
const fetchIndustries = async () => {
  try {
    const res = await api.get("/industries", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const industries = res.data.data.industries;
    return industries;
  } catch (error) {
    console.log(error);
  }
};

const fetchIndustriesWithSub = async () => {
  try {
    const res = await api.get("/industries/list-sub", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const industries = res.data.data.industries;
    return industries;
  } catch (error) {
    console.log(error);
  }
};

const fetchIndustriesNoSub = async(page: number,size: number) => {
  try {
    const res = await api.get(`/industries/main-industry?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const industries = res.data.data.industries;
    return industries;
  } catch (error) {
    console.log(error);
  }
};

const fetchSubIndustries = async(id: number) => {
    try {
        const res = await api.get(`/sub-industries?industryId=${id}` , {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
              },
        })
        const subIndustries = res.data.data.listData;
        return subIndustries;
    }catch (error) {
        console.log(error);
    }
}

export {fetchIndustries, fetchSubIndustries,fetchIndustriesWithSub,fetchIndustriesNoSub};
