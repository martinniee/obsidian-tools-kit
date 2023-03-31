import { TFile } from "obsidian";

/**
 * Get the main contents except the frontmatter
 */
export const getMainContent = async (): Promise<string | undefined> => {
    const activeMd: TFile = app.workspace.getActiveFile() as TFile;
    const origin_filecontents = await app.vault.read(activeMd);
    const isFrontmatterExists = await isContainsFrontmatter();
    // when current note contains frontmatter
    if (isFrontmatterExists) {
        return await getMainContentWhenFrontMatterExists();
    } else {
        // when current note does not contains frontmatter
        return origin_filecontents;
    }
}

/**
 * If the note contain frontmatter
 */
const isContainsFrontmatter = async (): Promise<boolean | undefined> => {
    const activeMd: TFile = app.workspace.getActiveFile() as TFile;
    const origin_filecontents = await app.vault.read(activeMd);
    const fileContents_array = origin_filecontents.split("\n");

    let num: number = 0;
    for (let line of fileContents_array) {
        const isMatchFrontmatter: boolean = line.match(/^-{3}/g) !== null;
        if (isMatchFrontmatter && num < 2) {
            num++
            if (num > 1) {
                // exists frontmatter in current note
                return true;
            }
            continue;
        } else {
            continue;
        }
    }
    if (!(num > 1)) {
        // no-existent frontmatter in current note
        return false;
    }
}

/**
 * Get main content when frontmatter exists
 */
const getMainContentWhenFrontMatterExists = async (): Promise<string> => {
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