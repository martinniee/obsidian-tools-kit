import nlToolsKit from "main";
import { Notice, TFile } from "obsidian";
import CryptoJS from "crypto-js";

type removeFun = () => Promise<string>;
interface metaData {
	[propName: string]: {
		value: any;
	};
}
export interface processFunc {
	(
		line: string,
		metaData: metaData,
		plugin: nlToolsKit,
		index?: number
	): Promise<string | void>;
}
/**
 * File contents processing class
 */
export class fileContentsProcess {
	#processFunc: processFunc;
	#delay: number = 1000;
	#metaData: metaData;
	#line: string;
	// #plugin: nlToolsKit;
	#removeObj: any;
	constructor(
		callback: processFunc, // function for core-logic for  text processsing
		metaData: metaData = {},
		delay: number = 1000, // if no value is passed, set 1000 as default
		removeObj?: fileContentsProcess
	) {
		this.#processFunc = callback;
		this.#delay = delay;
		this.#metaData = metaData as metaData;
		this.#removeObj = removeObj as fileContentsProcess;
	}

	async process(plugin?: nlToolsKit): Promise<any> {
		const activeFile: TFile = app.workspace.getActiveFile() as TFile;
		const fileContents = (await app.vault.read(activeFile)).split("\n");
		let newFileContents: string[] = [];
		if (
			typeof this.#removeObj === "object" &&
			this.#removeObj instanceof fileContentsProcess
		)
			await this.#removeObj.process();
		this.resetMetaData();
		// for (let line of fileContents) {
		for (let index = 0; index < fileContents.length; index++) {
			this.#line = fileContents[index];
			let result = (await this.#processFunc(
				this.#line,
				this.#metaData,
				plugin as nlToolsKit,
				index as number
			)) as any;
			newFileContents.push(result);
		}
		newFileContents = newFileContents.filter((item) => item != undefined);
		app.vault.adapter.write(activeFile.path, newFileContents.join("\n"));
		setTimeout(() => {
			return "";
		}, this.#delay);
	}
	resetMetaData(): void {
		for (const prop in this.#metaData) {
			if (this.#metaData[prop].value instanceof Array) {
				// Reset all values in prop.value preventing heading number increment
				this.#metaData[prop].value = this.#metaData[prop].value.map(
					(item: any) => {
						if (typeof item === "number") {
							return 0;
						} else if (typeof item === "string") {
							return "";
						}
						return item;
					}
				);
			}
			if (typeof this.#metaData[prop].value === "number") {
				this.#metaData[prop].value = 0;
			}
			if (typeof this.#metaData[prop].value === "string") {
				this.#metaData[prop].value = "0";
			}
			if (typeof this.#metaData[prop].value === "boolean") {
				this.#metaData[prop].value = false;
			}
		}
	}
}
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
};2023/06/17
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
