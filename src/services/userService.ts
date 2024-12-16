import api from "@utils/axios";
import { getAccessToken } from "@utils/authUtils";
import { CandidateProfile, ICandidateProfile, IPassword, IRecruiterProfileUpdate, RecruiterProfile } from "@data/interface/profile";
import { AxiosError } from "axios";
import { ErrorReponseData, PostResponse } from "@data/interface";
import { IJobDemand } from "@data/interface/cv";

const fetchCandidateProfile = async () => {
  try {
    const res = await api.get("/users/candidate-profile", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    const profile = res.data.data.profile as CandidateProfile;
    return profile;
  } catch (error) {
    console.log(error);
  }
};

const fetchRecruiterProfile = async () => {
  try {
    const res = await api.get("/users/recruiter-profile", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      }
    })
    const profile = res.data.data.profile as RecruiterProfile;
    return profile;
  }
  catch (error) {
    console.log(error);
  }
}

const sendUpdateProfileRequest = async (data: ICandidateProfile) => {
  try {
    const res = await api.put("/users/candidate-profile", data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data as PostResponse;

  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }

}
const sendUpdateRecruiterProfileRequest = async (data: IRecruiterProfileUpdate) => {
  try {
    const res = await api.put("/users/recruiter-profile", data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data as PostResponse;

  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }

}

const changeAvatarRequest = async (formData: FormData) => {
  try {
    const res = await api.put("/users/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data.data.avatar as string;

  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

const resetPassword = async (data: IPassword) => {
  try {
    const res = await api.put("/users/reset-password", data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return res.data as PostResponse;

  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

const fetchJobDemandCandidate = async () => {
  try {
    const res = await api.get("/users/job-demand", {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      }
    })
    return res.data.data;
  }
  catch (error) {
    console.log(error);
  }
}
const sendUpdateJobDemandCandidateRequest = async (data: IJobDemand) => {
  try {
    const res = await api.put("/users/job-demand",data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      }
    })
    const profile = res.data.data;
    return profile;
  }
  catch (error) {
    console.log(error);
  }
}

const sendCreateJobDemandCandidateRequest = async (data: IJobDemand) => {
  try {
    const res = await api.post("/users/job-demand",data, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      }
    })
    const profile = res.data.data;
    return profile;
  }
  catch (error) {
    console.log(error);
  }
}

export {
  sendUpdateJobDemandCandidateRequest,
  sendCreateJobDemandCandidateRequest,
  fetchJobDemandCandidate,
  fetchCandidateProfile,
  sendUpdateProfileRequest,
  changeAvatarRequest,
  fetchRecruiterProfile,
  resetPassword,
  sendUpdateRecruiterProfileRequest
};
