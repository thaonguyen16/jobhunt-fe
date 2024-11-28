export interface IAddJob {
  title: string;
  description: string;
  requirement: string;
  benefit: string;
  slots: number;
  minSalary: number;
  maxSalary: number;
  workLocation: string;
  experienceRange: string;
  workTime: string;
  is_hot: boolean;
  experience_id: number;
  deadline: Date;
  location_id: number;
  industry_id: number;
  work_mode_id: number;
  status: string;
  rejectReason: string;
  sub_industry_ids: number[];
}
