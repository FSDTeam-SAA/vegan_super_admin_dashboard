import { PaginationMeta } from "./index";

export type OrganizationProfile = {
  _id: string; // MongoDB-like unique identifier
  userID: string; // Reference to the user ID
  organizationName: string; // Name of the organization
  profilePhoto: string | null; // URL to the profile photo or null if not available
  address: string; // Physical address of the organization
  missionStatement: string; // Mission statement of the organization
  about: string; // Description of the organization
  shortDescriptionOfOrganization: string; // Short description of the organization
  experience: string[]; // Array of experiences or expertise areas
  certifications: string[]; // Array of certifications held by the organization
  websiteURL: string; // URL of the organization's website
  isVerified: "pending" | "approved" | "declined";
  createdAt: string; // ISO date string for creation timestamp
  updatedAt: string; // ISO date string for last update timestamp
  __v: number; // Version key (used by Mongoose)
  governmentIssuedID: string; // URL to the government-issued ID image
  photoWithID: string; // URL to the photo with ID image
  professionalCertification: string; // URL to the professional certification image
  stripeAccountId: string; // Stripe account ID for payment processing
  city: string; // City where the organization is located
  country: string; // Country where the organization is located
  state: string; // State where the organization is located
};

export type OrganizationProfileResponse = {
  success: boolean;
  message: string;
  data: OrganizationProfile[];
  meta: PaginationMeta;
};
