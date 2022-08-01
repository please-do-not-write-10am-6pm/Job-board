export interface JobObject {
  id?: number;
  title?: string;
  description?: string;
  rate?: number;
  status?: string;
  authorId?: number;
  author: { name: string };
  isApproved: boolean;
}
