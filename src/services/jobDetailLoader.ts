import api from "@utils/axios";
import { AxiosError, AxiosResponse } from "axios";
import { LoaderFunctionArgs } from "react-router-dom";
export default async function JobDetailLoader(params: LoaderFunctionArgs) {
  try {
    const res: AxiosResponse = await api.get(`/jobs/${params.params.id}`);
    return res.data.data.job;
  } catch (err) {
    const typeError = err as AxiosError;
    console.log(typeError.message);
    throw new Error(typeError.message);
  }
}
