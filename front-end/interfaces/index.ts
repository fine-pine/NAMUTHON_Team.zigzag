export type User = {
  name: string;
  picture: string;
  sub: string;
  email?: string;
};

export type Comment = {
  id: string;
  created_at: number;
  url: string;
  text: string;
  user: User;
};

export type Post = {
  slug?: string;
  title?: string;
  author?: string;
  date?: Date;
  content?: string;
  excerpt?: string;
  [key: string]: any;
};

export type ApplicationForm = {
  watt?: number;
  address?: string;
  address_detail?: string;
  phone_number?: string;
  bank?: Bank;
  account?: string;
};

export type Application = {
  id: number;
  user_id: number;
  watt: number;
  address: string;
  phone_number: string;
  bank: Bank;
  account: string;
  status: 0 | 1 | 2 | 3;
  description?: string;
  admittedAt?: Date;
  collectedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export enum Bank {
  "국민",
  "신한",
  "하나",
}
