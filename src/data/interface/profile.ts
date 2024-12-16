import { Option } from "./option"
import { SubIndustry } from "./subIndustry"

export type CandidateProfile = {
    id: number,
    email: string,
    gender: string,
    fullName: string,
    phone: string,
    avatar: string,
    industry: Option,
    subIndustries: SubIndustry[],
    location: Option,
    findJob: boolean,
    password: boolean,
    vip: boolean,
}

export interface ICandidateProfile {
    email: string,
    gender: string,
    fullName:string,
    phone: string,
    avatar: string,
    locationId: number,
    industryId: number,
    subIndustryIds: number[],
    findJob: boolean
}

export type RecruiterProfile = {
    id: number,
    email: string,
    fullName: string,
    phoneNumber: string,
    avatar: string,
    status: string,
    createdAt: string,
    updatedAt: string,
    password: boolean,
    vip: boolean;
}

export interface IRecruiterProfileUpdate {
    fullName: string,
    phoneNumber: string,
}

export interface IPassword {
    old_password: string;
    new_password: string;
    confirm_new_password: string;
}
