import { copyContentToClipboard } from './utils/copyContentToClipboard';
import { getMainContent } from './utils/getMainContent';


/**
 * Copy main body of note to clipboard
 */
export const copyMainContentToClipboard = async () => {
    try {
        copyContentToClipboard(await getMainContent() as string);
    } catch (error) {
        console.error(error.name, error.message);
    }
}