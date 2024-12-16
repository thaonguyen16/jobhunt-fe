import { ErrorReponseData } from "@data/interface";
import { CreateCVBody } from "@pages/candidate/GenerateCVPage";
import { getAccessToken } from "@utils/authUtils";
import api from "@utils/axios";
import { AxiosError } from "axios";

export async function getUserResumeList(page: number, size: number) {
  try {
    const res = await api.get(`/resumes/user?page=${page}&size=${size}`, {
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

export async function setDefaultResume(id: string) {
  try {
    const res = await api.put(
      `/resumes/default?rsid=${id}`,
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

export async function deleteResume(id: string) {
  try {
    const res = await api.delete(`/resumes/${id}`, {
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

export async function uploadResume({
  title,
  file,
}: {
  title: string;
  file: File | null;
}) {
  try {
    if (!file) {
      throw new Error("Chưa chọn file");
    }

    if (!title) {
      throw new Error("Chưa nhập tên CV");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", title);

    const res = await api.post("/resumes/upload", formData, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function getResumeOptions() {
  try {
    const res = await api.get("/resumes/options", {
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

export async function getImageContentCV(id: number) {
  try {
    const res = await api.get(`/resumes/img-content/${id}`, {
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


export async function saveCandidateRequest(id: number) {
  try {
    const res = await api.post(`/favorite-candidate?candidateID=${id}`, {},{
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

export async function removeCandidateRequest(id: number) {
  try {
    const res = await api.put(`/favorite-candidate?candidateID=${id}`, {},{
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


export async function getAllSaveCandidate(page: number, size: number) {
  try {
    const res = await api.get(`/favorite-candidate?page=${page}&size=${size}`,{
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
    
export async function getResumeDetail(id: string) {
  try {
    const res = await api.get(`/resumes/${id}`, {
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
export async function createResume(data: CreateCVBody) {
  try {
    const res = await api.post("/resumes", data, {
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

export async function getImageCV(id: number) {
  try {
    const res = await api.get(`/resumes/get-image-cv/${id}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    console.log(res.data.data);

    return res.data.data.image as string[];

  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}