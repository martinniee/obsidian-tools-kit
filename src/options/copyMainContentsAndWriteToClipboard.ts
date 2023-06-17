import { copyContentToClipboard, getMainContent } from "src/utils";

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