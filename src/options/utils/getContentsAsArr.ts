import { TFile } from "obsidian";

/**
 * Get entire note contents 
 */
export const getContentsArr = async (): Promise<string[]> => {
    const activeMd: TFile = app.workspace.getActiveFile() as TFile;
    const origin_filecontents = await app.vault.read(activeMd);
    return origin_filecontents.split('\n');
}