import nlToolsKit from "main";
import { Notice, TFile } from "obsidian";
import CryptoJS from "crypto-js";

export interface processFunc {
	(contentsArr: string[], plugin?: nlToolsKit): string[];
}
/**
 * File contents processing class
 */
export class fileContentsProcess {
	#processFunc: processFunc;
	#delay: number = 1000;
	constructor(
		callback: processFunc, // function for core-logic for  text processsing
		delay: number = 1000 // if no value is passed, set 1000 as default
	) {
		this.#processFunc = callback;
		this.#delay = delay;
	}
	async process(plugin?: nlToolsKit): Promise<any> {
		const activeFile: TFile = app.workspace.getActiveFile() as TFile;
		const fileContents = (await app.vault.read(activeFile)).split("\n");
		let newFileContents: string[] = [];
		newFileContents = this.#processFunc(
			fileContents as string[],
			plugin as nlToolsKit
		);
		app.vault.adapter.write(activeFile.path, newFileContents.join("\n"));
		setTimeout(() => {
			return "OK";
		}, this.#delay);
	}
}
export const deleteArrayElement = (arr: string[], index: number): string[] => {
	if (index === 0) {
		return [...arr.slice(1)];
	} else if (index === arr.length - 1) {
		return arr.slice(0, index);
	} else {
		return [...arr.slice(0, index), ...arr.slice(index + 1)];
	}
};
/**
 * Generate unique id by the specific content with md5
 * @param content
 */
export const genenerateUniqueId = (content: string): string => {
	const md5Hash = CryptoJS.MD5(content).toString();
	return md5Hash;
};
/**
 * Get entire note contents
 */
export const getContentsArr = async (): Promise<string[]> => {
	const activeMd: TFile = app.workspace.getActiveFile() as TFile;
	const origin_filecontents = await app.vault.read(activeMd);
	return origin_filecontents.split("\n");
};
/**
 * Get the main contents except the frontmatter
 */
export const getMainContent = async (): Promise<string> => {
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
};
/**
 * If the note contain frontmatter
 */
export const isContainsFrontmatter = async (): Promise<boolean> => {
	const fileContents_array = await getContentsArr();

	let num: number = 0;
	for (let line of fileContents_array) {
		const isMatchFrontmatter: boolean = line.match(/^-{3}/g) !== null;
		if (isMatchFrontmatter && num < 2) {
			num++;
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
	} else {
		return true;
	}
};
/**
 * Get main content when frontmatter exists
 */
const getMainContentWhenFrontMatterExists = async (): Promise<string> => {
	const fileContents_array = await getContentsArr();
	const new_filecontents: string[] = [];

	let num: number = 0;
	for (let line of fileContents_array) {
		const isMatchFrontmatter: boolean = line.match(/^-{3}/g) !== null;
		if (isMatchFrontmatter && num < 2) {
			num++;
			continue;
		}
		if (num < 2) {
			continue;
		}
		new_filecontents.push(line);
	}
	return new_filecontents.join("\n");
};
/**
 * Copy  contents and write to clipboard
 *
 * @param content Text written to clipboard
 */

export const copyContentToClipboard = async (content: string) => {
	try {
		// Create ClipboardItem object , and write to clipboard
		await navigator.clipboard.write([
			new ClipboardItem({
				"text/plain": new Blob([content], { type: "text/plain" }),
			}),
		]);
		new Notice("Copy to clipboard!");
	} catch (error) {
		console.error(error.name, error.message);
	}
};
/**
 * Get the frontmatter from markdown contents
 *
 * @param contents  The entire contents
 * @returns
 */
export const getYaml = async (): Promise<string> => {
	const contents = (await getContentsArr()).join("\n");
	const isFrontmatterExsit = await isContainsFrontmatter();
	if (isFrontmatterExsit) {
		const frontmatterString = contents.split("---")[1]?.trim();
		const yaml = `---\n${frontmatterString}\n---`;
		return yaml;
	} else {
		return "";
	}
};
export const getYamlArr = async (): Promise<string[][]> => {
	const arr = (await getYaml()).split("\n");
	if (!arr.length) return [];
	const fields = arr.filter((item) => {
		return item != "---";
	});
	const fontmatter = fields.map((field) => {
		return field.split(":");
	});
	return fontmatter;
};
export const getYamlEndtIndex = async (): Promise<number> => {
	let contents = await getContentsArr();
	let mainContents = (await getMainContent()).split("\n");
	return contents.length - mainContents.length;
};
/**
 * @returns Index where the first h1 heading at
 */
export const getFirstH1HeadingPostion = async (): Promise<number> => {
	const activeFile: TFile = app.workspace.getActiveFile() as TFile;
	const fileContents = await getContentsArr();
	let lineNum = 0;
	let isInCode = false;
	for (let index = 0; index < fileContents.length; index++) {
		let line = fileContents[index];
		if (/( *)```/.test(line)) {
			isInCode = !isInCode;
		}
		if (/#(?: )+.*/.test(line) && !isInCode) {
			lineNum = index as number;
			break;
		}
	}
	return lineNum;
};
