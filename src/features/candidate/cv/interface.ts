export interface EducationItemType {
  id: number;
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface LanguageItemType {
  id: number;
  name: string;
  description: string;
  level?: string;
}

export interface WorkHistoryItemType {
  id: number;
  position?: string;
  description?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  workLocation?: string;
}

export interface ProjectItemType {
  id: number;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}
