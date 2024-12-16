import { Option } from "./option";

export type CompanyProfile = {
    id: number;
  name: string;
  description: string;
  scale: string;
  address: string;
  email: string;
  phone: string;
  webUrl: string;
  rejectReason: string;
  image: string;
  status: string;
  businessLicense: string;
  isVerified: boolean;
  location?: Option;
}

export interface ICompanyProfile  {
    id: number;
    name: string,
    address: string,
    description: string,
    phone?: string,
    web_url?: string,
    email?: string,
    scale: string,
    location: number,
}

export type CompanyHotCardData = {
    id: number;
    name: string;
    image: string;
    rank: number;
    numberJob: number;
}