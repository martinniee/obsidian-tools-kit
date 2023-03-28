import { Notice } from 'obsidian';

/**
 * Copy  contents and write to clipboard
 * 
 * @param content Text written to clipboard
 */

export const copyContentToClipboard = async (content: string) => {

    try {
        // Create ClipboardItem object , and write to clipboard
        await navigator.clipboard.write([
            new ClipboardItem({ "text/plain": new Blob([content], { type: "text/plain" }) })
        ]);
        new Notice("Copy to clipboard!");

    } catch (error) {
        console.error(error.name, error.message);
    }

}