import { TFile } from "obsidian";
interface metaData {
	h1Title: string;
	flag: boolean;
}
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
 * callback: (line:string,plugin?:Plugin,globalVariable?:{})
 * @param callback custom contents processing function
 * @param isRePromise determing whether return promise
 * @param delay delay time
 * @returns
 */
export const fileContentsProcess = async (
	callback: any,
	isRePromise?: boolean,
	delay?: number
): Promise<void> => {
	const activeFile: TFile = app.workspace.getActiveFile() as TFile;
	const fileContents = (await app.vault.read(activeFile)).split("\n");
	let newFileContents: string[] = [];
	const metadata = { flag: false };
	if (!delay) delay = 1000; // no delay passed, set 1000 ms as default
	for (let line of fileContents) {
		newFileContents.push(callback(line, metadata));
	}
	newFileContents = newFileContents.filter((item) => item != "DELETED_LINE");
	app.vault.adapter.write(activeFile.path, newFileContents.join("\n"));
	if (isRePromise) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, delay);
		});
	}
};
