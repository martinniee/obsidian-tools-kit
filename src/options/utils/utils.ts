import MyPlugin from "main";
import { TFile } from "obsidian";
/**
 *
 * @returns Index where the first h1 heading at
 */
export const getFirstH1HeadingPostion = async (): Promise<number> => {
	const activeFile: TFile = app.workspace.getActiveFile() as TFile;
	const fileContents = (await app.vault.read(activeFile)).split("\n");
	let lineNum = 0;
	for (let index = 0; index < fileContents.length; index++) {
		if (fileContents[index].match(/^#(?: )+.*/)) {
			lineNum = index;
			break;
		}
	}
	return lineNum;
};
/**
 * File contents processing method
 * @param callback custom contents processing function
 */
export const fileContentsProcess = async (
	callback: (line: string, myPlugin?: MyPlugin) => string
) => {
	const activeFile: TFile = app.workspace.getActiveFile() as TFile;
	const fileContents = (await app.vault.read(activeFile)).split("\n");
	const newFileContents: string[] = [];
	for (let line of fileContents) {
		newFileContents.push(callback(line));
	}
	app.vault.adapter.write(activeFile.path, newFileContents.join("\n"));
};
