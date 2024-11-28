import api from "@utils/axios";
import { AxiosError } from "axios";
import { ErrorReponseData } from "@data/interface";
import { getAccessToken } from "@utils/authUtils";

export async function getCompanies(
  page: number,
  size: number,
  status: string,
  keyword: string
) {
  try {
    let url = `/companies/admin/filter?page=${page}&size=${size}`;

    if (status) {
      url += `&status=${status}`;
    }

    if (keyword) {
      url += `&keyword=${keyword}`;
    }

    const res = await api.get(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getCompany(id: number) {
  try {
    const res = await api.get(`/companies/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function approveCompany({ id }: { id: number }) {
  try {
    const res = await api.put(
      `/companies/admin/approval/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function rejectCompany({
  id,
  reason,
}: {
  id: number;
  reason: string;
}) {
  try {
    const res = await api.put(
      `/companies/admin/reject/${id}`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getCompanyProfile() {
  try {
    const res = await api.get(`/companies/profile`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getCompanyOptions() {
  try {
    const res = await api.get(`/companies/options`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function searchCompanies(page: number, size = 6, keyword: string) {
  try {
    const res = await api.get(
      `/companies/search?keyword=${keyword}&page=${page}&size=${size}`
    );

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function searchCompanyJobs(
  companyId: number,
  page: number,
  size: number,
  keyword?: string
) {
  try {
    const res = await api.get(
      `/companies/${companyId}/jobs?keyword=${keyword}&page=${page}&size=${size}`
    );

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function addBusinessLicense(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post(`/companies/business-license`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function deleteBusinessLicense() {
  try {
    const res = await api.delete(`/companies/business-license`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}
