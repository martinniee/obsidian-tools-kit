import { copyContentToClipboard, getMainContent } from "src/utils";

/**
 * --------Add back to top link for juejin--------
 * @returns Main content of note with added back to top link
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

/**
 * Copy main content with added b2 p link to clipboard
 */
export const copyMainContentWithAddedB2PLinkToClipboard = async () => {
    copyContentToClipboard(await addBackToTopLinkForJuejin())
}