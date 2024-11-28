export interface IIndustry {
  id: number;
  name: string;
}
export interface ISubIndustry {
  id: number;
  name: string;
  industry: IIndustry;
}

export interface IAddSubIndustries {}

export interface IDeleteManySubIndustries {
  ids: number[];
}

export interface IUpdateSubIndustry {
  name: string;
  industryId: number;
}

export interface IAddUserFormInput {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[];
  companyName?: string;
  companyEmail?: string;
  companyWebsite?: string;
  companyAddress?: string;
  companyPhone?: string;
}
