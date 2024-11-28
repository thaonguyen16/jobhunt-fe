export type CompanyProfile = {
    id: number,
    name: string,
    description: string,
    scale: string,
    address: string,
    email: string,
    phone: string,
    webUrl: string,
    image: string,
    status: string,
    businessLicense: string,
    isVerified: boolean
}

export interface ICompanyProfile  {
    name: string,
    address: string,
    description: string,
    phone?: string,
    web_url?: string,
    email?: string
    scale: string
}

export type CompanyHotCardData = {
    id: number;
    name: string;
    image: string;
    rank: number;
    numberJob: number;
}