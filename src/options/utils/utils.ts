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
type removeFun = () => Promise<string>;
interface metaData {
	[propName: string]: {
		value: any;
	};
}
export interface processFunc {
	(line: string, metaData: metaData, plugin: MyPlugin): Promise<
		string | void
	>;
}
/**
 * File contents processing class
 */
export class fileContentsProcess {
	#processFunc: processFunc;
	#delay: number = 1000;
	#metaData: metaData;
	#plugin: MyPlugin;
	#line: string;
	#removeObj: any;
	constructor(
		callback: processFunc, // function for core-logic for  text processsing
		metaData: metaData = {},
		delay: number = 1000, // if no value is passed, set 1000 as default
		removeObj?: fileContentsProcess
	) {
		this.#processFunc = callback;
		this.#delay = delay;
		this.#metaData = metaData;
		this.#removeObj = removeObj as fileContentsProcess;
	}

	async process(): Promise<any> {
		const activeFile: TFile = app.workspace.getActiveFile() as TFile;
		const fileContents = (await app.vault.read(activeFile)).split("\n");
		let newFileContents: string[] = [];
		if (
			typeof this.#removeObj === "object" &&
			this.#removeObj instanceof fileContentsProcess
		)
			await this.#removeObj.process();
		this.resetMetaData();
		for (let line of fileContents) {
			this.#line = line;
			newFileContents.push(
				(await this.#processFunc(
					this.#line,
					this.#metaData,
					this.#plugin
				)) as unknown as any
			);
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
