import api from "@utils/axios";
import { BannerData } from "@data/interface/banner";
const fetchBannerByStatus = async (data: string) => {
  try {
    const res = await api.get("/banners/" + data, {
    });
    const banner = res.data.data.banners as BannerData[];
    return banner;
  } catch (error) {
    console.log(error);
  }
};

export default fetchBannerByStatus;
