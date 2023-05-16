import CryptoJS from 'crypto-js';
/**
 * Generate unique id by the specific content with md5
 * @param content 
 */
export const genenerateUniqueId = (content: string): string => {
    const md5Hash = CryptoJS.MD5(content).toString();
    return md5Hash;
}

