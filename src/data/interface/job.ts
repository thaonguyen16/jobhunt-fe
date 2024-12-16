import { Option } from "./option";

export type JobCardData = {
    id: number,
    title: string,
    deadline: string,
    updatedAt: string,
    salary: string,
    company: JobCompanyCard,
    location: Option,
    industry: Option,
    isSaved: boolean,
    isHot: boolean,
}

export interface JobCompanyCard {
    id: number,
    name: string,
    image: string,
}