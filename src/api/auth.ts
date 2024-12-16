import { ICandidateRegister, ILogin } from "@features/authentication";
import api from "@utils/axios";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { ErrorReponseData, PostResponse } from "@data/interface";
import { IRecruiterRegister, ISetPassword, IUserInforGoogle, IVerifyOTP } from "@data/interface/auth";
import { getAccessToken } from "@utils/authUtils";

// function login account
export async function loginAccount(data: ILogin) {
  try {
    const res = await api.post("/auth/login", data);
    const resData = res.data;

    if (resData.status === "success") {
      Cookies.set("access_token", resData.data.access_token);
      Cookies.remove("email");

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 24);
      Cookies.set("expiration", expiration.toISOString());
    }
    return resData as PostResponse;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

// function register for candidate
export async function candidateRegisterAccount(data: ICandidateRegister) {
  try {
    const res = await api.post("/auth/register", data);
    return res.data as PostResponse;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

// function register for recruiter
export async function recruiterRegisterRequest(data: IRecruiterRegister) {
  try {
    const res = await api.post("/auth/recruiter/register", data);
    return res.data as PostResponse;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

// function register for recruiter
export async function verifyOTP(data: IVerifyOTP) {
  try {
    const res = await api.post("/auth/verify", data);
    return res.data as PostResponse;
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function googleLoginRequest(data: IUserInforGoogle) {
  try {
    const res = await api.post("/auth/google/login", data);

    if (res.data.status === "success") {
      Cookies.set("access_token", res.data.data.access_token);
      Cookies.remove("email");

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 24);
      Cookies.set("expiration", expiration.toISOString());
    }
    return res.data as PostResponse;

  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}

export async function fetchUserInfor(data: string) {
  try {
    const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
          Authorization: `Bearer ${data}`,
      },
  });
    return res.json();
  } catch (error) {
    const typedError = error as AxiosError;
    const data = typedError.response?.data as ErrorReponseData;
    throw new Error(data.message);
  }
}


// function set password
export async function setPassword(data: ISetPassword) {
  try {
    const res = await api.put("/auth/set-password", data,{
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