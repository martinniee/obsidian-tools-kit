import { TFile, App } from 'obsidian';


/**
 * 
 * OtherHeaders: markdown headers excludes h1 header
 * 
 * example:
 * 		## foo 
 *  -------- ↓ ----------
 * 		[回到顶部](#H1-foo)
 * 		## foo 
 * 
 * @param docContent current note content
 */
export const addBackToTopLinkForOtherHeaders = async () => {
    // get note content
    const activeMd: TFile = app.workspace.getActiveFile() as TFile;
    const origin_filecontents = await app.vault.read(activeMd);
    const new_filecontents: string[] = [];
    const fileContents_array = origin_filecontents.split("\n");

    // Match h1 header
    const h1Title = (origin_filecontents.match(/(?<=^# )(.*)/mg) as string[])[0];
    if (h1Title == null) {

    }
    //  iterate all lines of current note 
    for (let line of fileContents_array) {
        // match h2/3/4/5/6 header
        const isMatchOtherHeaders: Boolean = line.match(/^#{2,6} +.*/gm) !== null;
        // if match 
        if (isMatchOtherHeaders) {
            const otherHeader = (line.match(/^#{2,6} +.*/gm) as string[])[0];
            // concat 
            const afterContent: string = `[回到顶部](#${h1Title})\n${otherHeader}`;
            new_filecontents.push(line.replace(otherHeader, afterContent));
        } else {
            new_filecontents.push(line);
        }
    }
    // write processed content to activeMd
    app.vault.adapter.write(activeMd.path, new_filecontents.join("\n"));

}

/**
 * Clear existed back-top-link
 */
export const clearBackToTopLink = async () => {
    const activeMd: TFile = app.workspace.getActiveFile() as TFile;
    const origin_filecontents = await app.vault.read(activeMd);
    const new_filecontents: string[] = [];
    const fileContents_array = origin_filecontents.split("\n");

    // iterate
    for (let line of fileContents_array) {
        //  match [回到顶部](#xxxx)
        const isMatchBackToTopLink: boolean = line.match(/(\[.*\]\(#.*\))/gm) !== null;
        // if match link
        if (isMatchBackToTopLink) {
            const removeLink = line.replace(/(\[.*\]\(#.*\))/gm, '') as string;
            new_filecontents.push(removeLink);
        } else {
            new_filecontents.push(line);
        }
    }
    // write processed content to activeMd
    app.vault.adapter.write(activeMd.path, new_filecontents.join("\n"));
}