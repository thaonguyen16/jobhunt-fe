import { Option } from "./option";
export type Industry = {
    id: number;
    name: string;
    subIndustry: Option[];
}

export type IndustryCardData = {
    id: number,
    name: string,
    icon: string,
    numberJob: number,
}