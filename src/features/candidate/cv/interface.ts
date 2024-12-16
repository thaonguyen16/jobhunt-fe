export interface EducationItemType {
  id?: number;
  schoolName?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface LanguageItemType {
  id?: number;
  name?: string;
  description?: string;
  level?: string;
}

export interface WorkHistoryItemType {
  id?: number;
  position?: string;
  description?: string;
  companyName?: string;
  startDate?: string;
  endDate?: string;
  workLocation?: string;
  timeRangeString?: string;
}

export interface ProjectItemType {
  id?: number;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface RefererType {
  fullName?: string;
  email?: string;
  phone?: string;
  contactLink?: string;
}