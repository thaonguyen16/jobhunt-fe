import { ErrorReponseData } from "@data/interface";
import { ApplyJobReq } from "@features/candidate/applyJob/ApplicationJobModal";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { AxiosError } from "axios";

export async function applyJob(data: ApplyJobReq) {
  try {
    let requestBody: FormData | ApplyJobReq;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${getAccessToken()}`,
    };
    let res;

    if (data.file) {
      // Use FormData if a file is provided
      const formData = new FormData();
      formData.append("jobId", data.jobId);
      formData.append("cvId", data.cvId);
      formData.append("name", data.name);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("file", data.file);

      requestBody = formData;
      headers["Content-Type"] = "multipart/form-data";
      // Note: Content-Type for FormData is automatically set
      res = await api.post("/job-applications/upload-cv", requestBody, {
        headers,
      });
    } else {
      // Use JSON object if no file is provided
      requestBody = {
        jobId: data.jobId,
        cvId: data.cvId,
        name: data.name,
        phone: data.phone,
        email: data.email,
        file: undefined, // Explicitly set file to undefined or remove it
      };

      headers["Content-Type"] = "application/json";
      res = await api.post("/job-applications", requestBody, {
        headers,
      });
    }

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getJobApplicationsByCandiate() {
  try {
    const res = await api.get("/job-applications/candidate", {
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

export async function getJobApplicationsByRecruiter(
  page: number,
  pageSize: number,
  jobId: number | null,
  status: string | null
) {
  try {
    if (!jobId) {
      throw new Error("Job ID is required");
    }

    if (!status) {
      throw new Error("Status is required");
    }

    const res = await api.get(
      `/job-applications?page=${page}&size=${pageSize}&jobId=${jobId}&status=${status}`,
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

export async function getJobApplicationDetail(id: string) {
  try {
    const res = await api.get(`/job-applications/${id}`, {
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

export async function updateJobApplicationStatus({
  id, status,
}: {
  id: string;
  status: string;
}) {
  try {
    console.log(id, status);
    const res = await api.put(
      `/job-applications/${id}?status=${status}`,
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

export async function getJobApplicationsExcel(jobId: number) {
  try {
    const res = await api.get(`/job-applications/${jobId}/export?`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      responseType: "blob",
    });
    console.log(res);
    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getJobApplicationMonthlyReport(year: string) {
  try {
    const res = await api.get(
      `/job-applications/report-application?year=${year}`,
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
