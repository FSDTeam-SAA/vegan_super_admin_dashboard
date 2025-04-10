import { PaginationMeta } from "./index";

type BusinessHours = {
  Day: string; // e.g., "monday", "tuesday"
  Time: string; // e.g., "9:00 AM - 7:00 PM" or "Closed"
  _id: string; // Unique ID for each business hour entry
};

type HighlightedStatement = {
  title: string; // Title of the highlighted statement
  description: string; // Description of the highlighted statement
  _id: string; // Unique ID for each highlighted statement
};

export type MerchantProfile = {
  _id: string; // Unique ID for the business profile
  userID: string; // ID of the user associated with the business
  profilePhoto: string; // URL of the profile photo
  fullName: string; // Full name of the business owner
  businessName: string; // Name of the business
  address: string; // Address of the business
  about: string; // Detailed description of the business
  shortDescriptionOfStore: string; // Short description of the store
  businessHours: BusinessHours[]; // Array of business hours
  highlightedStatement: HighlightedStatement[]; // Array of highlighted statements
  websiteURL: string; // URL of the business's website
  isVerified: "pending" | "approved" | "declined";
  createdAt: string; // ISO date string for creation time
  updatedAt: string; // ISO date string for last update time
  __v: number; // Version key (typically used by Mongoose)
  governmentIssuedID: string; // URL of the government-issued ID
  photoWithID: string; // URL of the photo with ID
  professionalCertification: string; // URL of the professional certification
  stripeAccountId: string; // Stripe account ID
};

export type MerchantProfileResponse = {
  success: boolean; // Indicates if the request was successful
  message: string; // Message from the server
  data: MerchantProfile[]; // The merchant profile data
  meta: PaginationMeta;
};
