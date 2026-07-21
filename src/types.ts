import { Timestamp } from 'firebase/firestore';

export interface SiteSettings {
  brandName: string;
  domain: string;
  hotline: string;
  phoneUrl: string;
  zaloNumber: string;
  zaloUrl: string;
  email: string;
  supportEmail: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
  logoUrl: string;
  faviconUrl: string;
  copyright: string;
  socialLinks: {
    facebookUrl: string;
    youtubeUrl: string;
    tiktokUrl: string;
    zaloUrl: string;
  };
  createdAt: Timestamp | Date | null;
  updatedAt: Timestamp | Date | null;
}
