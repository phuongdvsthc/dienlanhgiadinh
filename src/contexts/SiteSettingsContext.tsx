import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSiteSettings } from '../repositories/siteSettingsRepo';
import { siteConfig as fallbackConfig } from '../data/site';

export type MergedSiteConfig = typeof fallbackConfig & {
  copyright?: string;
  contact: typeof fallbackConfig.contact & {
    supportEmail?: string;
  };
};

interface SiteSettingsContextType {
  settings: MergedSiteConfig;
  isLoading: boolean;
  isUsingFallback: boolean;
  error: Error | null;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: fallbackConfig,
  isLoading: true,
  isUsingFallback: true,
  error: null,
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<MergedSiteConfig>(fallbackConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchSettings = async () => {
      try {
        const firestoreData = await getSiteSettings();
        
        if (isMounted) {
          if (firestoreData) {
            // Hợp nhất dữ liệu (Merge logic)
            const mergedSettings: MergedSiteConfig = {
              ...fallbackConfig,
              name: firestoreData.brandName || fallbackConfig.name,
              domain: firestoreData.domain || fallbackConfig.domain,
              logo: firestoreData.logoUrl || fallbackConfig.logo,
              copyright: firestoreData.copyright || "",
              contact: {
                ...fallbackConfig.contact,
                hotline: firestoreData.hotline || fallbackConfig.contact.hotline,
                callUrl: firestoreData.phoneUrl || fallbackConfig.contact.callUrl,
                zalo: firestoreData.zaloNumber || fallbackConfig.contact.zalo,
                zaloUrl: firestoreData.zaloUrl || fallbackConfig.contact.zaloUrl,
                email: firestoreData.email || fallbackConfig.contact.email,
                supportEmail: firestoreData.supportEmail || firestoreData.email || fallbackConfig.contact.email,
                address: firestoreData.address || fallbackConfig.contact.address,
                mapUrl: firestoreData.googleMapsUrl || fallbackConfig.contact.mapUrl,
                workingHours: firestoreData.workingHours || fallbackConfig.contact.workingHours,
              },
              social: [
                { name: "Facebook", url: firestoreData.socialLinks?.facebookUrl || fallbackConfig.social.find(s => s.name === 'Facebook')?.url || "", icon: "facebook" },
                { name: "YouTube", url: firestoreData.socialLinks?.youtubeUrl || fallbackConfig.social.find(s => s.name === 'YouTube')?.url || "", icon: "youtube" },
                { name: "TikTok", url: firestoreData.socialLinks?.tiktokUrl || "", icon: "tiktok" },
                { name: "Zalo", url: firestoreData.socialLinks?.zaloUrl || firestoreData.zaloUrl || fallbackConfig.contact.zaloUrl, icon: "zalo" }
              ].filter(s => s.url)
            };
            
            setSettings(mergedSettings);
            setIsUsingFallback(false);
          }
          setIsLoading(false);
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Failed to load site settings from Firestore:", err);
          setError(err);
          setIsLoading(false);
          setIsUsingFallback(true);
        }
      }
    };

    fetchSettings();
    
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, isLoading, isUsingFallback, error }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
