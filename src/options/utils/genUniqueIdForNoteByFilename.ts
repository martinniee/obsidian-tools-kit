import CryptoJS from 'crypto-js';
/**
 * Generate unique id by filename with md5
 * @param fileName note name
 */
export const genUniqIdForNote = (fileName: string): string => {
    const md5Hash = CryptoJS.MD5(fileName).toString();
    return md5Hash;
}

