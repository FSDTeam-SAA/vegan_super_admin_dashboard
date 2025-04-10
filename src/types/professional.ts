import { PaginationMeta } from "./index";

type HighlightedStatement = {
  title: string;
  description: string;
  _id: string;
};

export type ProfessionalProfile = {
  _id: string;
  userId: string;
  profilePhoto: string;
  fullName: string;
  designation: string;
  businessName: string;
  address: string;
  about: string;
  highlightedStatement: HighlightedStatement[];
  experience: string[];
  certifications: string[];
  websiteURL: string;
  isVerified: "pending" | "approved" | "declined";
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
  governmentIssuedID: string;
  photoWithID: string;
  professionalCertification: string;
  stripeAccountId: string;
  city: string;
  country: string;
  state: string;
};

export type ProfessionalProfileResponse = {
  success: boolean;
  message: string;
  data: ProfessionalProfile[];
  meta: PaginationMeta;
};
