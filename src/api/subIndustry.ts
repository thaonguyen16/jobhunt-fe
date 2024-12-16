import {
  IAddSubIndustries,
  IDeleteManySubIndustries,
} from "@features/admin/interface";
import api from "@utils/axios";
import { AxiosError } from "axios";
import { ErrorReponseData } from "@data/interface";

export async function getSubIndustries(
  industryId: number | null,
  page: number,
  pageSize: number,
  searchKey: string
) {
  try {
    let queryString = `sub-industries?page=${page}&size=${pageSize}`;

    // Add searchKey to the query if it's provided
    if (searchKey) {
      queryString += `&searchKey=${encodeURIComponent(searchKey)}`;
    }

    // Add industryId to the query if it's provided and not equal to 0 (assuming 0 means "all")
    if (industryId && industryId !== 0) {
      queryString += `&industryId=${industryId}`;
    }

    const response = await api.get(queryString);
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getAllSubIndustries() {
  try {
    const response = await api.get("sub-industries");
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function addSubIndustries(data: IAddSubIndustries) {
  try {
    const response = await api.post("sub-industries", data);
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getOneSubIndustry(id: number | null) {
  if (!id) return;
  try {
    const response = await api.get(`sub-industries/${id}`);
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}
export async function deleteSubIndustry({ id }: { id: number }) {
  try {
    const response = await api.delete(`sub-industries/${id}`);
    return response.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function deleteManySubIndustries(data: IDeleteManySubIndustries) {
  try {
    const response = await api.post("sub-industries/delete-many", data);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const data = error.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function updateSubIndustry({
  id,
  data,
}: {
  id: number;
  data: IAddSubIndustries;
}) {
  try {
    const response = await api.put(`sub-industries/${id}`, data);
    return response.data;
  } catch (e) {
    const error = e as AxiosError;
    const data = error.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}
