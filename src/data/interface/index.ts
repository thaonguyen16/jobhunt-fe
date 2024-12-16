import { store } from "@store";

export interface Option {
  id: string;
  name: string;
}

export type CompanyInfo = {
  id: number;
  name?: string;
  image?: string;
  branch?: string;
  scale?: string;
  description?: string;
  address?: string;
  webUrl?: string;
  email?: string;
  phone?: string;
  status?: string;
  jobNumber?: number;
};

export type JobDetailType = {
  id: string;
  title: string;
  description: string;
  benefit: string;
  requirement: string;
  salaryRange: Option;
  position: Option;
  location: Option;
  company: CompanyInfo;
  field: Option;
  major: Option;
  experienceRange: Option;
  slots: number;
  isHot: boolean;
  workMode: Option;
  createdAt: string;
  restAppliedDays: number;
  locationId: number;
  updatedAt: string;
  createdBy: string;
  view: number;
  applyNumber: number;
  likeNumber: number;
  deadline: string;
  status: string;
  workTime: string;
  workLocation: string;
};

export type CandidateJob = {
  id?: string;
  title?: string;
  applyCount?: number;
  companyName?: string;
  companyLogo?: string;
  expired?: boolean;
  location?: Option;
  textSalary?: string;
  deadline?: string | null;
  companyImage?: string;
  isFavorite?: boolean;
  isHot?: boolean;
  status?: string;
  createdAt?: string;
};

export type UserProfile = {
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  avatar: string;
};

export type ListJobs = {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  listData: CandidateJob[];
};

export type SidebarItemType = {
  tabIndex: number;
  content: string;
  icon: JSX.Element;
};

export type ErrorReponseData = {
  message: string;
  status: string;
};

export type PostResponse = {
  message: string;
  status: string;
};

export interface LocationData {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: [];
}

export interface IUserProfile {
  id: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
  roles?: string[];
  avatar?: string;
}

export type AppDispatch = typeof store.dispatch;
