export interface BidObject {
  id?: number;
  content?: string;
  rate?: number;
  author: { name: string; email: string };
}
