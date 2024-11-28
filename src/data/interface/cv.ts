import { Option } from "./option"
import { CandidateProfile } from "./profile"

export interface CV {
    id: string
    avatar: string
    candidateName: string
    titleWork: string
    location: string
    birthday: string
    updateTime: string
    education: string[]
    experience: string[]
    objective: string
}

export type ConvertCVToHTML = {
    html: string,
    css: string,
    image: string,
    layout: string,
    folder: string,
}

export type FilterCandidateCV = {
    keyWord: string,
    location: string[],
    workMode: string,
    industry: string,
    subIndustry: string,
    experience: number,
    degree: string, 
    salaryMin: number,
    salaryMax: number,
    updateSort: boolean,
    findJobSort: boolean,
}

export type CandidateCV = {
    id: number;
    address: string;
    avatarUrl: string;
    description: string
    email: string;
    firstName: string;
    lastName: string;
    name: string,
    phone: string,
    title: string,
    updatedAt: string
    url: string,
    candidate: CandidateProfile
    birthday: string
    jobDemand: JobDemandData
}

export type JobDemandData = {
    workTitle: string,
    industry: Option,
    subIndustry: Option,
    salary: number,
    experience: number,
    degree: string,
    location: Option,
    workMode: Option,
    changeLocation: boolean,
}

export interface IJobDemand {
    workTitle: string,
    industry: number,
    subIndustry: number,
    salary: number,
    experience: number,
    degree: string,
    location: number,
    workMode: number,
    changeLocation: boolean,
}