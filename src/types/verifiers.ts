import { PaginationMeta } from "./index";

export type VerifiersUser = {
  _id: string; // MongoDB ObjectId as a string
  role: string; // e.g., "verifier"
  fullName: string; // Full name of the user
  email: string; // Email address
  password: string; // Hashed password
  accountType: string | null; // Account type, nullable
  verifyEmail: boolean; // Whether the email is verified
  paymentAdded: boolean; // Whether payment information is added
  isgratings: boolean; // Custom flag (likely a typo, could be renamed)
  isVerified: "pending" | "approved" | "declined";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number; // Version key, typically used by Mongoose
  profilePhoto: string; // URL of the profile photo
  city: string; // City name
  country: string; // Country name
  state: string; // State or region name
};

export type VerifiersUserResponse = {
  success: boolean;
  message: string;
  data: VerifiersUser[];
  meta: PaginationMeta;
};
