import nlToolsKit from "main";
import { TFile } from "obsidian";
import {
	startMardownCodefencesymbol,
	endMardownCodefencesymbol,
} from "src/config/regex";
import {
	deleteArrayElement,
	fileContentsProcess,
	getContentsArr,
} from "src/utils";
export const removeCopyright = new fileContentsProcess((lines, plugin) => {
	let firstMatch = 0;
	let isIncode = false;
	while (firstMatch < lines.length) {
		if (lines[firstMatch].match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (lines[firstMatch].match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		if (
			lines[firstMatch].includes(plugin?.settings.copyrightInfo as string) && !isIncode
		) {
			lines = deleteArrayElement(lines, firstMatch);
			continue;
		}
		firstMatch++;
		continue;
	}
	return lines;
});
/**
 *
 * @param plugin
 */
export const insertCopyright = async (plugin: nlToolsKit) => {
	const blankLineArr = [];
	const contentLines = await getContentsArr();
	const activeFile: TFile = app.workspace.getActiveFile() as TFile;
	const copyrightInfo: string = plugin.settings.copyrightInfo;
	let randomIndexs: number[] = [];
	let newArr = [];
	let isIncode = false;

	for (let i in contentLines) {
		if (i.match(startMardownCodefencesymbol)) {
			isIncode = !isIncode;
		} else if (i.match(endMardownCodefencesymbol)) {
			isIncode = !isIncode;
		}
		if (contentLines[i].trim().length === 0 && !isIncode) {
			// 1. fill all blank lines with copyright info
			blankLineArr.push(parseInt(i));
			newArr.push(copyrightInfo);
			continue;
		} else {
			newArr.push(contentLines[i]);
			continue;
		}
	}
	// 2. remvoe line with coprytight info randomly
	for (
		let index = 0;
		index <
		Math.floor(blankLineArr.length * plugin.settings.copyrightInfoDensity);
		index++
	) {
		randomIndexs.push(
			blankLineArr[Math.floor(Math.random() * blankLineArr.length) + 1]
		);
	}
	let newArrAfter = [];
	for (const i in newArr) {
		let isFind = false;
		for (const j in randomIndexs) {
			if (parseInt(i) === randomIndexs[j]) {
				isFind = true;
				newArrAfter.push("");
				break;
			} else {
				continue;
			}
		}
		// blank line does not exist or fill all blank line with copyright info
		if (!isFind) newArrAfter.push(newArr[i]);
	}
	app.vault.adapter.write(activeFile.path, newArrAfter.join("\n"));
};
