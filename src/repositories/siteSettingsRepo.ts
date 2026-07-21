import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SiteSettings } from '../types';

export const getSiteSettings = async (): Promise<SiteSettings | null> => {
  try {
    const generalDocRef = doc(db, 'siteSettings', 'general');
    const docSnap = await getDoc(generalDocRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as SiteSettings;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching siteSettings/general:', error);
    // Tùy thuộc vào yêu cầu của ứng dụng, chúng ta có thể ném lỗi 
    // hoặc trả về null khi bị permission-denied hoặc lỗi mạng.
    // Ở đây trả về null để UI có thể fallback an toàn.
    return null;
  }
};
