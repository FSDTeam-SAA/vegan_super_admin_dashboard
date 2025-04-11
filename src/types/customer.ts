import { PaginationMeta } from "./index";

export type Customer = {
  _id: string;
  role: string;
  fullName: string;
  email: string;
  password: string;
  accountType: string | null;
  verifyEmail: boolean;
  paymentAdded: boolean;
  isgratings: boolean;
  isVerified: "pending" | "approved" | "declined";
  createdAt: string; // ISO date string format
  updatedAt: string; // ISO date string format
  __v: number;
  address: string;
  bio: string;
  phoneNumber: string;
  profilePhoto: string;
  city: string;
  country: string;
  state: string;
};

export type CustomersApiResponse = {
  success: boolean;
  message: string;
  data: Customer[];
  meta: PaginationMeta;
};
