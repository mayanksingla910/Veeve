// types/job.ts
export interface Job {
  id: string;
  company: string;
  logo: string;
  location: string;
  postedAt: string;
  description: string;
  isSaved?: boolean;
}