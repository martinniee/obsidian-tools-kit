
import { TFile, Notice } from 'obsidian';


/**
 * Copy the preccessed contents that have been added back-top-link to clipboard
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

/**
 * Get the main contents except the frontmatter
 */
export const getMainContent = async (): Promise<string> => {
    const activeMd: TFile = app.workspace.getActiveFile() as TFile;
    const origin_filecontents = await app.vault.read(activeMd);
    const fileContents_array = origin_filecontents.split("\n");
    const new_filecontents: string[] = [];

    let num: number = 0;
    for (let line of fileContents_array) {
        const isMatchFrontmatter: boolean = line.match(/^-{3}/g) !== null;
        if (isMatchFrontmatter && num < 2) {
            num++
            continue;
        }
        if (num < 2) {
            continue;
        }
        new_filecontents.push(line);
    }
    return new_filecontents.join("\n") as string;
}
/**
 * 
 * @returns 
 */
export const addBackToTopLinkForJuejin = async (): Promise<string> => {
    const main_content: string = await getMainContent() as string;
    const new_filecontents: string[] = [];
    const fileContents_array = main_content.split("\n");

    //  iterate all lines of current note 
    for (let line of fileContents_array) {
        // match h2/3/4/5/6 header
        const isMatchOtherHeaders: Boolean = line.match(/^#{2,6} +.*/gm) !== null;
        // if match 
        if (isMatchOtherHeaders) {
            const otherHeader = (line.match(/^#{2,6} +.*/gm) as string[])[0];
            // concat 
            const afterContent: string = `[回到顶部](#heading-0)\n${otherHeader}`;
            new_filecontents.push(line.replace(otherHeader, afterContent));
        } else {
            new_filecontents.push(line);
        }
    }
    return new_filecontents.join("\n") as string;
}