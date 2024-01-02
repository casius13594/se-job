import { UUID } from "crypto";

export interface employeeCompany {
  id: number;
  job_id: UUID;
  employee_id: UUID;
  name: string;
  email: string;
  phone: string;
  cv_path: string;
  propo_letter: string;
  status: string;
}

export interface userinfo {
  id: number;
  user_id: UUID;
  name: string;
  email: string;
  last_login: string;
  role: string;
  banned_until: string;
}

export interface jobInfo {
  id: number;
  job_id: UUID;
  employer_id: UUID;
  name: string;
  employer_name: string;
  status: string;
  action: string;
}
