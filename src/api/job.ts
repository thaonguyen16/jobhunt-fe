import { IAddJob } from "@features/recruiter/myJob";
import api from "@utils/axios";
import { AxiosError } from "axios";
import { ErrorReponseData } from "@data/interface";
import { getAccessToken } from "@utils/authUtils";
import { UpdateType } from "@features/recruiter/myJob/components/JobEditModal";
import { FilterData } from "@pages/candidate/FindJob";
import { PaginationRespone } from "@data/interface/respone";

export async function addJob(data: IAddJob) {
  try {
    const res = await api.post("/jobs", data, {
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

export async function filterRecruiterJobs(
  page: number,
  size: number,
  status = "ACTIVE",
  keyword: string
) {
  try {
    let reqUrl = `/jobs/recruiter/filter?page=${page}&size=${size}&status=${status}`;
    if (keyword) {
      reqUrl += `&keyword=${keyword}`;
    }
    const res = await api.get(reqUrl, {
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

export async function getJobById(id: number | null) {
  try {
    if (!id) {
      return null;
    }

    const res = await api.get(`/jobs/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getRecruiterJob(id: number | null) {
  try {
    if (!id) {
      return null;
    }

    const res = await api.get(`/jobs/recruiter/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return res.data.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function updateJob(data: UpdateType) {
  try {
    const res = await api.put(`/jobs/${data.id}`, data.reqBody, {
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

export async function getAdminJobs(
  page: number,
  size: number,
  status: string | undefined,
  companyId: string | null,
  keyword: string
) {
  try {
    let url = `/jobs/admin-filter?page=${page}&size=${size}`;

    if (status) {
      url += `&status=${status}`;
    }

    if (companyId) {
      url += `&companyId=${companyId}`;
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

export async function rejectJob({
  id,
  reason,
}: {
  id: number;
  reason: string;
}) {
  try {
    const res = await api.put(
      `/jobs/reject/${id}`,
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

export async function approveJob(id: number) {
  try {
    const res = await api.put(
      `/jobs/approve/${id}`,
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

export async function addFavoriteJob(id: string) {
  try {
    const res = await api.post(
      `/favorite-jobs?jobId=${id}`,
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

export async function removeFavoriteJob(id: string) {
  try {
    const res = await api.put(
      `/favorite-jobs?jobId=${id}`,
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

export async function searchFavoriteJobs(page: number, size: number) {
  try {
    const res = await api.get(`/favorite-jobs?page=${page}&size=${size}`, {
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

export async function searchJobs({
  page,
  size,
  sortType = "",
  filterData,
}: {
  page: number;
  size: number;
  sortType: string;
  filterData: FilterData;
}) {
  try {
    const res = await api.post(
      `/jobs/search?page=${page}&size=${size}&sortType=${sortType}`,
      filterData,
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );

    return res.data.data as PaginationRespone;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function deleteJob(id: number) {
  try {
    const res = await api.delete(`/jobs/${id}`, {
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

export async function getJobReport(year: string) {
  try {
    const res = await api.get(`/jobs/monthly-report?year=${year}`, {
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

export async function changeStatusJob({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  try {
    console.log(id, status);
    const res = await api.put(
      `/jobs/change-status/${id}?status=${status}`,
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
