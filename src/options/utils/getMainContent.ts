import { TFile } from "obsidian";

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